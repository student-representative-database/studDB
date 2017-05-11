import { NextFunction, Request, Response, Router } from 'express'
import * as request from 'request-promise'

class CouncilRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getCouncil(req: Request, res: Response, next: NextFunction) {
    console.log(req.params);
    const options = {
      uri: 'http://localhost:3000/api/v1/councils/' + req.params.id,
      json: true
    }
    request(options).then((result) => {
      console.log(JSON.stringify(result, null, 2));
      res
          .status(200)
          .render('council', {council: result.payload, test: JSON.stringify(result.payload, null, 2)})
        });
  }

  public init() {
    this.router.get('/:id', this.getCouncil)
  }
}

export default new CouncilRouter().router
