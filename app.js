import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as songService from "./songService.js"

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });

const app = new Hono();

app.get("/", async (c) => {
    const data = {
      songs: await songService.listSongs(),
    };

    return c.html(
      eta.render("index.eta", data),
    );
  },
);

app.post("/songs", async (c) => {
  const body = await c.req.parseBody();
  await songService.addSong(body);
  return c.redirect("/");
});

export default app;