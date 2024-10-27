module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.ts"],
  moduleFileExtensions: ["ts", "html", "js", "json"],
  coverageDirectory: "<rootDir>/coverage/",
  coverageReporters: ["html", "text-summary"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.module.ts",
    "!src/main.ts",
    "!src/polyfills.ts",
    "!src/**/*.config.ts",
    "!src/**/*.routes.ts",
    "!src/**/*.state.ts",
    "!src/**/*.enums.ts",
    "!src/**/mocks.ts",
  ],
};
