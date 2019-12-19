export interface IPanier {
  id?: string;
  idPanier?: string;
  listeProduit?: string;
  nombreProduits?: number;
  prixTotal?: number;
}

export class Panier implements IPanier {
  constructor(
    public id?: string,
    public idPanier?: string,
    public listeProduit?: string,
    public nombreProduits?: number,
    public prixTotal?: number
  ) {}
}
