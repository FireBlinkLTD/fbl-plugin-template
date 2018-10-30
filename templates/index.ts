import {IPlugin} from "fbl/dist/src/interfaces";
import {PluginActionHandler} from "./src/handlers";

const packageJson = require('../package.json');

module.exports = <IPlugin> {
  name: packageJson.name,

  description: `Plugin human readable description.`,

  tags: packageJson.keywords,

  version: packageJson.version,

  requires: {
    fbl: `>=${packageJson.dependencies.fbl}`,
    plugins: {
      //pluginId: '<0.0.1'
    },
    applications: []
  },

  reporters: [],

  actionHandlers: [
    new PluginActionHandler()
  ],

  templateUtils: []
};
