import { NextFunction, Request, Response, Router } from 'express'

class HomeRouter {
  public router: Router

  constructor() {
    this.router = Router()
    this.init()
  }

  public getHome(req: Request, res: Response, next: NextFunction) {
    res
    .status(200)
    .render('home')
  }

  public init() {
    this.router.get('/', this.getHome)
  }
}

export default new HomeRouter().router
