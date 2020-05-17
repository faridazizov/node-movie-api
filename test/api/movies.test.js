const chai=require('chai');
const chaiHttp= require('chai-http');
const should=chai.should();
const server=require('../../app');

chai.use(chaiHttp);
let token,movie_id;

describe('***************( /api/movies/ ) endpoint Tests**************',()=> {
    before((done) => {
        chai.request(server)
            .post('/users/authenticate')
            .send({username: 'farid', password: '12345'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('#######/api/movies/ POST Tests#######', () => {
        it('(-POST-  /api/movies) it should Post a film ', (done) => {
            const movie = {
                title: 'Test film with chai',
                year: 2006
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('year');
                    res.body.should.have.property('country');
                    res.body.should.have.property('category');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('date');
                    movie_id = res.body._id;
                    done();

                });

        });
    });

    describe('#######/api/movies/  PUT  Tests#######', () => {
        it('(-PUT- /api/movies/:movie_id) it should Update a movie by given id', (done) => {
            const movie = {
                title: 'updated test film chai',
                year: 2001,
                category: 'xiyar',

            };

            chai.request(server)
                .put('/api/movies/' + movie_id)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('country');
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('date');
                    done();
                });
        });
    });

    describe('#######/api/movies/  GET  Tests#######', () => {
        it('(-GET- /api/movies) it return all films without -director-', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('(-GET- /api/movies/:movie_id) return film by Id, without director', (done) => {
            chai.request(server)
                .get('/api/movies/' + movie_id)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('year');
                    res.body.should.have.property('country');
                    res.body.should.have.property('category');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('date');
                    res.body.should.have.property('_id').eq(movie_id);
                    done();
                })
        });
        it('(-GET- /api/movies/full) it return all films with -director-',(done)=>{
           chai.request(server)
               .get('/api/movies/full')
               .set('x-access-token',token)
               .end((err,res)=>{
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  done();
               });
        });
        it('(-GET- /api/movies/full/:movie_id) it return a film with -director-',(done)=>{
            chai.request(server)
                .get('/api/movies/full/5ec11ab578666629b0f3ea3d')
                .set('x-access-token',token)
                .end((err,res)=>{
                    const movie1=res.body[0];
                    const director=movie1.director;
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    movie1.should.have.property('director');
                    director.should.have.property('name');
                    director.should.have.property('surname');
                    director.should.have.property('bio');
                    director.should.have.property('createAt');

                    done();
                });
        });
    });

    describe('#######/api/movies/  DELETE  Tests#######',()=>{
       it('(-DELETE- /api/movies/:movie_id) it remove a film from db, by given id',(done)=>{
           chai.request(server)
               .delete('/api/movies/'+movie_id)
               .set('x-access-token',token)
               .end((err,res)=>{
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('status').eql(1);
                  done();
               });

       }) ;
    });

});