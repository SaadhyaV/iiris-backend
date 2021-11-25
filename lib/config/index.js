import cors             from 'cors';
import express          from 'express';
import Config           from '.';
import Logger           from './utils/logger';
import pool             from './config/db';

import * as controllers from '../controllers';
import * as restUtils   from './utils/rest-utils';
import * as slackUtils  from './utils/slack-utils';


///Set up Express
const server = express();

///Configure landing page
server.get('/', (req, res)=> res.send(require('./index.html.js').default))

// server.use(restUtils.HTTPS);
// server.use(restUtils.HSTS);
server.use(restUtils.responseHeaders);

const domain = 'drivehive'
var whitelist = [
    `http://localhost:8080`, `http://localhost:3000`,`http://localhost:8081`,`http://localhost:8082`,
    `http://${domain}.io`, `http://app.${domain}.io`, `http://www.${domain}.io`, `http://staging.${domain}.io`, `http://console.${domain}.io`, `http://app.${domain}.io`,
    `https://${domain}.io`, `https://app.${domain}.io`, `https://www.${domain}.io`, `https://staging.${domain}.io`, `https://console.${domain}.io`, `https://app.${domain}.io`,
    `https://${domain}.com`, `https://app.${domain}.com`, `https://www.${domain}.com`, `https://staging.${domain}.com`, `https://console.${domain}.com`, `https://app.${domain}.com`
]
var options = { origin: (origin, callback) => Config.environment!=="production" ? callback(null, true) : (whitelist.indexOf(origin) >=0 || !origin? callback(null, true) :  callback(new Error(`Origin Not allowed by CORS. Origin was '${ origin}'`)))}
server.use(cors(options));

Logger.verbose("++++++++++++++Wiring up Controllers");
/// Wire up Controllers
Object.keys(controllers).forEach(k=>{
    Logger.verbose("+++++++++++++++++++controller: " + k + " will map to: " + controllers[k].route);
    server.use(controllers[k].route, controllers[k].controller)
});

///Listen on configured port
Logger.info(`Configured port was: ${Config.port} (${Config.environment})`)
server.listen(Config.port, ()=> Logger.info(`Listening on http://localhost:${Config.port}`));

slackUtils.slackServiceNoify(`Starting Auth Api Engine with version of ${Config.version} @ Node Env of: ${Config.environment}`)
