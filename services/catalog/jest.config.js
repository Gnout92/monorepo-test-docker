export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts'],
  // BỎ cảnh báo "globals is deprecated" -> cấu hình qua transform
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { useESM: true }]
  },
  // QUAN TRỌNG: map import './file.js' -> './file' để ts-jest resolve .ts
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  },
  extensionsToTreatAsEsm: ['.ts']
};
