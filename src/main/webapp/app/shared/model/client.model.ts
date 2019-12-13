export interface IClient {
  id?: string;
  idClient?: string;
  nomClient?: string;
  prenomClient?: string;
  dateNaissanceClient?: string;
  adresseClient?: string;
  villeClient?: string;
  paysClient?: string;
  emailClient?: string;
  listCommande?: string;
}

export class Client implements IClient {
  constructor(
    public id?: string,
    public idClient?: string,
    public nomClient?: string,
    public prenomClient?: string,
    public dateNaissanceClient?: string,
    public adresseClient?: string,
    public villeClient?: string,
    public paysClient?: string,
    public emailClient?: string,
    public listCommande?: string
  ) {}
}
