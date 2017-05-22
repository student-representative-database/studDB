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
              .render('./admin/employees', {employees: result.payload , layout: 'admin'});
        });
  }

  public getStaffMember(req: Request, res: Response, next: NextFunction) {
    DAO.getOneStaff(req.params.id)
        .then((result) => {

            console.log(result);

            res
              .status(200)
              .render('./admin/employees', {employee: result.payload , layout: 'admin'});
        });
  }

  public init() {
    this.router.get('/', this.getStaff)
    this.router.get('/:id', this.getStaffMember)
  }
}

export default new AdminEmployeesRouter().router
