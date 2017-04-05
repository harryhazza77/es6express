import nconf from "nconf";
import path from "path";

const buildMode = process.env.buildMode || "development";

nconf
    .argv()
    .env()
    .file(buildMode, path.join(__dirname, `./${buildMode}.json`))
    .file("secrets", path.join(__dirname, "./secrets.json"))
    .file("defaults", path.join(__dirname, "./defaults.json"));

nconf.set("buildMode", buildMode);

const prAppName = nconf.get("HEROKU_APP_NAME");
nconf.set("prAppName", prAppName);

if (prAppName) {
    nconf.set("webUrl", `https://${prAppName}.herokuapp.com`);
}

export default nconf;