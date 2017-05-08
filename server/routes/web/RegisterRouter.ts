import { NextFunction, Request, Response, Router } from 'express'

class ApplyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getApplyForm(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('registerform')
  }

  public init() {
    this.router.get('/', this.getApplyForm)
  }
}

export default new ApplyRouter().router
