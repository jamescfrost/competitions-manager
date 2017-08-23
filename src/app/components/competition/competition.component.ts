import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';
import {CompetitionService} from '../../services/competition.service';
import {CompetitorService} from '../../services/competitor.service';
import {Competition} from '../../models/competition'
import {Competitor} from '../../models/competitor'
import {Observable} from 'rxjs';
import {ObjectWrapper} from '../../models/object-wrapper'

@Component({
  moduleId: module.id,
  templateUrl: 'competition.component.html',
})
export class CompetitionComponent implements OnInit {

  availableCompetitionGroupTags = [];

  availableCompetitionTypes = ['League', 'Knockout', 'League and Knockout'];

  availableCompetitors: Competitor[];

  competition: Competition;
  competitionGroupTag: string;
  competitionName: string;
  competitionDescription: string;
  competitionType: string;
  loading = false;
  saving = false;
  competitors: ObjectWrapper[] = [];
  index = 0;

  json(obj) {
    return JSON.stringify(obj);
  }

  constructor(private competitionService: CompetitionService,
              private competitorService: CompetitorService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe(params => {
      this.competitionService.getCompetition(params['id'])
        .subscribe((competition: Competition) => {
          this.competition = competition;
          this.competitionGroupTag = competition.groupTag;
          this.competitionName = competition.name;
          this.competitionDescription = competition.description;
          this.competitionType = competition.type;
          this.competitorService.getAllCompetitorsByGroupTag(this.competitionGroupTag)
            .subscribe((availableCompetitors: Competitor[]) => {
              this.availableCompetitors = availableCompetitors;
              const subTasks = [];
              for (const competitorId of competition.competitorIds) {
                const competitor = this.availableCompetitors.find(x => x._id === competitorId);
                if (competitor) {
                  this.addCompetitor(competitor);
                } else {
                  subTasks.push(this.competitorService.getCompetitor(competitorId));
                }
              }
              Observable.forkJoin(subTasks)
                .subscribe(
                  (competitors: Competitor[]) => competitors.forEach((competitor) => this.addCompetitor(competitor)),
                  (err) => console.log(err),
                  () => {
                    while (this.competitors.length < 4) {
                      this.addCompetitor();
                    }
                    this.loading = false;
                  });

            });
        });
    });


    // this.route.params.subscribe(params => {
    //   const tasks = [];
    //   tasks.push(this.competitionService.getCompetition(params['id']));
    //   tasks.push(this.competitorService.getAllCompetitors());
    //   Observable.forkJoin(tasks)
    //     .subscribe((results: any[]) => {
    //       const competition = results[0];
    //       this.competition = competition;
    //       this.competitionGroupTag = competition.groupTag;
    //       this.competitionName = competition.name;
    //       this.competitionDescription = competition.description;
    //       this.competitionType = competition.type;
    //       this.availableCompetitors = results[1];
    //       const subTasks = [];
    //       for (const competitorId of competition.competitorIds) {
    //         const competitor = this.availableCompetitors.find(x => x._id === competitorId);
    //         if (competitor) {
    //           this.addCompetitor(competitor);
    //         } else {
    //           subTasks.push(this.competitorService.getCompetitor(competitorId));
    //         }
    //       }
    //       Observable.forkJoin(subTasks)
    //         .subscribe(
    //           (competitors) => competitors.forEach((competitor) => this.addCompetitor(competitor)),
    //           (err) => console.log(err),
    //           () => {
    //             while (this.competitors.length < 4) {
    //               this.addCompetitor();
    //             }
    //             this.loading = false;
    //           });
    //     });
    //
    // });
  }

  addCompetitor(competitor?: any) {
    if (competitor == null) {
      competitor = '';
    }
    const competitorWrapper = new ObjectWrapper(this.index.toString(), competitor);
    this.competitors.push(competitorWrapper);
    this.index++;
  }

  removeCompetitor(competitorWrapper: ObjectWrapper) {
    const index = this.competitors.indexOf(competitorWrapper);
    if (index > -1) {
      this.competitors.splice(index, 1);
    }
  }

  saveCompetition() {
    this.saving = true;
    const tasks: Observable<Competitor>[] = [];
    for (const competitorWrapper of this.competitors) {
      let competitor: Competitor;
      if (typeof competitorWrapper.value === 'string' && /\S/.test(competitorWrapper.value)) {
        const name = competitorWrapper.value;
        competitor = new Competitor();
        competitor.name = name;
      } else {
        competitor = competitorWrapper.value;
      }
      competitor.groupTag = this.competition.groupTag;
      tasks.push(this.competitorService.saveCompetitor(competitor));
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
          this.competition.groupTag = this.competitionGroupTag;
          this.competition.name = this.competitionName;
          this.competition.description = this.competitionDescription;
          this.competition.type = this.competitionType;
          this.competition.competitorIds = competitorIds;
          this.competitionService.saveCompetition(this.competition)
            .subscribe((competition) => {
              this.competition = competition;
              this.saving = false;
            });
        });
  }


}
