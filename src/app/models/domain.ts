import { Competition } from './competition'

export class Domain {
  _id: string;
  name: string;
  description: string;
  competitions: Competition[];
}
