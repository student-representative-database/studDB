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

class CRUDUserPositionsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * /api/v1/faculties/:userId/:posId
     *  GET:
     *    description:  Renders the form for updating a snippet.
     *    responses:    200 - If user is logged in.
     *                  403 - If not logged in.
     *                  404 - If snippet is not found.
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneUserPosition(req.params.userId, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find user position instance failed'));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, UserPositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create user position`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteUserPosition(req.params.userId, req.params.councilId, UserPositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete user position failed'));
    }
    // TODO fix
    public patch(req: Request, res: Response, next: NextFunction) {
        console.log(req.params);
        updateUserPosition(req.params.userId, req.body, UserPositionModel, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update user position failed'));
    }

    public init() {
        this.router.get('/:userId/:councilId', this.getOne);
        this.router.post('/:userId', this.create);
        this.router.delete('/:userId/:councilId', this.delete);
        this.router.patch('/:userId/:councilId', this.patch);
    }
}

export default new CRUDUserPositionsRouter().router

