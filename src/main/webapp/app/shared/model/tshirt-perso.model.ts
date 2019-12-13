export interface ITshirtPerso {
  id?: string;
}

export class TshirtPerso implements ITshirtPerso {
  constructor(public id?: string) {}
}
