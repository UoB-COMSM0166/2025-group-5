module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ['**/docs/js/tests/**/*.test.js'],
    setupFiles: ['./jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/docs/js/$1'
    }
}; 