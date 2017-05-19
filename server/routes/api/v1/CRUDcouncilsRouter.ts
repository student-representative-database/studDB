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
 * @api {get} /:faculty/:id Get all councils in a faculty.
 * @apiVersion 0.1.0
 * @apiName GetCouncils
 * @apiGroup Council
 *
 * @apiParam (uriParams) {Number} faculty Faculty unique ID.
 * @apiParam (uriParams) {Number} id Council unique ID.
 *
 * @apiParam {String} name Name of the Council.
 * @apiParam {String} lastname  Lastname of the User.
 * @apiParam {String[]} councils  Array of councils
 *
 * @apiSuccessExample Success-Response:
 * {
 *   payload: {
 *     id: 1,
 *     name: "Utbildningsråd",
 *     description: "...",
 *     facultyId: 1,
 *     studentPositions: 2,
 *     phdPositions: 2,
 *     "Employees": [{
 *       "id": 1,
 *       "firstName": "Olga",
 *       "lastName": "Oc",
 *       "phone": "0123456-123",
 *       "email": "oc@gmail.com",
 *       "facultyId": 1,
 *       "pro*fileUrl": "kllökök",
 *       "password": "$2a$08$PhENYMj6bfSaQ1aLRk1DxesMXThlEC/IAtNGil/53uCTJDNLyUe9i",
 *       "EmployeePosition": {
 *         "CouncilId": 1,
 *         "EmployeeId": 1,
 *         "secretary": false,
 *         "chairman": true,
 *         "convener": false,
 *         "createdAt": "2017-05-17T18:16:40.810Z",
 *         "updatedAt": "2017-05-17T18:16:40.810Z"
 *       },
 *       {...]],
 *     "CouncilInstances": [
 *     {
 *           "id": 1,
 *           "firstName": "Fredrik",
 *           "lastName": "Olsson",
 *           "birthDate": "1980-10-10T00:00:00.000Z",
 *           "phd": false,
 *           "phone": "0123456-123",
 *           "email": "fredriko.olsson@gmail.com",
 *           "graduationYear": "1970-01-01T00:00:02.018Z",
 *           "program": "UDM",
 *           "comments": "bla",
 *           "UserPosition": {
 *             "UserId": 1,
 *             "CouncilInstanceId": 1,
 *             "from": "2017-01-02T00:00:00.000Z",
 *             "till": "2017-05-29T00:00:00.000Z",
 *             "elected": true,
 *             "createdAt": "2017-05-17T18:16:40.864Z",
 *             "updatedAt": "2017-05-17T18:16:40.864Z"
 *           }
 *         },
 *         {...}],
 *   }
 * }
 * @apiError CouncilNotFound The id of the Council was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CouncilNotFound"
 *     }
 */

  public getOne(req: Request, res: Response, next: NextFunction) {
    findOneCouncil(req.params.councilId, req.query.all)
      .then(_.partial(onSuccess, res))
      .catch(_.partial(onError, res, 'Get One Council failed!'));
  }

/**
 * @api {post} /:councils Create council
 * @apiVersion 0.1.0
 * @apiName CreateCouncil
 * @apiGroup Council
 *
 * @apiParam {String} name Name of the Council.
 * @apiParam {String} description Description of the Council.
 * @apiParam {Number} studentPositions Number of student Positions in the Council.
 * @apiParam {Number} phdPositions Number of phd Positions in the Council.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "name": "Utbildningsråd",
 *   "description": "...",
 *   "studentPositions": 2,
 *   "phdPositions": 2
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "payload": {
 *     "id": 3,
 *     "name": "Utbildningsråd",
 *     "description": "...",
 *     "studentPositions": 2,
 *     "phdPositions": 2,
 *     "facultyId": 1,
 *     "updatedAt": "2017-05-02T08:15:03.453Z",
 *     "createdAt": "2017-05-02T08:15:03.453Z"
 *   }
 * }
 *
 * @apiError DuplicateCouncilName There alredy exist a council with that name in the faculty
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "error": "DuclicateCouncilName"
 *     }
 */
  public create(req: Request, res: Response, next: NextFunction) {
    create(req.body, CouncilModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(databaseErrorHandler, res))
        .catch(_.partial(onError, res, `Could not create council`));
  }

/**
 * @api {delete} /:councils/:id Delete council
 * @apiVersion 0.1.0
 * @apiName DeleteCouncil
 * @apiGroup Council
 *
 * @apiParam (uriParams) {Number} id Council unique ID.
 *
 * @apiSuccessExample Success-Response:
 * {
 * "payload": {
 *  "id": 1,
 *   "name": "Utbildningsråd",
 *   "description": "...",
 *   "facultyId": 1,
 *   "studentPositions": 2,
 *   "phdPositions": 2,
 *   "createdAt": "2017-05-17T19:25:05.159Z",
 *   "updatedAt": "2017-05-17T19:25:05.159Z"
 * }
 * }
 *
 * @apiError NoCouncilWithId No faculty with that id exists
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CouncilNotFound"
 *     }
 */

  public delete(req: Request, res: Response, next: NextFunction) {
    deleteOne(req.params.councilId, CouncilModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Delete council failed'));
  }

/**
 * @api {patch} /:councils/:id Update council
 * @apiVersion 0.1.0
 * @apiName UpdateCouncil
 * @apiGroup Council
 *
 * @apiParam (uriParams) {Number} id Council unique ID.
 *
 * @apiParamExample {json} Request-Example:
 * {
 *   "name": "Utbildningsråd #2",
 *   "description": "...",
 *   "studentPositions": 3,
 *   "phdPositions": 2
 * }
 *
 * @apiSuccessExample Success-Response:
 * {
 * "payload": {
 *  "id": 1,
 *  "name": "Utbildningsråd #2",
 *  "description": "...",
 *  "facultyId": "1",
 *  "studentPositions": "2",
 *  "phdPositions": "2",
 *  "createdAt": "2017-05-17T19:27:17.342Z",
 *  "updatedAt": "2017-05-17T19:27:21.199Z"
 * }
 * }
 *
 * @apiError NoCouncilWithId No faculty with that id exists
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "CouncilNotFound"
 *     }
 */
  public patch(req: Request, res: Response, next: NextFunction) {
    update(req.params.councilId, req.body, CouncilModel)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, 'Update council failed'));
  }

  public init() {
    this.router.get('/:councilId', this.getOne);
    this.router.post('/', this.create);
    this.router.delete('/:councilId', this.delete);
    this.router.patch('/:councilId', this.patch);
  }
}

export default new CRUDcouncilsRouter().router
