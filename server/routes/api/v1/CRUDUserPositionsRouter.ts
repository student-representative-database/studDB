import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {UserPositionModel} from '../../../model/model';
import {findOneUserPosition} from "../../../queries/findOne";
import { create} from '../../../queries/create';
import { deleteUserPosition } from '../../../queries/delete';
import { updateUserPosition } from '../../../queries/update';
import {findAllUserPositions} from "../../../queries/findAll";

class CRUDUserPositionsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * @api {get} userPosition/:councilId/:userId Get a User position
     * @apiVersion 0.1.0
     * @apiName GetUserPosition
     * @apiGroup UserPosition
     *
     * @apiParam (uriParams) {Number} councilId Council Instance unique ID.
     * @apiParam (uriParams) {Number} userId User unique ID.
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "payload": {
     *  "UserId": 2,
     *  "CouncilInstanceId": 2,
     *  "from": "2017-01-02T00:00:00.000Z",
     *  "till": "2017-05-29T00:00:00.000Z",
     *  "elected": false
     * }
     *   }
     * @apiError NoUserPositionFound No User Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUserPositionFound"
     *     }
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneUserPosition(req.params.councilId, req.params.userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find user position instance failed'));
    }

    /**
     * @api {get} userPosition/ Get all User positions
     * @apiVersion 0.1.0
     * @apiName GetUserAllPositions
     * @apiGroup UserPosition
     *
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *  "payload": [
     *  {
     *  "UserId": 2,
     *  "CouncilInstanceId": 2,
     *  "from": "2017-01-02T00:00:00.000Z",
     *  "till": "2017-05-29T00:00:00.000Z",
     *  "elected": false
     * }
     *  {...}
     *  ]
     *   }
     * @apiError NoUserPositionFound No User Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUserPositionFound"
     *     }
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        findAllUserPositions()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find user position instance failed'));
    }

    /**
     * @api {post} userPosition/ Create a User position
     * @apiVersion 0.1.0
     * @apiName CreateUserPosition
     * @apiGroup UserPosition
     *
     * @apiParam {Number} UserId User unique ID.
     * @apiParam {Number} CouncilInstanceId Council Instance unique ID.
     * @apiParam (String) from A date object that shows the start of the period.
     * @apiParam (String) till A date object that shows the end of the period.
     * @apiParam (Boolean) elected Whether the user is elected or not.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "UserId": 1,
     *   "CouncilInstanceId": 1,
     *   "from": "2017-01-01T00:00:00.000Z",
     *   "till": "2017-05-30T00:00:00.000Z",
     *   "elected": false
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "payload": {
     *  "UserId": 1,
     *  "CouncilInstanceId": 1,
     *  "from": "2017-01-01T00:00:00.000Z",
     *  "till": "2017-05-30T00:00:00.000Z",
     *  "elected": false,
     *  "createdAt": "2017-05-29T11:06:37.561Z",
     *  "updatedAt": "2017-05-29T11:07:33.116Z"
     * }
     * @apiError NoUserPositionFound No User Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUserPositionFound"
     *     }
     */

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, UserPositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create user position`));
    }

    /**
     * @api {delete} userPosition/:councilId/:userId Delete a User position
     * @apiVersion 0.1.0
     * @apiName DeleteUserPosition
     * @apiGroup UserPosition
     *
     * @apiParam (uriParams) {Number} councilId Council Instance unique ID.
     * @apiParam (uriParams) {Number} userId User unique ID.
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *   "UserId": 1,
     *   "CouncilInstanceId": 1,
     *   "from": "2017-01-01T00:00:00.000Z",
     *   "till": "2017-05-30T00:00:00.000Z",
     *   "elected": true,
     *   "createdAt": "2017-05-19T15:20:56.552Z",
     *   "updatedAt": "2017-05-19T15:20:56.552Z"
     *  }
     * }
     *
     * @apiError NoUserPositionFound No User Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUserPositionFound"
     *     }
     */

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteUserPosition(req.params.userId, req.params.councilId, UserPositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete user position failed'));
    }

    /**
     * @api {patch} userPosition/:councilId/:userId Update a User position
     * @apiVersion 0.1.0
     * @apiName UpdateUserPosition
     * @apiGroup UserPosition
     *
     * @apiParam (uriParams) {Number} councilId Council Instance unique ID.
     * @apiParam (uriParams) {Number} userId User unique ID.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "UserId": 1,
     *   "CouncilInstanceId": 1,
     *   "from": "2018-01-01T00:00:00.000Z",
     *   "till": "2018-05-30T00:00:00.000Z",
     *   "elected": false
     * }
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *  "UserId": 1,
     *  "CouncilInstanceId": 1,
     *  "from": "2018-01-01T00:00:00.000Z",
     *  "till": "2018-05-30T00:00:00.000Z",
     *  "elected": false,
     *  "createdAt": "2017-05-17T19:27:17.342Z",
     *  "updatedAt": "2017-05-17T19:27:21.199Z"
     * }
     * }
     *
     * @apiError NoUserPositionFound No User Position found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUserPositionFound"
     *     }
     */
    public patch(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        updateUserPosition(req.params.userId, req.body, UserPositionModel, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update user position failed'));
    }

    public init() {
        this.router.get('/:councilId/:userId', this.getOne);
        this.router.get('/', this.getAll);
        this.router.post('/', this.create);
        this.router.delete('/:councilId/:userId', this.delete);
        this.router.patch('/:councilId/:userId', this.patch);
    }
}

export default new CRUDUserPositionsRouter().router

