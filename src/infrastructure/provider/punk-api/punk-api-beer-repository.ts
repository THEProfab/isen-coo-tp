import axios, { AxiosInstance } from "axios";
import { Beer } from "../../../domain/entity/Beer";
import { BeerRepository } from "../../../domain/repository/BeerRepository";
import { PunkAPIBeerDeserializer } from "./punk-api-beer-deserializer";

export class PunkAPIBeerRepository implements BeerRepository {
  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: "https://api.punkapi.com/v2/",
    });
  }

  async getAllBeers(): Promise<Beer[]> {
    try {
      const { data } = await this.http.get("/beers");

      if (!data?.length) {
        return [];
      }

      return data.map((element: any) => PunkAPIBeerDeserializer.deserialize(element));
    } catch (error) {
      return [];
    }
  }
}
