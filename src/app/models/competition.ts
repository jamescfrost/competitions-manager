import { Competitor } from './competitor'

export class Competition {
  _id: string;
  groupTag: string;
  name: string;
  description: string;
  type: string;
  competitorIds: string[];
}
