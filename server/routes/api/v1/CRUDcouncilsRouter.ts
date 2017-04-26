import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {CouncilModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {findOneCouncil} from '../../../queries/findOne';
import {findOneInst} from '../../../queries/findOne';
import { update } from '../../../queries/update';

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
    findOneCouncil(req.params.councilId, 2017)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find all faculties failed'));
  }

  public create(req: Request, res: Response, next: NextFunction) {
    const facultyId = req.params.facultyId;
    create(req.body, CouncilModel, facultyId)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(databaseErrorHandler, res))
        .catch(_.partial(onError, res, `Could not create council`));
  }

  public delete(req: Request, res: Response, next: NextFunction) {
    deleteOne(req.params.councilId, CouncilModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Delete council failed'));
  }

  public patch(req: Request, res: Response, next: NextFunction) {
    update(req.params.councilId, req.body, CouncilModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Update council failed'));
  }

  public getOneInst(req: Request, res: Response, next: NextFunction) {
    findOneInst(req.params.councilId, req.params.year)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find councel instance failed'));
  }

  public init() {
    this.router.get('/:facultyId/:councilId', this.getOne);
    this.router.post('/:facultyId', this.create);
    this.router.delete('/:facultyId/:councilId', this.delete);
    this.router.patch('/:facultyId/:councilId', this.patch);
    this.router.get('/:facultyId/:councilId/:year', this.getOneInst);
  }
}

export default new CRUDcouncilsRouter().router
