export interface IProduitsNoPerso {
  id?: string;
  typeProduits?: string;
}

export class ProduitsNoPerso implements IProduitsNoPerso {
  constructor(public id?: string, public typeProduits?: string) {}
}
