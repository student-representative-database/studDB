import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../utils/DAO'

class CouncilRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }
  public getCouncil(req: Request, res: Response, next: NextFunction) {
    const dataObject = {
            Users: []
        }
    DAO.getCouncilInstance(req.params.id)
    .then((result) => {
      dataObject.Users = result.payload.Users
      return DAO.getOneCouncil(result.payload.councilId)
    })
    .then((result) => {
      const returnObject = result.payload
      returnObject.Users = dataObject.Users
      let i
      const free = {phd: result.payload.phdPositions, stud: result.payload.studentPositions, open: result.payload.openPositions};
      for (i = 0; i < dataObject.Users.length; i++) {
        if (dataObject.Users[i].phd === true) {
          free.phd--
        } else {
          free.stud--
        }
      }
      if (free.phd + free.stud === 0) {
        free.open = false
      } else {
        free.open = true
      }
      console.log(returnObject.Users)
      res
      .status(200)
      .render('council', {council: returnObject, free})
    })
  }

  public init() {
    this.router.get('/:id', this.getCouncil)
  }
}

export default new CouncilRouter().router
