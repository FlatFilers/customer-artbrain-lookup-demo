import type { JestConfigWithTsJest } from "ts-jest";

// Expliticly list any ESM modules that need to be transformed by ts-jest here:
const esmModules = [].join("|");

const config: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  forceExit: true,
  resetMocks: true,
  setupFiles: ["dotenv-flow/config"],
  setupFilesAfterEnv: ["<rootDir>/test/support/jest.setup.ts"],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  transformIgnorePatterns: [`/node_modules/(?!(${esmModules})/)`],
  testTimeout: 30_000,
};

export default config;
