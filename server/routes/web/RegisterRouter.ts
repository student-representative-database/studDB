import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../utils/DAO'

class ApplyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getApplicationForm(req: Request, res: Response, next: NextFunction) {

    DAO.getAllFaculties()
    .then((result) => {
      res
        .status(200)
        .render('registerform', {faculties: result.payload})
    })
  }

  public postApplicationForm(req: Request, res: Response, next: NextFunction) {
    console.log(req.body)
    res
      .status(200)
      .send()
  }

  public init() {
    this.router.get('/', this.getApplicationForm)
    this.router.post('/', this.postApplicationForm)
  }
}

export default new ApplyRouter().router
