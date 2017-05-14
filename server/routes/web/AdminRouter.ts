import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../utils/DAO'

class AdminRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    public getAdmin(req: Request, res: Response, next: NextFunction) {

        DAO.getAllFaculties()
            .then((result) => {
                res
                    .status(200)
                    .render('./admin/admin', {faculties: result.payload , layout: 'admin'});
            })
    }

    public getAdminLogin(req: Request, res: Response, next: NextFunction) {
        res
            .status(200)
            .render('login');
    }

    public init() {
        this.router.get('/', this.getAdmin);
        this.router.get('/login', this.getAdminLogin);
    }
}

export default new AdminRouter().router
