module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    coverageDirectory: './coverage',
    collectCoverage: true,
    coverageReporters: ['lcov', 'text-summary'],
    collectCoverageFrom: ['js/home.js', 'js/sala.js', 'js/login.js'],
};