const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/coverage'],
  moduleNameMapper: {
    '@/src': ['<rootDir>/src/$1'],
    '@/mocks(.*)$': ['<rootDir>/src/mocks$1'],
    '@/components(.*)$': ['<rootDir>/src/components$1'],
    '@/styles(.*)$': ['<rootDir>/src/styles/$1'],
    '@/hooks(.*)$': ['<rootDir>/src/hooks$1'],
    '@/utils(.*)$': ['<rootDir>/src/utils$1'],
    '@/store(.*)$': ['<rootDir>/src/store$1'],
    '@/style(.*)$': ['<rootDir>/src/style$1'],
    '@/services(.*)$': ['<rootDir>/src/services$1'],
    '@/configs(.*)$': ['<rootDir>/src/configs$1'],
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/app/**/*.{js,jsx,ts,tsx}',
    'src/components/**/*.{js,jsx,ts,tsx}',
    'src/hooks/**/*.{js,jsx,ts,tsx}',
    'src/utils/**/*.{js,jsx,ts,tsx}',
    'src/sections/**/*.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};

module.exports = createJestConfig(customJestConfig);
