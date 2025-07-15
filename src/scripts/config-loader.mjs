import YAML from "yaml";
import fs from "fs";

// load configuration
const configFile = fs.readFileSync("./config.yaml", "utf8");
const config = YAML.parse(configFile);

export default config;
