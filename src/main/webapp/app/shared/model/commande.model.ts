import { StatusCommande } from 'app/shared/model/enumerations/status-commande.model';

export interface ICommande {
  id?: string;
  idCmd?: string;
  dateCmd?: string;
  delaiLivraisonCmd?: number;
  etatLivraisonCmd?: string;
  lieuLivraisonCmd?: string;
  modeLivraisonCmd?: string;
  prixTotalCmd?: number;
  modePaiement?: string;
  status?: StatusCommande;
}

export class Commande implements ICommande {
  constructor(
    public id?: string,
    public idCmd?: string,
    public dateCmd?: string,
    public delaiLivraisonCmd?: number,
    public etatLivraisonCmd?: string,
    public lieuLivraisonCmd?: string,
    public modeLivraisonCmd?: string,
    public prixTotalCmd?: number,
    public modePaiement?: string,
    public status?: StatusCommande
  ) {}
}
