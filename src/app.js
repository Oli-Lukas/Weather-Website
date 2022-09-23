import express      from 'express';
import { engine }   from 'express-handlebars';
import path         from 'path';
import cookieParser from 'cookie-parser';
import cors         from 'cors';
import logger       from 'morgan';
import bodyParser   from 'body-parser';
import __dirname    from './dirname.js';
import Router       from './routes/routes.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, "public")));

app.engine('handlebars', engine({
  layoutsDir: `${__dirname}/public/views/layouts`,
  defaultLayout: 'main.handlebars',
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'public', 'views', 'pages'));

app.use('/', Router);

app.use(function (req, res, next) {
  res.status(404).json({message: "We couldn't find what you were looking for 😞"})
});
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
});

export default app;