import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import { onError } from './onError';
import { onSuccess } from './onSuccess';
import {findAllVacantPositions, findAllVacantPositions2} from "../../../queries/applications/findAllVacant";

class CRUDapplicationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getAll(req: Request, res: Response, next: NextFunction) {
    findAllVacantPositions(req.query.year)
      .then(_.partial(onSuccess, res))
      // .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find vacant positions failed'));
  }

  public getAll2(req: Request, res: Response, next: NextFunction) {
    findAllVacantPositions2(req.query.year)
        .then(_.partial(onSuccess, res))
        // .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Find vacant positions failed'));
  }

  public init() {
    this.router.get('/', this.getAll);
    this.router.get('/test', this.getAll2);
  }
}

export default new CRUDapplicationRouter().router
