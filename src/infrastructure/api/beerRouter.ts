import { Router } from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";
import { makeBeerRepository } from "../provider/beer-repository-factory";
import { getAllTastedBeers } from "../../application/use-case/get-tasted-beers";
import { makeTastedBeerRepository } from "../provider/tasted-beer-repository-factory";

export function createBeerRouter() {
  const router = Router();
  const beerRepository = makeBeerRepository();
  const tastedBeerRepository = makeTastedBeerRepository();

  router.get("/", async (_, res) => res.json({ beers: await getAllBeers({ beerRepository }) }));
  router.get("/me", async (_, res) => res.json({ beers: await getAllTastedBeers({ tastedBeerRepository }) }));

  return router;
}
