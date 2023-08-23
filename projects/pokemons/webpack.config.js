const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "pokemons",

  exposes: {
    "./PokemonsModule":
      "./projects/pokemons/src/app/pokemons/pokemons.module.ts",
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
