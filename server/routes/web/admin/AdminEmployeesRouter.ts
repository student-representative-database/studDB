import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../../utils/DAO'


class AdminEmployeesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getStaff(req: Request, res: Response, next: NextFunction) {
    DAO.getAllStaff()
        .then((result) => {

            console.log(JSON.stringify(result, null, 2));

            res
              .status(200)
              .render('./admin/employees', {students: result.payload , layout: 'admin'});
        });
  }

  public init() {
    this.router.get('/', this.getStaff)
  }
}

export default new AdminEmployeesRouter().router
