import {NextFunction, Request, Response, Router} from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {UserModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {findOneUser} from '../../../queries/findOne';
import { update } from '../../../queries/update';
import {findAllUsers} from '../../../queries/findAll';

class CRUDusersRouter {
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

    public getAll(req: Request, res: Response, next: NextFunction) {
        findAllUsers()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find all users failed'));
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneUser(req.params.userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one user failed'));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, UserModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create user`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteOne(req.params.userId, UserModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete user failed'));
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        update(req.params.userId, req.body, UserModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update user failed'));
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:userId', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:userId', this.delete);
        this.router.patch('/:userId', this.patch);
    }
}

export default new CRUDusersRouter().router
