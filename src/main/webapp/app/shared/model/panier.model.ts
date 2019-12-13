export interface IPanier {
  id?: string;
  idPanier?: string;
  listeProduit?: string;
}

export class Panier implements IPanier {
  constructor(public id?: string, public idPanier?: string, public listeProduit?: string) {}
}
