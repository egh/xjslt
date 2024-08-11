export default {
  preset: "ts-jest",
  testEnvironment: "node",
  reporters: [["jest-simple-dot-reporter", { color: true }]],
  testPathIgnorePatterns: ["examples"],
}
