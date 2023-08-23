const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "games",

  exposes: {
    "./GamesModule": "./projects/games/src/app/games/games.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
    "shared-lib": {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
  },
});
