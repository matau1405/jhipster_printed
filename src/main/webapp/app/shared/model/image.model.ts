export interface IImage {
  id?: string;
  url?: string;
  longueurImg?: number;
  largeurImg?: number;
  poidsImg?: number;
  positionImg?: string;
}

export class Image implements IImage {
  constructor(
    public id?: string,
    public url?: string,
    public longueurImg?: number,
    public largeurImg?: number,
    public poidsImg?: number,
    public positionImg?: string
  ) {}
}
