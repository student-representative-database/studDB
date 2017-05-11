import * as bodyParser from 'body-parser'
import * as express from 'express'
import * as exphbs from 'express-handlebars'
import * as logger from 'morgan'
import * as path from 'path'

// Import routes.
import HomeRouter from './routes/web/HomeRouter'
import AdminRouter from './routes/web/AdminRouter'
import CouncilRouter from './routes/web/CouncilRouter'
import RegisterRouter from './routes/web/RegisterRouter'
import CRUDfacultiesRouter from './routes/api/v1/CRUDfacultiesRouter'
import CRUDcouncilRouter from './routes/api/v1/CRUDcouncilsRouter'
import CRUDusersRouter from './routes/api/v1/CRUDusersRouter'
import CRUDemployeesRouter from './routes/api/v1/CRUDemployeeRouter'
import CRUDcouncilInstRouter from './routes/api/v1/CRUDcouncilInstRouter'
import CRUDapplicationRouter from './routes/api/v1/CRUDapplicationRouter'
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
    const router = express.Router()

    /*
      Web routes
     */
    this.express.use('/', HomeRouter)
    this.express.use('/admin', AdminRouter)
    this.express.use('/council', CouncilRouter)
    this.express.use('/apply', RegisterRouter)

    /*
      API routes
     */
    this.express.use('/api/v1/faculties', CRUDfacultiesRouter);
    this.express.use('/api/v1/councils', CRUDcouncilRouter);
    this.express.use('/api/v1/councilsinst', CRUDcouncilInstRouter);
    this.express.use('/api/v1/users', CRUDusersRouter);
    this.express.use('/api/v1/employees', CRUDemployeesRouter);
    this.express.use('/api/v1/applications', CRUDapplicationRouter);
  }
}

export default new App().express
