module.exports = {
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/.*/**'],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  },
  moduleFileExtensions: ['web.js', 'js', 'web.ts', 'ts', 'web.tsx', 'tsx', 'json', 'web.jsx', 'jsx', 'node'],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  modulePaths: [],
  resetMocks: true,
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  setupFilesAfterEnv: ['<rootDir>/config/jest.setupTests.js'],
  testMatch: ['<rootDir>/**/__tests__/**/*.{ts,tsx}', '<rootDir>/**/*.{spec,test}.{ts,tsx}'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/ts-jest',
    '^.+\\.css$': '<rootDir>/config/jest.transform.style.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest.transform.file.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname']
};
