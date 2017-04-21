import {Request, Response} from 'express';
import * as _ from 'lodash';
import {createCouncil} from "../queries/createCouncil";
import {databaseErrorHandler} from "./databaseErrorHandler";
import {onError} from "./onError";
import {onSuccess} from "./onSuccess";

export function apiCreateCouncil(req: Request, res: Response) {
    const facultyId = req.params.facultyId;
    createCouncil(facultyId, req.body)
        .then(_.partial(onSuccess, res))
        .catch(_.partial(databaseErrorHandler, res))
        .catch(_.partial(onError, res, `Could not create council`));

}
