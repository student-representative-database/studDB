import * as chai from 'chai'
import chaiHttp = require('chai-http')
import * as mocha from 'mocha'

import App from '../server/App'

chai.use(chaiHttp)
const expect = chai.expect

describe('GET /', () => {
  it('Responds with HTML.', () => {
    return chai.request(App).get('/')
    .then((res) => {
      expect(res.status).to.equal(200)
      expect(res).to.be.html
    })
  })
})
