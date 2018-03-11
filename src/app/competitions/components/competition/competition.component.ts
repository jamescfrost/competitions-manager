import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CompetitionService} from '../../../services/competition.service';
import {CompetitorService} from '../../../services/competitor.service';
import {Competition} from '../../../models/competition'
import {Competitor} from '../../../models/competitor'
import {Fixture} from '../../../models/fixture'
import {Domain} from '../../../models/domain'
import {Observable} from 'rxjs/Observable';
import {ObjectWrapper} from '../../../models/object-wrapper'
import {DomainService} from '../../../services/domain.service';
import {GlobalDataService} from '../../../services/globals.service';
import {ServiceResult} from '../../../models/service-result';

@Component({
  templateUrl: 'competition.component.html',
})
export class CompetitionComponent implements OnInit {

  availableTypes: string[] = ['League', 'Knockout', 'League and Knockout'];

  availableCompetitors: Competitor[];

  competition: Competition;
  competitionDomain: Domain;
  competitionName: string;
  competitionDescription: string;
  competitionType: string;
  competitionStartDate: Date;
  competitionFixtureMeetings: number;
  competitionFixtureGap: number;
  competitors: ObjectWrapper[] = [];
  fixtures: Fixture[] = [];

  loading = false;
  saving = false;
  generating = false;
  errorMessage: string;
  successMessage: string;

  json(obj) {
    return JSON.stringify(obj);
  }

  constructor(private competitionService: CompetitionService,
              private competitorService: CompetitorService,
              private domainService: DomainService,
              private globalDataService: GlobalDataService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true;
    const competitionId = this.route.snapshot.paramMap.get('competitionId');
    const tasks: Observable<any>[] = [];
    this.competitionService.getCompetition(competitionId).subscribe(
      (result: ServiceResult) => {
        this.competition = result.data;
        tasks.push(this.competitorService.getAllCompetitors(this.competition.domainId));
        tasks.push(this.domainService.getDomain(this.competition.domainId));
        Observable.forkJoin(tasks).subscribe(
          (results: any[]) => {
            this.availableCompetitors = results[0];
            this.competitionDomain = results[1];
            this.competitionName = this.competition.name;
            this.competitionDescription = this.competition.description;
            this.competitionType = this.competition.type;
            for (const competitorId of this.competition.competitorIds) {
              const competitor = this.availableCompetitors.find(x => x._id === competitorId);
              this.addCompetitor(competitor);
            }
            while (this.competitors.length < 4) {
              this.addCompetitor();
            }
            this.loading = false;
          });
      });
  }

  addCompetitor(competitor?: any) {
    if (competitor == null) {
      competitor = '';
    }
    const competitorWrapper = new ObjectWrapper(competitor);
    this.competitors.push(competitorWrapper);
  }

  saveCompetition() {
    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';
    const tasks: Observable<Competitor>[] = [];
    for (const competitorWrapper of this.competitors) {
      if (typeof competitorWrapper.value === 'string' && /\S/.test(competitorWrapper.value)) {
        const name = competitorWrapper.value;
        const competitor = new Competitor();
        competitor.name = name;
        competitor.domainId = this.competitionDomain._id;
        tasks.push(this.competitorService.saveCompetitor(competitor));
      }
    }
    Observable.forkJoin(tasks)
      .subscribe(
        (results) => {
          for (const competitorWrapper of this.competitors) {
            if (typeof competitorWrapper.value === 'string' && /\S/.test(competitorWrapper.value)) {
              competitorWrapper.value = results.shift();
              this.availableCompetitors.push(competitorWrapper.value);
            }
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          const competitorIds: string[] = [];
          for (const competitorWrapper of this.competitors) {
            if (typeof competitorWrapper.value !== 'string') {
              competitorIds.push(competitorWrapper.value._id);
            }
          }
          this.competition.domainId = this.competitionDomain._id;
          this.competition.name = this.competitionName;
          this.competition.description = this.competitionDescription;
          this.competition.type = this.competitionType;
          this.competition.competitorIds = competitorIds;
          this.competitionService.saveCompetition(this.competition)
            .subscribe((serviceResult) => {
              if (serviceResult.success) {
                this.competition = serviceResult.data;
                this.successMessage = 'Saved';
                const timeoutId = setTimeout(() => {
                  this.successMessage = '';
                }, 2000);
              } else {
                this.errorMessage = serviceResult.data;
              }
              this.saving = false;
            });
        });
  }

  getCompetitorName(id) {
    const competitorWrapper = this.competitors.find(x => x.value._id === id);
    return competitorWrapper.value.name;
  }

  generateFixtures() {
    this.generating = true;
    this.fixtures.length = 0;
    const tempCompetitors = this.competitors.slice();
    let count = tempCompetitors.length;
    if (count % 2 === 1) {
      tempCompetitors.push(null);
      count++;
    }
    const fixtureSetCount = count - 1;
    const fixtureCount = count / 2;
    const home = [];
    const away = [];
    for (let i = 0; i < fixtureCount; i++) {
      const homePos = Math.floor(Math.random() * tempCompetitors.length);
      home.push(tempCompetitors.splice(homePos, 1)[0]);
      const awayPos = Math.floor(Math.random() * tempCompetitors.length);
      away.push(tempCompetitors.splice(awayPos, 1)[0]);
    }
    let flip = true;
    let scheduleDate = new Date();
    for (let fixtureSet = 0; fixtureSet < fixtureSetCount * 2; fixtureSet++) {
      for (let i = 0; i < fixtureCount; i++) {
        const fixture = new Fixture();
        fixture.dateScheduled = scheduleDate;
        if (home[i] && away[i]) {
          if (flip) {
            fixture.homeCompetitorId = home[i].value._id;
            fixture.awayCompetitorId = away[i].value._id;
          } else {
            fixture.awayCompetitorId = home[i].value._id;
            fixture.homeCompetitorId = away[i].value._id;
          }
          this.fixtures.push(fixture);
        }
      }
      scheduleDate = new Date(scheduleDate.getTime());
      scheduleDate.setDate(scheduleDate.getDate() + 7);
      const tempAway = away[0];
      const tempHome = home[fixtureCount - 1];
      for (let i = 0; i < fixtureCount - 1; i++) {
        away[i] = away[i + 1];
        const reverse = fixtureCount - 1 - i;
        if (reverse > 0) {
          home[reverse] = home[reverse - 1];
        }
      }
      home[1] = tempAway;
      away[fixtureCount - 1] = tempHome;
      flip = !flip;
    }
    this.generating = false;
  }

}
