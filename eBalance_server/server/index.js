import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan';

import api from './api';

const app = express();

// middleware init
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', api);

export default app;
