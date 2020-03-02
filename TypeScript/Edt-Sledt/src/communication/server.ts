// tslint:disable:no-var-requires
const path = require('path');
const express = require('express');

export const app = express();
export const server = require('http').createServer(app);

app.use('/edt-control', express.static(path.join(__dirname, '../../../static/edt-control')));
app.use('/edt-vidt', express.static(path.join(__dirname, '../../../static/edt-vidt')));

app.get('/edt-control/*', (req, res) => res.sendFile(path.join(__dirname, '../../../static/edt-control/index.html')));
app.get('/edt-vidt/*', (req, res) => res.sendFile(path.join(__dirname, '../../../static/edt-vidt/index.html')));

server.listen(8898);
app.listen(8888);
