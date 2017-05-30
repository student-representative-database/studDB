import { NextFunction, Request, Response, Router } from 'express'

class HomeRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.init()
  }

  public getHome(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('home')
  }

  public getFaq(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('faq')
  }

  public getPosts(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('posts')
  }

  public getRegistry(req: Request, res: Response, next: NextFunction) {
    res
        .status(200)
        .render('registry')
  }

  public init() {
    this.router.get('/', this.getHome);
    this.router.get('/faq', this.getFaq);
    this.router.get('/posts', this.getPosts);
    this.router.get('/registry', this.getRegistry);
  }
}

export default new HomeRouter().router
