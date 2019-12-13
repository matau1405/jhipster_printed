import { Moment } from 'moment';

export interface IExpedition {
  id?: string;
  trackingCode?: string;
  date?: Moment;
  details?: string;
}

export class Expedition implements IExpedition {
  constructor(public id?: string, public trackingCode?: string, public date?: Moment, public details?: string) {}
}
