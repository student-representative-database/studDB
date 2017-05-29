import { NextFunction, Request, Response, Router } from 'express'
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
            // Calculate free positions
            let i
            const free = {phd: result.payload.phdPositions, stud: result.payload.studentPositions, open: result.payload.openPositions};
            for (i = 0; i < result.payload.CouncilInstances[0].Users.length; i++) {
                if (result.payload.CouncilInstances[0].Users[i].phd === true) {
                  free.phd--
                } else {
                  free.stud--
                }
            }
            if (free.phd + free.stud == 0) {
                free.open = false
            } else {
                free.open = true
            }
      res
          .status(200)
          .render('council', {council: result.payload, free})
    });
  }

  public init() {
    this.router.get('/:id', this.getCouncil)
  }
}

export default new CouncilRouter().router
