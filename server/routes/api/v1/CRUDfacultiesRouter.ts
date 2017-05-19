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
import { search } from '../../../queries/search';

class CRUDfacultiesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

/**
 * @api {get} /faculties/ Get all faculties
 * @apiVersion 0.1.0
 * @apiName GetFaculties
 * @apiGroup Faculty
 *
 * @apiParam {String} true/false If set to true the Api will only show currently active councils.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "payload": [
 *     {
 *       "id": 1,
 *       "name": "Fakulteten för teknik",
 *       "councils": [
 *         {
 *            "id": 2,
 *            "name": "Rådet för de som gillar back-end",
 *            "studentPositions": 3,
 *            "phdPositions": 2,
 *            "from": "2017-01-01T00:00:00.000Z",
 *            "till": "2017-05-30T00:00:00.000Z",
 *            "facultyId": 1
 *         }
 *       ]
 *     },
 *     {...}
 *   ]
 * }
 * @apiError NoFacultiesFound No faculties found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "NoFacultiesFound"
 *     }
 */

public getAll(req: Request, res: Response, next: NextFunction) {
  // TODO Finish implemntation.
  findAllFaculties(req.query.showAll)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Find all faculties failed'));
  }

/**
 * @api {get} /faculty/:id Get faculty
 * @apiVersion 0.1.0
 * @apiName GetFaculty
 * @apiGroup Faculty
 *
 * @apiParam (uriParams) {number} id Id of the Faculty.
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * "payload": {
 *   "id": 1,
 *   "name": "Fakulteten för teknik",
 *   "councils": [
 *     {
 *       "id": 1,
 *       "name": "Utbildningsråd",
 *       "description": "...",
 *       "facultyId": 1
 *     }
 *   ]
 * }
 *
 * @apiError FacultyNotFound Id of the Faculty was not found.
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
 * @api {post} /faculty/ Create faculty
 * @apiVersion 0.1.0
 * @apiName CreateFaculty
 * @apiGroup Faculty
 *
 * @apiParam (uriParams) {Number} id Faculty unique ID.
 * @apiParam {String} name Name of the Faculty.
 * @apiParamExample {json} Request-Example:
 *   {
 *     "name": "Fakulteten för teknik"
 *   }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "payload": {
 *     "id": 1,
 *     "name": "Fakulteten för teknik"
 *   }
 * }
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
 * @api {delete} /faculty/:id Delete faculty
 * @apiVersion 0.1.0
 * @apiName DeleteFaculty
 * @apiGroup Faculty
 *
 * @apiParam (uriParams) {Number} id Faculty unique ID.
 *
 * @apiSuccessExample Success-Response:
 * {
 *   "payload": {
 *     "id": 1,
 *     "name": "Fakulteten för teknik"
 *   }
 * }
 *
 * @apiError NoFacultyWithId No faculty with that id exists
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
 * @api {patch} /faculty/:id Update faculty
 * @apiVersion 0.1.0
 * @apiName patchFaculty
 * @apiGroup Faculty
 *
 * @apiParam (uriParams) {Number} id Faculty unique ID.
 *
 * @apiParamExample {json} Request-Example:
 *   {
 *     "name": "Fakulteten för "
 *   }
 *
 * @apiSuccessExample Success-Response:
 *   "payload": {
 *       "id": 1,
 *       "name": "Fakulteten för samhällsvetenskap"
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
