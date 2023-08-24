module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/../../setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  moduleNameMapper: {
    "^shared-lib$": "<rootDir>/../../projects/shared-lib/src/public-api.ts",
  },
};
