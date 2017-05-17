import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../utils/DAO'

class ApplyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getApplyForm(req: Request, res: Response, next: NextFunction) {

    DAO.getAllFaculties()
    .then((result) => {
      res
        .status(200)
        .render('registerform', {faculties: result.payload});
    })
  }

  public init() {
    this.router.get('/', this.getApplyForm)
  }
}

export default new ApplyRouter().router
