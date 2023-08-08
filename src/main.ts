import express from "express";
import morgan from "morgan";

const application = express();

application.use(morgan("dev"));

application.get("/", (_, res) => res.send("I'm alive !"));

application.listen(3000, () => console.log("[Server] Development server started"));
