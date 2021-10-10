const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Get', async function() {  

    describe('/Sign Up', () => {
        it('it should return .', (done) => {
            chai.request(server)
            .post(`/api/auth/signup`)
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });
    });
});