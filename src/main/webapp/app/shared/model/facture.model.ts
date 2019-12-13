import { Moment } from 'moment';
import { StatusFacture } from 'app/shared/model/enumerations/status-facture.model';
import { ModePaiement } from 'app/shared/model/enumerations/mode-paiement.model';

export interface IFacture {
  id?: string;
  date?: Moment;
  details?: string;
  status?: StatusFacture;
  paymentMethod?: ModePaiement;
  paymentDate?: Moment;
  paymentAmount?: number;
}

export class Facture implements IFacture {
  constructor(
    public id?: string,
    public date?: Moment,
    public details?: string,
    public status?: StatusFacture,
    public paymentMethod?: ModePaiement,
    public paymentDate?: Moment,
    public paymentAmount?: number
  ) {}
}
