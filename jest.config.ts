export default {
  coveragePathIgnorePatterns: ["src/preprocess"],
  reporters: [["jest-simple-dot-reporter", { color: true }]],
  projects: [
    {
      displayName: "node",
      preset: "ts-jest",
      testEnvironment: "node",
    },
    {
      displayName: "jsdom",
      preset: "ts-jest",
      testEnvironment: "jsdom",
    },
  ],
};
