import {NextFunction, Request, Response, Router} from 'express'
import DAO from '../../../utils/DAO'
import * as _ from 'lodash'

class AdminCouncilRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    public getCouncils(req: Request, res: Response, next: NextFunction) {
        DAO.getAllFaculties()
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/councils', {faculties: result.payload, layout: 'admin'});
            });
    }

    public getCouncil(req: Request, res: Response, next: NextFunction) {
        const dataObject = {
            Users: []
        }
        DAO.getCouncilInstance(req.params.id)
            .then((result) => {
                // Calculate free positions
                // console.log(result)
                dataObject.Users = result.payload.Users
                return DAO.getOneCouncil(result.payload.councilId)
            })
            .then((result) => {
                // console.log(result)
                const returnObject = result.payload
                returnObject.Users = dataObject.Users
                let i
                const free = {phd: result.payload.phdPositions, stud: result.payload.studentPositions};
                for (i = 0; i < dataObject.Users.length; i++) {
                    if (dataObject.Users[i].phd === true && dataObject.Users[i].UserPosition.elected) {
                        free.phd--
                    } else if (dataObject.Users[i].phd === false && dataObject.Users[i].UserPosition.elected) {
                        free.stud--
                    }
                }
                // console.log(JSON.stringify(result.payload.CouncilInstances[0].Users, null, 2));
                console.log(returnObject)
                res
                    .status(200)
                    .render('./admin/council', {council: returnObject, free, layout: 'admin'})
            })
            .catch((error) => {
                console.log(error)
            });
    }

    public createCouncil(req: Request, res: Response, next: NextFunction) {
        console.log(req.query.faculty)
        DAO.getAllFaculties()
            .then((result) => {
                res
                    .status(200)
                    .render('admin/council/create', {
                        faculties: result.payload,
                        selected: req.query.faculty,
                        layout: 'admin'
                    });
            });
    };

    public postCreateCouncil(req: Request, res: Response, next: NextFunction) {
        if (req.body.councilName) {
            // Create new council AND then new instance of that council.
            const council = {
                name: req.body.councilName,
                description: req.body.comments,
                studentPositions: req.body.students,
                phdPositions: req.body.phd,
                facultyId: req.body.faculty
            }
            const instance = {
                councilId: -1,
                from: req.body.dateFrom,
                till: req.body.dateTill
            }

            console.log(council)

            DAO.createCouncil(council)
                .then((result) => {
                    console.log(result)
                    const created = JSON.parse(result).payload
                    instance.councilId = created.id
                    console.log(instance)

                    // TODO:
                    DAO.createCouncilInstance(instance)
                        .then((result) => {
                            console.log('HEJ OCH HÅ')
                            console.log(result)
                            res
                                .status(200)
                                .redirect('/admin/councils')
                        })
                })


        } else {
            // Create new council instance.
            console.log(req.body)
            const instance = {
                councilId: req.body.council,
                from: req.body.dateFrom,
                till: req.body.dateTill
            }

            DAO.createCouncilInstance(instance)
                .then((result) => {
                    console.log('HEJ OCH HÅ')
                    console.log(result)
                    res
                        .status(200)
                        .redirect('/admin/councils')
                })

            res
                .status(200)
                .redirect('/admin/councils')
        }

    }

    public deleteCouncil(req: Request, res: Response, next: NextFunction) {
        DAO.getOneCouncil(req.params.id)
            .then((result) => {
                console.log(result)
                res
                    .status(200)
                    .render('admin/council/delete', {council: result.payload, layout: "admin"})
            })
    }

    public postDeleteCouncil(req: Request, res: Response, next: NextFunction) {
        DAO.deleteCouncil(req.params.id)
            .then((result) => {
                result = JSON.parse(result)
                res
                    .status(200)
                    .redirect(`/admin/councils`)
            })
    }

    public editCouncil(req: Request, res: Response, next: NextFunction) {
        DAO.getOneCouncil(req.params.id)
            .then((result) => {
                console.log(result)
                res
                    .status(200)
                    .render('admin/council/edit', {council: result.payload, layout: "admin"})
            })
    }

    public postEditCouncil(req: Request, res: Response, next: NextFunction) {
        const council = {
            name: req.body.councilName,
            description: req.body.description,
            studentPositions: req.body.students,
            phdPositions: req.body.phd
        }
        console.log("hELLO");
        console.log(council);
        DAO.updateCouncil(council, req.params.id)
            .then(() => {
                res
                    .status(200)
                    .redirect(`/admin/councils`)
            })
    }

    public init() {
        this.router.get('/create', this.createCouncil)
        this.router.post('/create', this.postCreateCouncil)
        this.router.get('/delete/:id', this.deleteCouncil)
        this.router.post('/delete/:id', this.postDeleteCouncil)
        this.router.get('/edit/:id', this.editCouncil)
        this.router.post('/edit/:id', this.postEditCouncil)
        this.router.get('/:id', this.getCouncil)
        this.router.get('/', this.getCouncils)
    }
}

export default new AdminCouncilRouter().router
