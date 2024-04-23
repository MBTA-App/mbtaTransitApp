process.env.NODE_ENV = "test"; // This will prevent the backend from listening to port 8095 when running tests.


const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../server'); // Your Express app instance
const { connect, closeDatabase, clearDatabase } = require('./test.config');


// Configure Chai to use the Chai HTTP plugin
chai.use(chaiHttp);
const expect = chai.expect;


// Run before all tests
before(async () => {
  await connect();
});


// Run after all tests
after(async () => {
  await closeDatabase();
});


// Run before each test
beforeEach(async () => {
  await clearDatabase();
});


describe('Regression Tests: User API', () => {
  // Test for GET request to '/user/getAll'
  it('should get user information', (done) => {
    chai
      .request(app)
      .get('/user/getAll')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array'); // Change expectation to an array if that's what the route returns
        done();
      });
  });


  // Test for POST request to '/users'
  it('should create a new user', (done) => {
    chai
      .request(app)
      .post('/user/signup')
      .send({ username: 'tochiamanze', email: 'cdon@gmail.com', password: 'tochi12345' })

      .end((err, res) => {
        if (err) {
          console.error(err); // Log any errors
        }
        console.log(res.body); // Log the response body for debugging
        expect(res).to.have.status(200);
        // Add more expectations here if needed for the response body
        done();
      });
  });


  //test for duplicate user
  it('should get an error when a duplicate user is created', (done) => {
    chai
      .request(app)
      .post('/user/signup')
      .send({ username: 'tochiamanze', email: 'cdon@gmail.com', password: 'tochi12345' })
      .end((err, res) =>{
        expect(res).to.have.status(200);
        chai
        .request(app)
        .post('/user/signup')
        .send({ username: 'tochiamanze', email: 'cdon@gmail.com', password: 'tochi12345' })
        .end((err, res) =>{
          expect(res).to.have.status(409);
          done();


        });
      });
  });

  //test for getReviews
  it('should get all reviews', (done) => {
    chai
      .request(app)
      .get('/userReview/getReviews')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array'); // Change expectation to an array if that's what the route returns
        done();
      });
  });

  //test for POST review
  it('should create a new userReview', (done) => {
    chai
      .request(app)
      .post('/userReview/reviews')
      .send({stationId: "70051",
      recommendation: "Recommended",
      description: "very clean!",
      user: "jakebailes"})

      .end((err, res) => {
        if (err) {
          console.error(err); // Log any errors
        }
        console.log(res.body); // Log the response body for debugging
        expect(res).to.have.status(201);
        // Add more expectations here if needed for the response body
        done();
      });
  });

  //test for POST favorite
  it('should create a new favorite', (done) => {
    chai
      .request(app)
      .post('/userFav/userFavorite')
      .send({ user: "65a6e8d8eb6db7b9a7217a0c",
      stationId: 70234})

      .end((err, res) => {
        if (err) {
          console.error(err); // Log any errors
        }
        console.log(res.body); // Log the response body for debugging
        expect(res).to.have.status(201);
        // Add more expectations here if needed for the response body
        done();
      });
  });

 //test for getAllRatings
 it('should get all reviewRatings', (done) => {
  chai
    .request(app)
    .get('/reviewRating/getAllRatings')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array'); // Change expectation to an array if that's what the route returns
      done();
    });
});

//test for get reviewRatings
it('should get specified reviewRating', (done) => {
  chai
    .request(app)
    .get('/reviewRating/getRatings/65a6e8d8eb6db7b9a7217a0c')
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array'); // Change expectation to an array if that's what the route returns
      done();
    });
});








 

  



  

  

  



  // Add more tests for other API endpoints (PUT, DELETE, etc.)
});
