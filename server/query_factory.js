const sprintf = require('sprintf-js').sprintf;

// TODO: add more methods for common query generation

module.exports.get_query = function() {
    return sprintf("SELECT TOP (%d) [CaseId], [Date], [Time], [Location], [Officer], [Description] FROM [Crime_Report]", 1000);
}