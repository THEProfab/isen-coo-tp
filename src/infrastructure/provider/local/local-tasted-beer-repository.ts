import { join } from "path";
import { promises } from "fs";
import { TastedBeerRepository } from "../../../domain/repository/TastedBeerRepository";
import { TastedBeer } from "../../../domain/entity/TastedBeer";
import { BeerColorIntensity } from "../../../domain/entity/Beer";
import { TastedBeerStats } from "../../../domain/entity/TastedBeerStats";

export class LocalTastedBeerRepository implements TastedBeerRepository {
  private filePath: string;

  constructor() {
    this.filePath = join(__dirname, "../../../data/TastedBeer.json");
  }

  async getAllTastedBeers(): Promise<TastedBeer[]> {
    try {
      const data = await promises.readFile(this.filePath);

      return JSON.parse(data.toString()).tastedBeers;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async addTastedBeer(tastedBeer: TastedBeer): Promise<void> {
    const tastedBeers = await this.getAllTastedBeers();

    const hasAlreadyTasted = !!tastedBeers.find(({ id }) => id === tastedBeer.id);

    if (hasAlreadyTasted) {
      return;
    }

    tastedBeers.push(tastedBeer);

    await promises.writeFile(
      this.filePath,
      JSON.stringify({
        tastedBeers,
      }),
    );
  }

  async setBeerLikedOpinionOnTastedBeer(id: number, hasBeenLiked: boolean): Promise<void> {
    const tastedBeers = await this.getAllTastedBeers();
    const tastedBeer = tastedBeers.find((tastedBeer) => tastedBeer.id === id);

    if (!tastedBeer) {
      throw new Error("Not found");
    }

    const indexOfTastedBeer = tastedBeers.map(({ id }) => id).indexOf(id);

    tastedBeer.hasBeenLiked = hasBeenLiked;

    tastedBeers[indexOfTastedBeer] = tastedBeer;

    await promises.writeFile(
      this.filePath,
      JSON.stringify({
        tastedBeers,
      }),
    );
  }

  async getTastedBeersStats(): Promise<TastedBeerStats> {
    const tastedBeers = await this.getAllTastedBeers();

    let numberOfTastedBeers = 0;
    let numberOfLikedBeers = 0;
    let sumOfAlcoholDegreeOfTastedBeers = 0;

    const everyTastedBeerColour: BeerColorIntensity[] = [];

    tastedBeers.forEach((element) => {
      numberOfTastedBeers += 1;
      if (element.hasBeenLiked) {
        numberOfLikedBeers += 1;
      }
      sumOfAlcoholDegreeOfTastedBeers += element.abv;

      everyTastedBeerColour.push(element.color);
    });

    const percentageLikedByTastedRatio: number = (numberOfLikedBeers / numberOfTastedBeers) * 100;
    const averageABV: number = sumOfAlcoholDegreeOfTastedBeers / numberOfTastedBeers;

    tastedBeers.sort((a, b) => a.ibu - b.ibu);
    const threeBitterestTastedBeers: TastedBeer[] = tastedBeers.splice(-3);

    const tastedBeersColoursWithoutRepetitions = new Array(...new Set(everyTastedBeerColour));
    const numberOfOccurencesOfEachColour: number[] = [];

    tastedBeersColoursWithoutRepetitions.forEach((color1) => {
      let count = 0;
      everyTastedBeerColour.forEach((color2) => {
        if (color1 === color2) {
          count++;
        }
      });
      numberOfOccurencesOfEachColour.push(count);
    });

    const favouriteBeerColour: BeerColorIntensity =
      tastedBeersColoursWithoutRepetitions[
        numberOfOccurencesOfEachColour.findIndex((element) => element === Math.max(...numberOfOccurencesOfEachColour))
      ];

    return new TastedBeerStats({
      percentageLikedByTastedRatio,
      averageABV,
      threeBitterestTastedBeers,
      favouriteBeerColour,
    });
  }
}
