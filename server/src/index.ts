import express from 'express';
import cardsRoute from './routes/cards';
import adminRoute from './routes/admin';
import { CustomRoute } from './types';

const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true})); 

app.use(bodyParser.json());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

app.use('/static', express.static(__dirname + '/public'));

const routes: CustomRoute[] = [...cardsRoute, ...adminRoute];

routes.forEach(({ method, route, handler }) => {
  app[method](route, handler);
});

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(8000, () => {
  console.log('server listening on 8000...');
});