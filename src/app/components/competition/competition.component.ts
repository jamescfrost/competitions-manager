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

  availableTypes = ["League", "Knockout", "League and Knockout"];
  availableCompetitors: Competitor[];

  competition: Competition;
  competitionName: string;
  competitionDescription: string;
  competitionType: string;
  loading = false;
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
    this.competitorService.getAllCompetitors()
      .subscribe((competitors: Competitor[]) => {
        this.availableCompetitors = competitors;
      });
    this.route.params
      .switchMap((params: Params) => this.competitionService.getCompetition(params['id']))
      .subscribe((competition: Competition) => {
        var tasks: Observable<Competitor>[] = [];
        this.competition = competition;
        this.competitionName = competition.name;
        this.competitionDescription = competition.description;
        this.competitionType = competition.type;
        for (let competitorId of competition.competitorIds) {
          tasks.push(this.competitorService.getCompetitor(competitorId));
        }
        Observable.forkJoin(tasks)
          .subscribe(
            (competitors) => {
              for (let competitor of competitors) {
                this.addCompetitor(competitor);
              }
            },
            (err) => {
              console.log(err);
            },
            () => {
              while (this.competitors.length < 2) {
                this.addCompetitor();
              }
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
    this.loading = true;
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
              this.loading = false;
            });
        });
  }

  /*  addCompetition(event: Event) {
   event.preventDefault();
   var newCompetition = new Competition();
   newCompetition.name = this.name;
   this.competitionsService.addCompetition(newCompetition)
   .subscribe(competition => {
   this.competitions.push(competition);
   this.name = '';
   })
   }

   deleteCompetition(id: string) {
   this.competitionService.deleteCompetition(id)
   .subscribe(data => {
   console.log(data);
   if (data.n == 1) {
   for (var i = 0; i < competitions.length; i++) {
   if (competitions[i]._id == id) {
   competitions.splice(i, 1);
   }
   }
   }
   })
   }*/

}
