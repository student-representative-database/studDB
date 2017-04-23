import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as logger from 'morgan'
import * as path from 'path'

// Import routes.
import HomeRouter from './routes/web/HomeRouter'
import facultiesCrudRouter from './routes/api/v1/CRUDfacultiesRouter'
import councilCrudRouter from './routes/api/v1/CRUDcouncilsRouter'
import usersCrudRouter from './routes/api/v1/CRUDusersRouter'
/**
 * Creates and configures an ExpressJS web server.
 *
 * @class App
 */
class App {
  // Member variables.
  public express: express.Application;

  /**
   * Creates an instance of an express App.
   *
   * @memberOf App
   */
  constructor() {
    this.express = express();
    this.middleware();
    this.routes()
  }

  /*
    Configures Express middlewares.
  */
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // this.express.use(express.static(path.join(__dirname, 'public')))
    this.express.use(express.static('public'));

    // Handlebars
    this.express.set('views', 'client/views');
    this.express.engine('.hbs', exphbs({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: 'client/views/layouts',
      partialsDir: 'client/views/partials'
    }));
    this.express.set('view engine', '.hbs')
  }

  /*
    Configure API endpoints.
  */
  private routes(): void {
    const router = express.Router();

    /*
      Web routes
     */
    this.express.use('/', HomeRouter);

    /*
      API routes
     */
    this.express.use('/api/v1/faculties', facultiesCrudRouter);
    this.express.use('/api/v1/faculties', councilCrudRouter);
    this.express.use('/api/v1/users', usersCrudRouter);

  }

}

export default new App().express
