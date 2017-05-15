import {NextFunction, Request, Response, Router} from 'express'
import DAO from '../../../utils/DAO'

class AdminFacultiesRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    public getFaculties(req: Request, res: Response, next: NextFunction) {
        DAO.getAllFaculties()
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/faculties', {faculties: result.payload, layout: 'admin'})
            });
    }

    public createFaculty(req: Request, res: Response, next: NextFunction) {
        res
            .status(200)
            .render('./admin/faculty/create', {layout: "admin"})
    };

    public postCreateFaculty(req: Request, res: Response, next: NextFunction) {
        const name: string = req.body.name
        DAO.createFaculty(name)
            .then((result) => {
                result = JSON.parse(result)
                res
                    .status(200)
                    .redirect(`/admin/faculties/${result.payload.id}`)
            })
    };

    public editFaculty(req: Request, res: Response, next: NextFunction) {
        DAO.getOneFaculty(req.params.id)
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/faculty/edit', {faculty: result.payload, layout: "admin"})
            })
    };

    public postEditFaculty(req: Request, res: Response, next: NextFunction) {
        const name: string = req.body.name
        DAO.updateFaculty(req.params.id, name)
            .then((result) => {
                result = JSON.parse(result)
                res
                    .status(200)
                    .redirect(`/admin/faculties/${result.payload.id}`)
            })
    };

    public deleteFaculty(req: Request, res: Response, next: NextFunction) {
        DAO.getOneFaculty(req.params.id)
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/faculty/delete', {faculty: result.payload, layout: "admin"})
            })
    };

    public postDeleteFaculty(req: Request, res: Response, next: NextFunction) {
        DAO.deleteFaculty(req.params.id)
            .then((result) => {
                result = JSON.parse(result)
                res
                    .status(200)
                    .redirect(`/admin/faculties/`)
            })
    };

    public getFaculty(req: Request, res: Response, next: NextFunction) {
        DAO.getOneFaculty(req.params.id)
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/faculty', {faculty: result.payload, layout: "admin"})
            });
    }

    public init() {
        this.router.get('/', this.getFaculties)
        this.router.get('/create', this.createFaculty)
        this.router.post('/create', this.postCreateFaculty)
        this.router.get('/edit/:id', this.editFaculty)
        this.router.post('/edit/:id', this.postEditFaculty)
        this.router.get('/delete/:id', this.deleteFaculty)
        this.router.post('/delete/:id', this.postDeleteFaculty)
        this.router.get('/:id', this.getFaculty)
    }
}

export default new AdminFacultiesRouter().router
