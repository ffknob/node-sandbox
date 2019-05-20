import express, { Application } from 'express';

import { router as index }  from './routes/index';

const app: Application = express();

app.use('/', index);

app.listen(5000, () => console.log('Server running...'));