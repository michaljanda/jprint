const express = require('express');
const bodyParser = require('body-parser');
const jiraC = require('./backend/jira');


const app = express();
app.use(bodyParser.json());
const port = 5000;

/**
 * @param req
 * @param res
 * @returns {JiraClient}
 */
function getJira(req, res) {
    try {
        return jiraC(req.headers.authorization);
    } catch (error) {
        if (error.message === 'Missing \'username\' property.') {
            res.status(401).send({msg: error.message});
        } else {
            res.status(500).send({msg: error.message});
        }
    }
}

function getProcessFn(res) {
    return function (error, jiraRes) {
        if (error) {
            if (error.includes('Unauthorized')) {
                res.status(401).send(error);
            } else {
                res.status(500).send(error);
            }
        } else {
            res.send(jiraRes);
        }
    }
}

app.post('/api/login', (req, res) => {
    let jira = getJira(req, res);
    if (jira) {
        jira.issue.getIssue({issueKey: 'OAM-1'}, getProcessFn(res));
    }
});

app.get('/api/search', (req, res) => {
    let jira = getJira(req, res);
    if (jira) {
        jira.search.search({jql: 'dsprint%20%3D%201860'}, getProcessFn(res));
    }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
