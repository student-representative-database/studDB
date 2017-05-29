import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {EmployeePositionModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne, deleteEmployeePosition } from '../../../queries/delete';
import {findOneEmployeePosition} from '../../../queries/findOne';
import { updateEmployeePosition } from '../../../queries/update';

class CRUDEmployeePositionsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * @api {get} employeePos/:councilId/:empId Get a Employee position
     * @apiVersion 0.1.0
     * @apiName GetEmployeePosition
     * @apiGroup EmployeePosition
     *
     * @apiParam (uriParams) {Number} councilId Council unique ID.
     * @apiParam (uriParams) {Number} empId Employee unique ID.
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "payload": {
     *  "EmployeeId": 1,
     *  "CouncilId": 1,
     *  "secretary": false,
     *  "chairman": true,
     *  "convener": false
     * }
     *   }
     * @apiError NoEmployeePositionFound No Employee Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeePositionFound"
     *     }
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneEmployeePosition(req.params.empId, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one employee position failed'));
    }

    /**
     * @api {post} employeePos/ Create a employee position
     * @apiVersion 0.1.0
     * @apiName CreateEmployeePosition
     * @apiGroup EmployeePosition
     *
     * @apiParam {Number} EmployeeId Employee unique ID.
     * @apiParam {Number} CouncilId Council unique ID.
     * @apiParam (Boolean) secretary A boolean value that shows the employees position in the council.
     * @apiParam (Boolean) chairman A boolean value that shows the employees position in the council.
     * @apiParam (Boolean) convener A boolean value that shows the employees position in the council.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "EmployeeId": 1,
     *   "CouncilId": 2,
     *   "secretary": false,
     *   "chairman": true,
     *   "convener": false
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "payload": {
     *  "EmployeeId": 2,
     *  "CouncilId": 2,
     *  "secretary": false,
     *  "chairman": true,
     *  "convener": false,
     *  "createdAt": "2017-05-29T11:06:37.561Z",
     *  "updatedAt": "2017-05-29T11:07:33.116Z"
     * }
     * @apiError NoEmployeePositionFound No Employee Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeePositionFound"
     *     }
     */

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, EmployeePositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create one employee position`));
    }

    /**
     * @api {delete} employeePos/:councilId/:empId Delete a Employee position
     * @apiVersion 0.1.0
     * @apiName DeleteEmployeePosition
     * @apiGroup EmployeePosition
     *
     * @apiParam (uriParams) {Number} councilId Council Instance unique ID.
     * @apiParam (uriParams) {Number} userId User unique ID.
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *   "CouncilId": 1,
     *   "EmployeeId": 1,
     *   "secretary": false,
     *   "chairman": true,
     *   "convener": false,
     *   "createdAt": "2017-05-19T15:20:56.552Z",
     *   "updatedAt": "2017-05-19T15:20:56.552Z"
     *  }
     * }
     *
     * @apiError NoEmployeePositionFound No Employee Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeePositionFound"
     *     }
     */
    public delete(req: Request, res: Response, next: NextFunction) {
        deleteEmployeePosition(req.params.empId, req.params.councilId, EmployeePositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete employee position failed'));
    }

    /**
     * @api {patch} employeePos/:councilId/:empId Update a Employee position
     * @apiVersion 0.1.0
     * @apiName UpdateEmployeePosition
     * @apiGroup EmployeePosition
     *
     * @apiParam (uriParams) {Number} councilId Council Instance unique ID.
     * @apiParam (uriParams) {Number} userId User unique ID.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "EmployeeId": 2,
     *   "CouncilId": 2,
     *   "secretary": false,
     *   "chairman": true,
     *   "convener": false
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "payload": {
     *  "EmployeeId": 2,
     *  "CouncilId": 2,
     *  "secretary": false,
     *  "chairman": true,
     *  "convener": false,
     *  "createdAt": "2017-05-29T11:06:37.561Z",
     *  "updatedAt": "2017-05-29T11:07:33.116Z"
     * }
     *
     * @apiError NoEmployeePositionFound No Employee Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeePositionFound"
     *     }
     */
    public patch(req: Request, res: Response, next: NextFunction) {
        updateEmployeePosition(req.params.empId, req.body, EmployeePositionModel, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update employee position failed'));
    }

    public init() {
        this.router.get('/:councilId/:empId', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:councilId/:empId', this.delete);
        this.router.patch('/:councilId/:empId', this.patch);
    }
}

export default new CRUDEmployeePositionsRouter().router
