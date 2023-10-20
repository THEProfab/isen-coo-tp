import { Router } from "express";
import { getAllBeers } from "../../application/use-case/get-all-beers";
import { makeBeerRepository } from "../provider/beer-repository-factory";
import { getAllTastedBeers } from "../../application/use-case/get-tasted-beers";
import { makeTastedBeerRepository } from "../provider/tasted-beer-repository-factory";
import { addTastedBeer } from "../../application/use-case/add-tasted-beer";
import { getTastedBeersStats } from "../../application/use-case/get-tasted-beers-stats";

export function createBeerRouter() {
  const router = Router();
  const beerRepository = makeBeerRepository();
  const tastedBeerRepository = makeTastedBeerRepository();
  //const tastedBeerStatsRepository = makeTastedBeerStatRepository();

  router.get("/", async (_, res) => res.json({ beers: await getAllBeers({ beerRepository }) }));
  router.get("/me", async (_, res) => res.json({ beers: await getAllTastedBeers({ tastedBeerRepository }) }));
  router.post("/me", async (req, res) => {
    const { id } = req.body;

    if (id) {
      const tastedBeers = await getAllTastedBeers({ tastedBeerRepository });
      const ids = tastedBeers.map((element) => element.id);

      if (ids.includes(id)) {
        return res.status(208).end("Beer already tasted!");
      } else {
        const wasAdded = await addTastedBeer({ beerRepository, tastedBeerRepository }, id);

        if (wasAdded) {
          return res.status(201).end("Beer added!");
        }

        return res.status(400).end("Wrong id provided!");
      }
    }

    return res.status(400).end("No id provided!");
  });
  router.get("/me/stats", async (_, res) => res.json({ beers: await getTastedBeersStats() }));

  return router;
}
