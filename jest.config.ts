import type { Config } from '@jest/types';

const baseDir = '<rootDir>/src/app/doubles';
const baseTestDir = '<rootDir>/src/__tests__/doubles';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [`${baseDir}/**/*.ts`],
  testMatch: [`${baseTestDir}/**/*.ts`],
};

export default config;
