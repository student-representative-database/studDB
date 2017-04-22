import { NextFunction, Request, Response, Router } from 'express'
import * as _ from 'lodash';
import { findAllFaculties } from "../../../queries/faculty/findAllFaculties";
import { onError } from "./onError";
import { onSuccess } from "./onSuccess";
import {findOneFaculty} from "../../../queries/faculty/findOneFaculty";
import {createFaculty} from "../../../queries/faculty/createFaculty";
import {deleteFaculty} from "../../../queries/faculty/deleteFaculty";
import {updateFaculty} from "../../../queries/faculty/updateFaculty";
import {databaseErrorHandler} from "./databaseErrorHandler";

class facultiesCrudRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }
  /**
   //      * /api/v1/faculties/:id
   //      *  GET:
   //      *    description:  Renders the form for updating a snippet.
   //      *    responses:    200 - If user is logged in.
   //      *                  403 - If not logged in.
   //      *                  404 - If snippet is not found.
   //      */
  public getAll(req: Request, res: Response, next: NextFunction) {
    findAllFaculties()
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Find all faculties failed"));
  }

  public getOne(req: Request, res: Response, next: NextFunction) {
    findOneFaculty(req.params.id)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Find one faculty failed"));
  }

  public create(req: Request, res: Response, next: NextFunction) {
    createFaculty(req.body)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(databaseErrorHandler, res))
        .catch( _.partial(onError, res, `Could not create faculty`) );
  }

  public delete(req: Request, res: Response, next: NextFunction) {
    deleteFaculty(req.params.id)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Delete faculty failed"));
  }

  public patch(req: Request, res: Response, next: NextFunction) {
    updateFaculty(req.params.id, req.body)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Update faculty failed"));
  }

  public init() {
    this.router.get('/', this.getAll);
    this.router.post('/', this.create);
    this.router.get('/:id', this.getOne);
    this.router.delete('/:id', this.delete);
    this.router.patch('/:id', this.patch);
  }
}

export default new facultiesCrudRouter().router
