module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/__test__/**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
