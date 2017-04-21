
import {Request, Response} from 'express';
import * as _ from 'lodash';
import {createFaculty} from "../queries/createFaculty";
import {databaseErrorHandler} from "./databaseErrorHandler";
import {onError} from "./onError";
import {onSuccess} from "./onSuccess";

export function apiCreateFaculty(req: Request, res: Response) {
    createFaculty(req.body)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(databaseErrorHandler, res))
        .catch( _.partial(onError, res, `Could not create lesson`) );

}
