var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../../app');

chai.use(chaiHttp);

describe('NASAs MARS API', () => {

  describe('Passing no query', () => {

    it('should return empty when query is not passed', (done) => {
      chai.request(server)
        .get('/api/mars/photos')
        .query()
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.photos.length, 0);
          done();
        });
    });

  });

  describe('isValid SOL', () => {

    it('should return empty when sol is > 2445', (done) => {
      chai.request(server)
        .get('/api/mars/photos')
        .query({
          sol: '2446'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.photos.length, 0);
          done();
        });
    });

  });

  describe('is request exceeds time', () => {
    
      it('should return response timeout when it exceeds 10 seconds', (done) => {
        chai.request(server)
          .get('/api/mars/photos')
          .query({
            sol: 'undefined'
          })
          .end(function (err, res) {
            assert.equal(res.status, 400);
            assert.equal(res.text,'Response timeout');
            done();
          });
      })

  })

  describe('isValid camera', () => {
    it('should return empty if camera option is invalid', (done) => {
      chai.request(server)
        .get('/api/mars/photos')
        .query({
          sol: '2016',
          camera: 'FHAZI'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.photos.length,0);
          done();
        });
    })
  })

  describe('is count 25 on page option', () => {
    it('should return 25 if the page option is provide to specific query', (done) => {
      chai.request(server)
        .get('/api/mars/photos')
        .query({
          sol: '2016',
          camera: 'Any',
          page: '1'
        })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body.photos.length,25);
          done();
        });
    })
  })

})