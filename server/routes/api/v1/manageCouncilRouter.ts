import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';

class ManageCouncilRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * /api/v1/application
     *  GET:
     *    description:  Renders the form for updating a snippet.
     *    responses:    200 - If user is logged in.
     *                  403 - If not logged in.
     *                  404 - If snippet is not found.
     */

    public init() {
        /*this.router.get('/:facultyId/:councilId', this.getOne);
        this.router.post('/:facultyId', this.create);
        this.router.delete('/:facultyId/:councilId', this.delete);
        this.router.patch('/:facultyId/:councilId', this.patch);
        this.router.get('/:facultyId/:councilId/:year', this.getOneInst);*/
    }
}

export default new ManageCouncilRouter().router
