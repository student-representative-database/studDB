import {NextFunction, Request, Response, Router} from 'express'
import * as _ from 'lodash';
import {onError} from './onError';
import {onSuccess} from './onSuccess';
import {databaseErrorHandler} from './databaseErrorHandler';
import {UserModel} from '../../../model/model';
import { create } from '../../../queries/create';
import { deleteOne } from '../../../queries/delete';
import {findOneUser} from '../../../queries/findOne';
import { update } from '../../../queries/update';
import {findAllUsers} from '../../../queries/findAll';

class CRUDusersRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    /**
     * @api {get} /users/ Get all users
     * @apiVersion 0.1.0
     * @apiName GetUsers
     * @apiGroup User
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
     *       "birthDate": "1980-10-10T00:00:00.000Z",
     *       "phd": false,
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "graduationYear": "1970-01-01T00:00:02.018Z",
     *       "program": "UDM",
     *       "comments": "..."
     *     },
     *     {...}
     *   ]
     * }
     * @apiError NoUsersFound No users found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUsersFound"
     *     }
     */

    public getAll(req: Request, res: Response, next: NextFunction) {
        findAllUsers()
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find all users failed'));
    }

    /**
     * @api {get} /users/:id Get a user
     * @apiVersion 0.1.0
     * @apiName GetUser
     * @apiGroup User
     *
     * @apiParam (uriParams) {number} id Id of the User.
     *
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     *   "payload": [
     *     {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "birthDate": "1980-10-10T00:00:00.000Z",
     *       "phd": false,
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "graduationYear": "1970-01-01T00:00:02.018Z",
     *       "program": "UDM",
     *       "comments": "..."
     *     }
     *   ]
     * }
     * @apiError NoUsersFound No users found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUsersFound"
     *     }
     */

    public getOne(req: Request, res: Response, next: NextFunction) {
        findOneUser(req.params.userId)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Find one user failed'));
    }

    /**
     * @api {post} /users Create a User
     * @apiVersion 0.1.0
     * @apiName CreateUser
     * @apiGroup User
     *
     * @apiParam (String) firstName The persons first name.
     * @apiParam (String) lastName The persons last name.
     * @apiParam (Date) birthDate The persons birthday.
     * @apiParam (Boolean) phd Wheter the person is working on a phd or not.
     * @apiParam (String) phone The persons phone number.
     * @apiParam (String) email The persons email address.
     * @apiParam (Date) graduationYear The persons graduation date.
     * @apiParam (String) program The persons current program.
     * @apiParam (String) comments Comments about the person.
     * @apiParam (String) password The persons password used to login.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "firstName":"Fredrik",
     *   "lastName":"Olsson",
     *   "birthDate": "1980-07-20",
     *   "phd":true,
     *   "phone":"0123456-123",
     *   "email":"email@gmail.com",
     *   "graduationYear":"2019-06-01",
     *   "program":"dingDong",
     *   "comments": "...",
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
     *       "birthDate": "1980-10-10T00:00:00.000Z",
     *       "phd": false,
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "graduationYear": "1970-01-01T00:00:02.018Z",
     *       "program": "UDM",
     *       "comments": "...",
     *       "password": "$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2",
     *       "updatedAt": "2017-05-19T15:45:06.355Z",
     *       "createdAt": "2017-05-19T15:45:06.355Z",
     *     }
     *   ]
     * }
     * @apiError NoUsersFound No users found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUsersFound"
     *     }
     */

    public create(req: Request, res: Response, next: NextFunction) {
        create(req.body, UserModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(databaseErrorHandler, res))
            .catch(_.partial(onError, res, `Could not create user`));
    }

    /**
     * @api {delete} /users/:id Delete User
     * @apiVersion 0.1.0
     * @apiName DeleteUser
     * @apiGroup User
     *
     * @apiParam (uriParams) {Number} id User unique ID.
     *
     * @apiSuccessExample Success-Response:
     * {
     * "payload": {
     *       "id": 1,
     *       "firstName": "Fredrik",
     *       "lastName": "Olsson",
     *       "birthDate": "1980-10-10T00:00:00.000Z",
     *       "phd": false,
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "graduationYear": "1970-01-01T00:00:02.018Z",
     *       "program": "UDM",
     *       "comments": "...",
     *       "password": "$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2",
     *       "updatedAt": "2017-05-19T15:45:06.355Z",
     *       "createdAt": "2017-05-19T15:45:06.355Z",
     *     }
     * }
     *
     * @apiError NoUsersFound No users found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUsersFound"
     *     }
     */
    public delete(req: Request, res: Response, next: NextFunction) {
        deleteOne(req.params.userId, UserModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Delete user failed'));
    }

    /**
     * @api {patch} /users/:id Update a User
     * @apiVersion 0.1.0
     * @apiName UpdateUser
     * @apiGroup User
     *
     * @apiParam (uriParams) {Number} id User unique ID.
     *
     * @apiParam (String) firstName The persons first name.
     * @apiParam (String) lastName The persons last name.
     * @apiParam (Date) birthDate The persons birthday.
     * @apiParam (Boolean) phd Wheter the person is working on a phd or not.
     * @apiParam (String) phone The persons phone number.
     * @apiParam (String) email The persons email address.
     * @apiParam (Date) graduationYear The persons graduation date.
     * @apiParam (String) program The persons current program.
     * @apiParam (String) comments Comments about the person.
     * @apiParam (String) password The persons password used to login.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *   "firstName":"Fredrik",
     *   "lastName":"Olsson",
     *   "birthDate": "1980-07-20",
     *   "phd":true,
     *   "phone":"0123456-123",
     *   "email":"email@gmail.com",
     *   "graduationYear":"2019-06-01",
     *   "program":"dingDong",
     *   "comments": "...",
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
     *       "birthDate": "1980-10-10T00:00:00.000Z",
     *       "phd": false,
     *       "phone": "0123456-123",
     *       "email": "email@gmail.com",
     *       "graduationYear": "1970-01-01T00:00:02.018Z",
     *       "program": "UDM",
     *       "comments": "...",
     *       "password": "$2a$08$myH82IsvEy/ksZNkNeWUPubhxsc1fo.D3Kst3ACIHQWNcPd9XnIv2",
     *       "updatedAt": "2017-05-19T15:45:06.355Z",
     *       "createdAt": "2017-05-19T15:45:06.355Z",
     *     }
     *   ]
     * }
     * @apiError NoUsersFound No users found.
     *
     * @apiErrorExample Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "NoUsersFound"
     *     }
     */
    public patch(req: Request, res: Response, next: NextFunction) {
        update(req.params.userId, req.body, UserModel)
            .then(_.partial(onSuccess, res))
            .catch(_.partial(onError, res, 'Update user failed'));
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:userId', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:userId', this.delete);
        this.router.patch('/:userId', this.patch);
    }
}

export default new CRUDusersRouter().router
