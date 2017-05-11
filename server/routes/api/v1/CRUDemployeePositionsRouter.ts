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
     * /api/v1/application
     *  GET:
     *    description:  Renders the form for updating a snippet.
     *    responses:    200 - If user is logged in.
     *                  403 - If not logged in.
     *                  404 - If snippet is not found.
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneEmployeePosition(req.params.empId, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one employee position failed'));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, EmployeePositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create one employee position`));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        deleteEmployeePosition(req.params.empId, req.params.councilId, EmployeePositionModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete employee position failed'));
    }

    public patch(req: Request, res: Response, next: NextFunction) {
        updateEmployeePosition(req.params.empId, req.body, EmployeePositionModel, req.params.councilId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update employee position failed'));
    }

    public init() {
        this.router.get('/:empId/:councilId', this.getOne);
        this.router.post('/:empId', this.create);
        this.router.delete('/:empId/:councilId', this.delete);
        this.router.patch('/:empId/:councilId', this.patch);
    }
}

export default new CRUDEmployeePositionsRouter().router
