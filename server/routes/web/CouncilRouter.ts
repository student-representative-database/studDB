import { NextFunction, Request, Response, Router } from 'express'

class CouncilRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getCouncil(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('council')
  }

  public init() {
    this.router.get('/:id', this.getCouncil)
  }
}

export default new CouncilRouter().router
