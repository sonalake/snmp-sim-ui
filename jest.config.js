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
    '!**/src/config/**',
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
    '\\.(jpe?g|svg|png|gif)$': '<rootDir>/src/utils/testUtils/__mocks__/fileMock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  roots: ['src'],
}
