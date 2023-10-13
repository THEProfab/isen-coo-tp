import { Router } from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";
import { makeBeerRepository } from "../provider/beer-repository-factory";

export function createBeerRouter() {
  const router = Router();
  const beerRepository = makeBeerRepository();

  router.get("/", async (_, res) => res.json({ beers: await getAllBeers({ beerRepository }) }));

  return router;
}
