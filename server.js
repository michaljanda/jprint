const express = require('express');
const serveStatic = require('serve-static');
const JiraClient = require('jira-connector');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const port = 5000;


let jira = null;

app.post('/api/login', (req, res) => {
    jira = new JiraClient( {
        host: 'at.acision.com/jira',
        basic_auth: {
            base64: req.body.auth
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
