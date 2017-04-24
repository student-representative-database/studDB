import { NextFunction, Request, Response, Router } from 'express'

class AdminRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.init()
    }

    public getAdmin(req: Request, res: Response, next: NextFunction) {
        res
            .status(200)
            .render('admin')
    }

    public getAdminLogin(req: Request, res: Response, next: NextFunction) {
        res
            .status(200)
            .render('login', {layout: 'login'});
    }

    public init() {
        this.router.get('/', this.getAdmin);
        this.router.get('/login', this.getAdminLogin);
    }
}

export default new AdminRouter().router
