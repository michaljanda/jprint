const jiraConnector = require('jira-connector');

/**
 *
 * @param auth
 * @param host
 * @returns {module.exports}
 */
module.exports = function (auth, host) {
    return new jiraConnector( {
        host: host,
        basic_auth: {
            base64: auth
        }
    });
};
