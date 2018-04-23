const express = require('express');
const bodyParser = require('body-parser');
const jiraC = require('./backend/jira');
const _ = require('lodash');
const path = require('path');
const argv = require('yargs').argv;
const https = require('https');
const fs = require('fs');


const app = express();
app.use(bodyParser.json());

let port = null;
if (argv.https) {
    port = 8443;
} else {
    port = 8080;
}


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
            if (_.isString(error) && error.includes('Unauthorized')) {
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

app.get('/api/search/:query', (req, res) => {
    let jira = getJira(req, res);
    if (jira) {
        jira.search.search({jql: req.params.query}, getProcessFn(res));
    }
});

app.use(express.static(path.join(__dirname, 'jprint/dist')));

// Send all other requests to the Angular app
app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, 'jprint/dist/index.html'));
});

if (argv.https) {
    https.createServer({
        key: fs.readFileSync(argv.https + '.key'),
        cert: fs.readFileSync(argv.https + '.crt')
    }, app).listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
} else {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

