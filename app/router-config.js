import { ExamplesController } from "./controllers/ExamplesController.js";
import { HomeController } from "./controllers/HomeController.js";
import { jotController } from "./controllers/jotController.js";
import { navController } from "./controllers/navController.js";
import { Router } from "./utils/Router.js";


export const router = new Router([
  {
    path: '',
    controllers: [navController, jotController],
    view: ''
  }
])