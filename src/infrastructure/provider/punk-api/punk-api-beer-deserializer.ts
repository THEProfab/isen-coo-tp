import { Beer, BeerColorIntensity } from "../../../domain/entity/Beer";

const beerColorIntensityMappingWithEuropeanBrewery = [
  { threshold: 128, intensity: BeerColorIntensity.IMPERIAL_STOUT },
  { threshold: 79, intensity: BeerColorIntensity.EXPORT_STOUT },
  { threshold: 69, intensity: BeerColorIntensity.BALTIC_PORTER },
  { threshold: 57, intensity: BeerColorIntensity.STOUT },
  { threshold: 47, intensity: BeerColorIntensity.PORTER },
  { threshold: 39, intensity: BeerColorIntensity.DUNKEL },
  { threshold: 33, intensity: BeerColorIntensity.AMBER },
  { threshold: 26, intensity: BeerColorIntensity.GARDE },
  { threshold: 20, intensity: BeerColorIntensity.EXTRA_SPECIAL_BITTER },
  { threshold: 16, intensity: BeerColorIntensity.SAISON },
  { threshold: 12, intensity: BeerColorIntensity.IPA },
  { threshold: 8, intensity: BeerColorIntensity.WEISS },
  { threshold: 6, intensity: BeerColorIntensity.GOLDEN },
  { threshold: 4, intensity: BeerColorIntensity.PALE },
  { threshold: 0, intensity: BeerColorIntensity.UNKNOWN },
];

export class PunkAPIBeerDeserializer {
  public static deserializeBeerColor(ebc: number): BeerColorIntensity {
    for (const { threshold, intensity } of beerColorIntensityMappingWithEuropeanBrewery) {
      if (ebc >= threshold) {
        return intensity;
      }
    }
    return BeerColorIntensity.UNKNOWN;
  }

  public static deserialize(source: any): Beer {
    const { id, name, description, image_url, abv, ibu, ebc } = source;

    const beer = new Beer({ id, name });
    beer.description = description;
    beer.image_url = image_url;
    beer.abv = abv;
    beer.ibu = ibu;
    beer.color = PunkAPIBeerDeserializer.deserializeBeerColor(ebc);

    return beer;
  }
}
