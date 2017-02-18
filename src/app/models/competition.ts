import { Competitor } from './competitor'

export class Competition {
  _id: string;
  name: string;
  description: string;
  type: string;
  competitorType: string;
  competitorIds: string[];
}
