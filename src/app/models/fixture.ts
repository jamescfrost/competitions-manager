import { Competitor } from './competitor'

export class Fixture {
  _id: string;
  dateScheduled: Date;
  homeCompetitorId: string;
  awayCompetitorId: string;
  dateStarted: Date;
  dateCompleted: Date;
  homeScore: number;
  awayScore: number;
}
