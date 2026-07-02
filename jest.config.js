// import nextJest from "next/jest";

// const createJestConfig = nextJest({
//   dir: "./",
// });

// const customJestConfig = {
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
//   testEnvironment: "jsdom",

//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//   },

//   testPathIgnorePatterns: [
//     "/node_modules/",
//     "/.next/",
//   ],
// };

// module.exports = createJestConfig(customJestConfig);

import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jsdom",
};

export default createJestConfig(customJestConfig);