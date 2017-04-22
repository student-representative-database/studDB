import {NextFunction, Request, Response, Router} from 'express'
import * as _ from 'lodash';
import {onError} from "./onError";
import {onSuccess} from "./onSuccess";
import {findOneUser} from "../../../queries/user/findOneUser";
import {findAllUsers} from "../../../queries/user/findAllUsers";
import {createUser} from "../../../queries/user/createUser";
import {deleteUser} from "../../../queries/user/deleteUser";
import {updateUser} from "../../../queries/user/updateUser";
import {databaseErrorHandler} from "./databaseErrorHandler";

class usersCrudRouter {
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
            .catch(_.partial(onError, res, "Find all users failed"));
    }

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneUser(req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, "Find one user failed"));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        createUser(req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create user`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteUser(req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, "Delete user failed"));
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        updateUser(req.params.councilId, req.body)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, "Update user failed"));
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:userId', this.getOne);
        this.router.post('/', this.create);
        //this.router.delete('/:userId', this.delete);
        //this.router.patch('/:userId', this.patch);
    }
}

export default new usersCrudRouter().router
