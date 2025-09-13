// report-generator.js
const reporter = require('multiple-cucumber-html-reporter');

reporter.generate({
    jsonDir: 'reports',                   // Path to your cucumber JSON files
    reportPath: 'reports/html-report',    // Path where the HTML report will be generated
    openReportInBrowser: true,            // Opens report after generation
    metadata:{
        browser: {
            name: 'chrome',
            version: 'latest'
        },
        device: 'Local test machine',
        platform: {
            name: process.platform,
            version: process.version
        }
    }
});
