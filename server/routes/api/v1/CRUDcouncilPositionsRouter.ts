import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {CouncilPositionsModel} from '../../../model/model';
import {findOneCouncilPosition, findOneInst} from "../../../queries/findOne";
import { create, createCouncilPosition } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import { update } from '../../../queries/update';

class CRUDCouncilPositionsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * /api/v1/faculties/:facultyId/:councilId:/year/:id
     *  GET:
     *    description:  Renders the form for updating a snippet.
     *    responses:    200 - If user is logged in.
     *                  403 - If not logged in.
     *                  404 - If snippet is not found.
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneCouncilPosition(req.params.id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find council position instance failed'));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        findOneInst(req.params.councilId, req.params.year)
            .then((data: any) => {
                return createCouncilPosition(CouncilPositionsModel, req.params.councilId, req.params.year, data.id)
            })
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create council position`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteOne(req.params.id, CouncilPositionsModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete council position failed'));
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        update(req.params.id, req.body, CouncilPositionsModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update council position failed'));
    }

    public init() {
        this.router.get('/:facultyId/:councilId/:year/:id', this.getOne);
        this.router.post('/:facultyId/:councilId/:year/', this.create);
        this.router.delete('/:facultyId/:councilId/:year/:id', this.delete);
        this.router.patch('/:facultyId/:councilId/:year/:id', this.patch);
    }
}

export default new CRUDCouncilPositionsRouter().router

