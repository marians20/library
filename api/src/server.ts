import { App } from "./app";
import { config } from "./config";

const port = config.app.port;

new App().ExpressApp
         .listen(port, () => console.log('Express server listening on port ' + port));