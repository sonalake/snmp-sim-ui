module.exports = {
  clearMocks: true,
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: [
    '*.{ts,tsx}',
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!dist/tests/**',
    '!**/index.ts',
    '!**/index.js',
    '!**/src/models/**',
    '!**/src/assets/**',
    '!**/src/index.tsx',
  ],
  coverageReporters: ['text', 'json', 'html', 'lcov'],
  reporters: ['default', 'jest-junit', 'jest-stare'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(jpe?g|svg)$': '<rootDir>/src/utils/testUtils/mocks/fileMock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  roots: ['src'],
}
