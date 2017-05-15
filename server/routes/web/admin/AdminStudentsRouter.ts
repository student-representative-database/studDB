import { NextFunction, Request, Response, Router } from 'express'
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
              .render('./admin/students', {students: result.payload , layout: 'admin'});
        });
  }

  public init() {
    this.router.get('/', this.getStudents)
  }
}

export default new AdminStudentsRouter().router
