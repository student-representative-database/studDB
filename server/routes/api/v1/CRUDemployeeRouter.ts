import {NextFunction, Request, Response, Router} from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {EmployeeModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {findOneEmployee} from '../../../queries/findOne';
import { update } from '../../../queries/update';
import {findAllEmployees} from '../../../queries/findAll';

class CRUDemployeeRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * @api {get} /employees/ Get all employees
     * @apiVersion 0.1.0
     * @apiName GetEmployees
     * @apiGroup Employee
     *
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "payload": [
     *     {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "facultyId": 1,
     *       "profileUrl": "...",
     *       "password": "..."
     *     },
     *     {...}
     *   ]
     * }
     * @apiError NoEmployeeFound No employee found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeeFound"
     *     }
     */

    public getAll(req: Request, res: Response, next: NextFunction) {
        findAllEmployees()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find all employees failed'));
    }

    /**
     * @api {get} /employees/:id Get a employee
     * @apiVersion 0.1.0
     * @apiName GetEmployee
     * @apiGroup Employee
     *
     * @apiParam (uriParams) {number} id Id of the Employee.
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "payload": [
     *     {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "facultyId": 1,
     *       "profileUrl": "...",
     *       "password": "..."
     *     }
     *   ]
     * }
     * @apiError NoEmployeeFound No employee found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeeFound"
     *     }
     */
    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneEmployee(req.params.id)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one employee failed'));
    }

    /**
     * @api {post} /employees Create a Employee
     * @apiVersion 0.1.0
     * @apiName CreateEmployee
     * @apiGroup Employee
     *
     * @apiParam (String) firstName The persons first name.
     * @apiParam (String) lastName The persons last name.
     * @apiParam (String) phone The persons phone number.
     * @apiParam (String) email The persons email address.
     * @apiParam (Number) facultyId The persons current faculty.
     * @apiParam (String) profileUrl A link to the persons profile.
     * @apiParam (String) password The persons password used to login.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "firstName":"Fredrik",
     *   "lastName":"Olsson",
     *   "phone":"0123456-123",
     *   "email":"email@gmail.com",
     *   "facultyId":1,
     *   "profileUrl": "...",
     *   "password": "supersecret"
     * }
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * * {
     *   "payload": [
     *     {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "facultyId":1,
     *       "profileUrl": "...",
     *       "password": "$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2",
     *       "updatedAt": "2017-05-19T15:45:06.355Z",
     *       "createdAt": "2017-05-19T15:45:06.355Z",
     *     }
     *   ]
     * }
     * @apiError NoEmployeeFound No employee found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeeFound"
     *     }
     */
    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, EmployeeModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create employee`));
    }

    /**
     * @api {delete} /employees/:id Delete Employee
     * @apiVersion 0.1.0
     * @apiName DeleteEmployee
     * @apiGroup Employee
     *
     * @apiParam (uriParams) {Number} id Employee unique ID.
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "facultyId":1,
     *       "profileUrl": "...",
     *       "password": "$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2",
     *       "updatedAt": "2017-05-19T15:45:06.355Z",
     *       "createdAt": "2017-05-19T15:45:06.355Z",
     *     }
     * }
     *
     * @apiError NoEmployeeFound No employee found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeeFound"
     *     }
     */
    public delete(req: Request, res: Response, next: NextFunction) {

        deleteOne(req.params.id, EmployeeModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete employee failed'));
    }

    /**
     * @api {patch} /employees/:id Update a Employee
     * @apiVersion 0.1.0
     * @apiName UpdateEmployee
     * @apiGroup Employee
     *
     * @apiParam (String) firstName The persons first name.
     * @apiParam (String) lastName The persons last name.
     * @apiParam (String) phone The persons phone number.
     * @apiParam (String) email The persons email address.
     * @apiParam (Number) facultyId The persons current faculty.
     * @apiParam (String) profileUrl A link to the persons profile.
     * @apiParam (String) password The persons password used to login.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "firstName":"Fredrik",
     *   "lastName":"Olsson",
     *   "phone":"0123456-123",
     *   "email":"email@gmail.com",
     *   "facultyId":1,
     *   "profileUrl": "...",
     *   "password": "supersecret"
     * }
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * * {
     *   "payload": [
     *     {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "facultyId":1,
     *       "profileUrl": "...",
     *       "password": "$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2",
     *       "updatedAt": "2017-05-19T15:45:06.355Z",
     *       "createdAt": "2017-05-19T15:45:06.355Z",
     *     }
     *   ]
     * }
     * @apiError NoEmployeeFound No employee found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoEmployeeFound"
     *     }
     */
    public patch(req: Request, res: Response, next: NextFunction) {

        update(req.params.id, req.body, EmployeeModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update employee failed'));
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.patch('/:id', this.patch);
    }
}

export default new CRUDemployeeRouter().router
