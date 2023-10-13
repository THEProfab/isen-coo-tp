export enum BeerColorIntensity {
  PALE = "PALE",
  GOLDEN = "GOLDEN",
  WEISS = "WEISS",
  IPA = "IPA",
  SAISON = "SAISON",
  EXTRA_SPECIAL_BITTER = "EXTRA_SPECIAL_BITTER",
  GARDE = "GARDE",
  AMBER = "AMBER",
  DUNKEL = "DUNKEL",
  PORTER = "PORTER",
  STOUT = "STOUT",
  BALTIC_PORTER = "BALTIC_PORTER",
  EXPORT_STOUT = "EXPORT_STOUT",
  IMPERIAL_STOUT = "IMPERIAL_STOUT",
  UNKNOWN = "UNKNOWN",
}

type BeerDependencies = {
  id: number;
  name: string;
  description?: string;
  image_url?: string;
  abv?: number;
  ibu?: string;
  color?: string;
};

export class Beer {
  public id: number;
  public name: string;
  public description?: string;
  public image_url?: string;
  public abv = 0;
  public ibu = 0;
  public color = BeerColorIntensity.UNKNOWN;

  constructor({ id, name }: BeerDependencies) {
    this.id = id;
    this.name = name;
  }
}
