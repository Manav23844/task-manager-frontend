module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/src/tests/**/*.test.[jt]s?(x)"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  transform: {
    "^.+\\.[jt]sx?$": ["babel-jest", { configFile: "./babel.config.cjs" }]
  },
  extensionsToTreatAsEsm: [".jsx"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};

