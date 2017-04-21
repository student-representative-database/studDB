import { Request, Response } from 'express';
import * as _ from 'lodash';
import { findAllFaculties } from "../queries/findAllFaculties";
import { onError } from "./onError";
import { onSuccess } from "./onSuccess";

export function apiGetAllFaculties(req: Request, res: Response) {

    findAllFaculties()
        .then(_.partial(onSuccess, res))
        .catch(_.partial(onError, res, "Find All Faculties Failed"));
}
