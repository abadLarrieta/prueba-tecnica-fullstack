import type { Config } from 'jest';

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],

  rootDir: '.',

  testRegex: '.*\\.spec\\.ts$',

  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: './tsconfig.test.json',
      },
    ],
  },

  extensionsToTreatAsEsm: ['.ts'],

  testEnvironment: 'node',

  collectCoverageFrom: [
    'src/**/*.(t|j)s',
  ],
};

export default config;