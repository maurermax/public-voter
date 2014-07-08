public-voter
============

Public-Voter is a interactive voting client that enables administrators to set up questions for devices that connect to the voting server. User can vote and the current results will be seen live.

## Installation
```
npm install
```

## Run
```
node index.js
```

## Using
The admin interace will be located at:
http://localhost:3000/admin

You will find the reporting overview at:
http://localhost:3000/report

Incoming users should use:
http://localhost:3000

## Editing Standard Questions
Please use the /static/questions.json file to set standard questions that should be directly accessed.
