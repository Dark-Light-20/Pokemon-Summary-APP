const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "home",

  exposes: {
    "./HomeModule": "./projects/home/src/app/home/home.module.ts",
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
