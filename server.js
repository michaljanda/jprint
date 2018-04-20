const express = require('express');
const bodyParser = require('body-parser');
const jiraC = require('./backend/jira');



const app = express();
app.use(bodyParser.json());
const port = 5000;


app.post('/api/login', (req, res) => {
    let jira = jiraC(req.body.auth);
    jira.getIssue({issueKey: 'OAM-1'}, function (error) {
        if (error) {
            res.status(401).send(error);
        } else {
            res.send({connected: true, auth: req.body.auth});
        }
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
