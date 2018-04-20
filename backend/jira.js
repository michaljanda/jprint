const jiraConnector = require('jira-connector');

/**
 *
 * @param auth
 * @returns {module.exports}
 */
module.exports = function (auth) {
    return new jiraConnector( {
        host: 'at.acision.com/jira',
        basic_auth: {
            base64: auth
        }
    });
};
