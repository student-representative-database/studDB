import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {findOneCouncil} from '../../../queries/council/findOneCouncil';
import {createCouncil} from '../../../queries/council/createCouncil';
import {deleteCouncil} from '../../../queries/council/deleteCouncil';
import {updateCouncil} from '../../../queries/council/updateCouncil';
import {databaseErrorHandler} from './databaseErrorHandler';

class CRUDcouncilsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }
/**
 * /api/v1/faculties/:id
 *  GET:
 *    description:  Renders the form for updating a snippet.
 *    responses:    200 - If user is logged in.
 *                  403 - If not logged in.
 *                  404 - If snippet is not found.
 */

  public getOne(req: Request, res: Response, next: NextFunction) {
    findOneCouncil(req.params.councilId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find all faculties failed'));
  }

  public create(req: Request, res: Response, next: NextFunction) {
    const facultyId = req.params.facultyId;
    createCouncil(facultyId, req.body)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(databaseErrorHandler, res))
      .catch(_.partial(onError, res, `Could not create council`));
  }

  public delete(req: Request, res: Response, next: NextFunction) {
    deleteCouncil(req.params.councilId)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Delete council failed'));
  }

  public patch(req: Request, res: Response, next: NextFunction) {
    updateCouncil(req.params.councilId, req.body)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Update council failed'));
  }

  public init() {
    this.router.get('/:facultyId/:councilId', this.getOne);
    this.router.post('/:facultyId', this.create);
    this.router.delete('/:facultyId/:councilId', this.delete);
    this.router.patch('/:facultyId/:councilId', this.patch);
  }
}

export default new CRUDcouncilsRouter().router
