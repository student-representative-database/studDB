import { NextFunction, Request, Response, Router } from 'express'
//import * as request from 'request-promise'
import DAO from '../../utils/DAO'

class CouncilRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }
  public getCouncil(req: Request, res: Response, next: NextFunction) {
    DAO.getOneCouncil(req.params.id)
        .then((result) => {
      res
          .status(200)
          .render('council', {council: result.payload})
    });
  }

  public init() {
    this.router.get('/:id', this.getCouncil)
  }
}

export default new CouncilRouter().router
