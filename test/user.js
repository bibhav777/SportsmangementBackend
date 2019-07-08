const chai = require('chai');
const chaiHttp = require('chai-http');
var should = chai.should();
const chaiLike = require('chai-like');
const chaiThings = require('chai-things');

const server = require("../app");
// console.log(server)
var serverRun;
chai.use(chaiHttp);
chai.use(chaiLike);
chai.use(chaiThings);

before(done =>{
    serverRun = server.listen(3002, done);
});

after(done => {
    serverRun.close(done);
});

describe('Registration', function(){
    describe('post add user ', function(){
        it('User was successfully registered', function(done){
            chai.request(server)
                .post('/v1/registration')
                .send({
                    'username':'jesuddasdadadaswdsad',
                    'email':'jaasdasdasdahaasdsadadsadqdwqssadaad@gmail.com',
                    'password':'asadadqdqwasadsaddqdqdsasdsaadss'
                })
                .end(function (err,res) {
                    res.should.have.status(201);
           res.body.should.be.an('object');
                    done()

                });

        })
    })
})


describe('Login', function(){
    describe('post login ', function(){
        it('Login successful', function(done){
            chai.request(server)
                .post('/v1/login')
                .send({
                    'username':'jesuddasdadadaswdsad',
                    'password':'asadadqdqwasadsaddqdqdsasdsaadss'
                })
                .end(function (err,res) {
                    res.should.have.status(200);
           res.body.should.be.an('object');
                    done()

                });

        })
    })
})



describe('Add matches', function(){
    describe('add matches ', function(){
        it('it should add matches', function(done){
            chai.request(server)
                .post('/addmatches')
                .send({
                    'firstteam':'Dhuku',
                    'secondteam':'Basbari',
                    'sportstype':'Football',
                    'date':'2018/09/8',
                    'time':'9'
                })
                .end(function (err,res) {
                    res.should.have.status(201);
                    res.body.should.be.an('object');
                    done()

                });

        })
    })
});


describe('delete matches', function() {
    uid = 6;
    it('it should delete the match', function(done) {
        chai.request(server)
            .delete('/deletematches/' + uid)
            // .send({
            //     'address': 'testAddress',
            //     'pass':'hit2'
            // })
            .end(function(err, res) {
                //res.should.have.status(201);
                res.body.should.have.property('message');
                done();
            })
    })


});


describe('Matches', function(){
    describe('update matches ', function(){
        uid = 6;
        it('it should update the notice', function(done){
            chai.request(server)
                .put('/updateplayers/' + uid)
                .send({
                    'firstteam':'Dhukus',
                    'secondteam':'Basbariss',
                    'sportstype':'Footballsss',
                    'date':'2018/09/8',
                    'time':'9'
                })
                .end(function (err,res) {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done()

                });

        })
    })
});

describe('Players', function(){
    describe('add players ', function(){
      
        it('it should add the player', function(done){
            chai.request(server)
                .post('/addplayers')
                .send({
                   'image':'bibav.jpg',
                   'fullname':'Bibav',
                   'dob':'10/9/2',
                   'address':'Bhainsepati',
                   'sportsinvolved':'Football',
                   'height':'20',
                   'registersince':'10/9/2',
                   'position':'Midfileder' 

                })
                .end(function (err,res) {
                    res.should.have.status(200);
                    res.body.should.be.an('object');
                    done()

                });

        })
    })
});