import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {findOneInst} from "../../../queries/findOne";
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {update} from '../../../queries/update';
import {CouncilInstanceModel} from '../../../model/model';
import {findAllCouncilInstances} from "../../../queries/findAll";

class CRUDCouncilInstRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * @api {get} councilsinst/:id/ Get a Council Instance
     * @apiVersion 0.1.0
     * @apiName GetCouncilInstance
     * @apiGroup CouncilInstance
     *
     * @apiParam (uriParams) {Number} id Council Instance unique ID.
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "payload": {
     *  "id": 1,
     *  "councilId": 1,
     *  "from": "2017-01-01T00:00:00.000Z",
     *  "till": "2017-05-30T00:00:00.000Z",
     *  "Users": [
     * {
     *  "id": 1,
     *   "firstName": "Fredrik",
     *   "lastName": "Olsson",
     *   "birthDate": "1980-10-10T00:00:00.000Z",
     *   "phd": false,
     *   "phone": "0123456-123",
     *   "email": "fredriko.olsson@gmail.com",
     *   "graduationYear": "1970-01-01T00:00:02.018Z",
     *   "program": "UDM",
     *   "comments": "bla",
     *   "UserPosition": {
     *     "UserId": 1,
     *     "CouncilInstanceId": 1,
     *     "from": "2017-01-02T00:00:00.000Z",
     *     "till": "2017-05-29T00:00:00.000Z",
     *     "elected": true,
     *     "createdAt": "2017-05-19T14:53:13.793Z",
     *     "updatedAt": "2017-05-19T14:53:13.793Z"
     *   }
     * },
     *  {...}
     *   ]
     * }
     * @apiError NoCouncilInstancesFound No Council Instance found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoCouncilInstancesFound"
     *     }
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneInst(req.params.id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one council instance failed'));
    }

    /**
     * @api {get} councilsinst/ Get all Council Instances
     * @apiVersion 0.1.0
     * @apiName GetAllCouncilInstances
     * @apiGroup CouncilInstance
     *
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "payload": {
     *  "id": 1,
     *  "councilId": 1,
     *  "from": "2017-01-01T00:00:00.000Z",
     *  "till": "2017-05-30T00:00:00.000Z",
     *  "Users": [
     * {
     *  "id": 1,
     *   "firstName": "Fredrik",
     *   "lastName": "Olsson",
     *   "birthDate": "1980-10-10T00:00:00.000Z",
     *   "phd": false,
     *   "phone": "0123456-123",
     *   "email": "fredriko.olsson@gmail.com",
     *   "graduationYear": "1970-01-01T00:00:02.018Z",
     *   "program": "UDM",
     *   "comments": "bla",
     *   "UserPosition": {
     *     "UserId": 1,
     *     "CouncilInstanceId": 1,
     *     "from": "2017-01-02T00:00:00.000Z",
     *     "till": "2017-05-29T00:00:00.000Z",
     *     "elected": true,
     *     "createdAt": "2017-05-19T14:53:13.793Z",
     *     "updatedAt": "2017-05-19T14:53:13.793Z"
     *   }
     * },
     *  {...}
     *   ]
     * }
     * @apiError NoCouncilInstancesFound No Council Instance found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoCouncilInstancesFound"
     *     }
     */
    public getAll(req: Request, res: Response, next: NextFunction) {
        findAllCouncilInstances()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one council instance failed'));
    }

    /**
     * @api {post} /councilsinst Create a Council Instance
     * @apiVersion 0.1.0
     * @apiName CreateCouncilInstance
     * @apiGroup CouncilInstance
     *
     * @apiParam (String) from A date object that shows the start of the period.
     * @apiParam (String) till A date object that shows the end of the period.
     * @apiParam (Number) councilId The id of the council.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "from": "2017-01-01T00:00:00.000Z",
     *   "till": "2017-05-30T00:00:00.000Z",
     *   "councilId": 2,
     * }
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "payload": {
     *  "id": 1,
     *  "councilId": 1,
     *  "from": "2017-01-01T00:00:00.000Z",
     *  "till": "2017-05-30T00:00:00.000Z",
     * }
     * @apiError NoCouncilInstancesFound No Council Instance found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoCouncilInstancesFound"
     *     }
     */

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, CouncilInstanceModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create council instance`));
    }

    /**
     * @api {delete} /councilsinst/:id Delete council Instance
     * @apiVersion 0.1.0
     * @apiName DeleteCouncilInstance
     * @apiGroup CouncilInstance
     *
     * @apiParam (uriParams) {Number} id Council Instance unique ID.
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *  "id": 1,
     *   "from": "2017-01-01T00:00:00.000Z",
     *   "till": "2017-05-30T00:00:00.000Z",
     *   "councilId": 1,
     *   "createdAt": "2017-05-19T15:20:56.552Z",
     *   "updatedAt": "2017-05-19T15:20:56.552Z"
     *  }
     * }
     *
     * @apiError NoCouncilInstancesFound No Council Instance found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoCouncilInstancesFound"
     *     }
     */
    public delete(req: Request, res: Response, next: NextFunction) {
        deleteOne(req.params.id, CouncilInstanceModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete council instance failed'));
    }

    /**
     * @api {patch} /councilsinst/:id Update council Instance
     * @apiVersion 0.1.0
     * @apiName UpdateCouncilInstance
     * @apiGroup CouncilInstance
     *
     * @apiParam (uriParams) {Number} id Council unique ID.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "from": "2018-01-01T00:00:00.000Z",
     *   "till": "2018-05-30T00:00:00.000Z",
     *   "councilId": 2,
     * }
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *  "id": 1,
     *  "from": "2018-01-01T00:00:00.000Z",
     *  "till": "2018-05-30T00:00:00.000Z",
     *  "councilId": 2,
     *  "createdAt": "2017-05-17T19:27:17.342Z",
     *  "updatedAt": "2017-05-17T19:27:21.199Z"
     * }
     * }
     *
     * @apiError NoCouncilInstancesFound No Council Instance found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoCouncilInstancesFound"
     *     }
     */
    public patch(req: Request, res: Response, next: NextFunction) {
        update(req.params.id, req.body, CouncilInstanceModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update council instance failed'));
    }

    public init() {
        this.router.get('/:id', this.getOne);
        this.router.get('/', this.getAll);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.patch('/:id', this.patch);
    }
}

export default new CRUDCouncilInstRouter().router
