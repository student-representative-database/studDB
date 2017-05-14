import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {findOneInst} from "../../../queries/findOne";
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import { updateCouncilInst } from '../../../queries/update';
import {CouncilInstanceModel} from '../../../model/model';

class CRUDCouncilInstRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * /api/v1/faculties/:facultyId/:councilId:/year
     *  GET:
     *    description:  Renders the form for updating a snippet.
     *    responses:    200 - If user is logged in.
     *                  403 - If not logged in.
     *                  404 - If snippet is not found.
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneInst(req.params.councilId, req.params.id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one council instance failed'));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, CouncilInstanceModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create council instance`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteOne(req.params.id, CouncilInstanceModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete council instance failed'));
    }
    // needs to be fixed removed req.params.councilId
    public patch(req: Request, res: Response, next: NextFunction) {
        updateCouncilInst(req.body, CouncilInstanceModel, req.params.id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update council instance failed'));
    }

    public init() {
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.patch('/:id', this.patch);
    }
}

export default new CRUDCouncilInstRouter().router
