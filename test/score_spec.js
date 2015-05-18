var frisby = require('frisby');
frisby.create('Get Invalid Resource')
  .get('http://localhost:3000/')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( {"status":"failed to find resource"} )
  .toss();

frisby.create('Invalid Posts without score')
    .post('http://localhost:3000/score/', {
        user: "bar",
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
.toss();

frisby.create('Invalid Posts without user')
    .post('http://localhost:3000/score/', {
        score: 1210,
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
.toss();

frisby.create('Invalid Posts without encryption')
    .post('http://localhost:3000/score/', {
        score: 1210,
        user: "bar",
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
.toss();