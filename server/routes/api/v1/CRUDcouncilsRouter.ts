import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {CouncilModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {findOneCouncil} from '../../../queries/findOne';
import { update } from '../../../queries/update';

class CRUDcouncilsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

/**
 * @api {get} /faculty/ Get all council and contained XXXXXXXXX
 * @apiVersion 0.1.0
 * @apiName GetCouncils
 * @apiGroup Council
 *
 * @apiParam {Number} id Council unique ID.
 *
 * @apiSuccess {String} name Name of the Faculty.
 * @apiSuccess {String} lastname  Lastname of the User.
 * * @apiSuccess {String[]} councils  Array of councils
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "payload": [
 *     {
 *       "id": 1,
 *       "name": "Fakulteten för datavetenskap",
 *       "councils": [
 *         {
 *           "id": 1,
 *           "name": "Rådet för datornördar",
 *           "description": "Nerds R US, vi som capsar och dricker jolt cola",
 *           "facultyId": 1
 *         }
 *       ]
 *     },
 *     {
 *       "id": 2,
 *       "name": "Fakulteten för ngntingannat",
 *       "councils": [
 *         {
 *           "id": 2,
 *           "name": "Rådet för snickare",
 *           "description": "Hammare och spik!!!",
 *           "facultyId": 2
 *         }
 *       ]
 *     }
 *   ]
 * }
 * @apiError FacultyNotFound The id of the Faculty was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "FacultysNotFound"
 *     }
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

  public init() {
    this.router.get('/:facultyId/:councilId', this.getOne);
    this.router.post('/:facultyId', this.create);
    this.router.delete('/:facultyId/:councilId', this.delete);
    this.router.patch('/:facultyId/:councilId', this.patch);
  }
}

export default new CRUDcouncilsRouter().router
