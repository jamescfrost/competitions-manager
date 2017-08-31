import { Competitor } from './competitor'

export class Competition {
  _id: string;
  domainId: string;
  domainName: string;
  name: string;
  description: string;
  type: string;
  competitorIds: string[];
  competitors: Competitor[];
}
