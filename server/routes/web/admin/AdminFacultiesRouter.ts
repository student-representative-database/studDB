import { NextFunction, Request, Response, Router } from 'express'
import DAO from '../../../utils/DAO'

class FacultiesRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }
  public getFaculties(req: Request, res: Response, next: NextFunction) {
    DAO.getAllFaculties()
        .then((result) => {
      res
          .status(200)
          .render('./admin/faculties', {faculties: result.payload, layout: 'admin'})
    });
  }

  public getFaculty(req: Request, res: Response, next: NextFunction) {
    DAO.getOneFaculty(req.params.id)
        .then((result) => {
          console.log(JSON.stringify(result, null, 2));
          res
              .status(200)
              .render('./admin/faculty', {faculty: result.payload, layout: "admin"})
        });
  }

  public init() {
    this.router.get('/', this.getFaculties)
    this.router.get('/:id', this.getFaculty)
  }
}

export default new FacultiesRouter().router