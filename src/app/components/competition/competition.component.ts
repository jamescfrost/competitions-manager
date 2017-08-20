import {Component, OnInit}      from '@angular/core';
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

  availableCompetitionTypes = ["League", "Knockout", "League and Knockout"];
  availableCompetitors: Competitor[];

  competition: Competition;
  competitionGroupTag: string;
  competitionName: string;
  competitionDescription: string;
  competitionType: string;
  loading: boolean = false;
  saving: boolean = false;
  competitors: ObjectWrapper[] = [];
  index: number = 0;

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
      var tasks = [];
      tasks.push(this.competitionService.getCompetition(params['id']));
      tasks.push(this.competitorService.getAllCompetitors());
      Observable.forkJoin(tasks)
        .subscribe((results: any[]) => {
          let competition = results[0];
          this.competition = competition;
          this.competitionGroupTag = competition.groupTag;
          this.competitionName = competition.name;
          this.competitionDescription = competition.description;
          this.competitionType = competition.type;
          var availableCompetitors = results[1];
          var subTasks = [];
          for (let competitorId of competition.competitorIds) {
            var competitor = availableCompetitors.find(x => x._id == competitorId);
            if (competitor) {
              subTasks.push(Observable.of(competitor));
            } else {
              subTasks.push(this.competitorService.getCompetitor(competitorId));
            }
          }
          Observable.forkJoin(subTasks)
            .subscribe(
              (competitors) => competitors.forEach((competitor) => this.addCompetitor(competitor)),
              (err) => console.log(err),
              () => {
                while (this.competitors.length < 4) {
                  this.addCompetitor();
                }
                this.loading = false;
              });
        });

    });
  }

  addCompetitor(competitor?: any) {
    if (competitor == null) {
      competitor = '';
    }
    var competitorWrapper = new ObjectWrapper(this.index.toString(), competitor);
    this.competitors.push(competitorWrapper);
    this.index++;
  }

  removeCompetitor(competitorWrapper: ObjectWrapper) {
    var index = this.competitors.indexOf(competitorWrapper);
    if (index > -1) {
      this.competitors.splice(index, 1);
    }
  }

  saveCompetition() {
    this.saving = true;
    var tasks: Observable<Competitor>[] = [];
    for (let competitorWrapper of this.competitors) {
      if (typeof competitorWrapper.value === "string" && /\S/.test(competitorWrapper.value)) {
        var name = competitorWrapper.value;
        var competitor = new Competitor();
        competitor.name = name;
        tasks.push(this.competitorService.saveCompetitor(competitor));
      }
    }
    Observable.forkJoin(tasks)
      .subscribe(
        (results) => {
          for (let competitorWrapper of this.competitors) {
            if (typeof competitorWrapper.value === "string" && /\S/.test(competitorWrapper.value)) {
              competitorWrapper.value = results.shift();
              this.availableCompetitors.push(competitorWrapper.value);
            }
          }
        },
        (err) => {
          console.log(err);
        },
        () => {
          var competitorIds: string[] = [];
          for (let competitorWrapper of this.competitors) {
            if (typeof competitorWrapper.value !== "string") {
              competitorIds.push(competitorWrapper.value._id);
            }
          }
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
