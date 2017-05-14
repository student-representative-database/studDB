import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../../utils/DAO'

class CouncilRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getCouncils(req: Request, res: Response, next: NextFunction) {
    DAO.getAllFaculties()
        .then((result) => {
          res
              .status(200)
              .render('./admin/councils', {councils: result.payload, layout: 'admin'})
        });
  }

  public getCouncil(req: Request, res: Response, next: NextFunction) {
    DAO.getOneCouncil(req.params.id)
        .then((result) => {
      res
          .status(200)
          .render('./admin/council', {council: result.payload, layout: 'admin'})
    });
  }

  public init() {
    this.router.get('/', this.getCouncils)
    this.router.get('/:id', this.getCouncil)
  }
}

export default new CouncilRouter().router
