import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import { onError } from './onError';
import { onSuccess } from './onSuccess';
import { databaseErrorHandler } from './databaseErrorHandler';
import {FacultyModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import { findOneFaculty } from '../../../queries/findOne';
import { update } from '../../../queries/update';
import { findAllFaculties } from '../../../queries/findAll';

class CRUDfacultiesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

/**
 * @api {get} /faculty/ Get all facultys and contained councils
 * @apiVersion 0.1.0
 * @apiName GetFacultys
 * @apiGroup Faculty
 *
 * @apiParam {Number} id Faculty unique ID.
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

  public getAll(req: Request, res: Response, next: NextFunction) {
    findAllFaculties()
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find all faculties failed'));
  }

/**
 * @api {get} /faculty/:id Get one faculty and contained councils
 * @apiVersion 0.1.0
 * @apiName GetFaculty
 * @apiGroup Faculty
 *
 * @apiSuccess {String} name Name of the Faculty.
 * @apiSuccess {String} lastname  Lastname of the User.
 * * @apiSuccess {String[]} councils  Array of councils
 *
 * @apiSuccessExample Success-Response:
 *   "payload": {
 *       "id": 1,
 *       "name": "Fakulteten för datavetenskap",
 *       "councils": [
 *         {
 *           "id": 1,
 *           "name": "Rådet för datornördar",
 *           "description": "Nerds R US, vi som capsar och dricker jolt cola",
 *           "facultyId": 1
 *         }
 *     }
 * }
 * @apiError FacultyNotFound The id of the Faculty was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "FacultyNotFound"
 *     }
 */

  public getOne(req: Request, res: Response, next: NextFunction) {
    findOneFaculty(req.params.id)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find one faculty failed'));
  }

/**
 * @api {create} /faculty/:id Create one faculty
 * @apiVersion 0.1.0
 * @apiName CreateFaculty
 * @apiGroup Faculty
 *
 * @apiParam {Number} id Faculty unique ID.
 *
 * @apiSuccess {String} name Name of the Faculty.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String[]} councils  Array of councils
 *
 * @apiSuccessExample Success-Response:
 *   "payload": {
 *       "id": 1,
 *       "name": "Fakulteten för datavetenskap"
 *     }
 *
 * @apiError DuplicateFacultyName There alredy exist a faculty with that name
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "error": "DuclicateFacultyName"
 *     }
 */

  public create(req: Request, res: Response, next: NextFunction) {
    create(req.body, FacultyModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(databaseErrorHandler, res))
        .catch(_.partial(onError, res, `Could not create faculty`));
  }

/**
 * @api {delete} /faculty/:id Delete one faculty
 * @apiVersion 0.1.0
 * @apiName DeleteFaculty
 * @apiGroup Faculty
 *
 * @apiParam {Number} id Faculty unique ID.
 *
 * @apiSuccess {Number} id Id of the Faculty.
 * @apiSuccess {String} name Name of the Faculty.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *   "payload": {
 *       "id": 1,
 *       "name": "Fakulteten för datavetenskap"
 *     }
 *
 * @apiError NoFacultyWitdId There alredy exist a faculty with that name
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "FacultyNotFound"
 *     }
 */

  public delete(req: Request, res: Response, next: NextFunction) {
    deleteOne(req.params.id, FacultyModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Delete faculty failed'));
  }

/**
 * @api {patch} /faculty/:id Create one faculty
 * @apiVersion 0.1.0
 * @apiName patchFaculty
 * @apiGroup Faculty
 *
 * @apiParam {Number} id Faculty unique ID.
 *
 * @apiSuccess {String} name Name of the Faculty.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String[]} councils  Array of councils
 *
 * @apiSuccessExample Success-Response:
 *   "payload": {
 *       "id": 1,
 *       "name": "Fakulteten för datavetenskap"
 *     }
 *
 * @apiError DuplicateFacultyName There alredy exist a faculty with that name
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "error": "DuclicateFacultyName"
 *     }
 */

  public patch(req: Request, res: Response, next: NextFunction) {
    update(req.params.id, req.body, FacultyModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Update faculty failed'));
  }

  public init() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getOne);
    this.router.delete('/:id', this.delete);
    this.router.patch('/:id', this.patch);
  }
}

export default new CRUDfacultiesRouter().router
