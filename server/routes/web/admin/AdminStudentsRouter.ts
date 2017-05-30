import {NextFunction, Request, Response, Router} from 'express'
import DAO from '../../../utils/DAO'

class AdminStudentsRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    public getStudents(req: Request, res: Response, next: NextFunction) {
        DAO.getAllStudents()
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/students', {students: result.payload, layout: 'admin'});
            });
    }

    public updateStudent(req: Request, res: Response, next: NextFunction) {
        DAO.getOneStudent(req.params.id)
            .then((result) => {
                const data = result.payload
                data.birthDate = result.payload.birthDate.substring(0, 10)
                data.graduationYear = result.payload.graduationYear.substring(0, 4)
                console.log(data)
                res
                    .status(200)
                    .render('./admin/students', {student: result.payload, layout: 'admin'});
            });
    }

    public getRepresentativesList(req: Request, res: Response, next: NextFunction) {
        let returnObject = []

        DAO.getAllFaculties()
        .then((data) => {
            returnObject = data['payload']

            const promises = []
            data['payload'].forEach((faculty) => {
                faculty.councils.forEach((council) => {
                    if (council.councilInstanceId) {
                        promises.push(DAO.getCouncilInstance(council.councilInstanceId))
                    }
                })
            })

            return Promise.all(promises)
        })
        .then((data) => {
            returnObject.forEach((faculty) => {
                faculty.councils.forEach((council) => {
                    council.UserPositions = []
                    data.forEach((payload) => {
                        payload.payload.Users.forEach((user) => {
                            if (user.UserPosition.CouncilInstanceId === council.councilInstanceId) {
                                council.UserPositions.push(user)
                            }
                        })
                    })
                })
            })
        })
        .then(() => {
            res
                .status(200)
                .render('./admin/representatives', {data: returnObject, layout: 'admin'});
        })

    }

    public init() {
        this.router.get('/representatives', this.getRepresentativesList)
        this.router.get('/:id', this.updateStudent)
        this.router.get('/', this.getStudents)
    }
}

export default new AdminStudentsRouter().router
