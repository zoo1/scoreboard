var frisby = require('frisby');
frisby.create('Get Invalid Resource')
  .get('http://localhost:3000/')
  .expectStatus(404)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON( {"status":"failed to find resource"} )
  .toss();

frisby.create('Invalid Post without score')
    .post('http://localhost:3000/score/', {
        user: "bar",
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
.toss();

frisby.create('Invalid Post without user')
    .post('http://localhost:3000/score/', {
        score: 1210,
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
.toss();

frisby.create('Invalid Post without encryption')
    .post('http://localhost:3000/score/', {
        score: 1210,
        user: "bar",
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
.toss();

frisby.create('Valid Post with score and user')
    .post('http://localhost:3000/score/', {
        score: "e3c5ZF676Abn3ASkXzWq8A==", //aes encrypted 87
        user: "sQDz20ObSJ7YxraKZVxQ8w==", //aes encypted zach
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes( { rank: Number } )
    .toss();

frisby.create('Invalid Post with non-number decrypted score')
    .post('http://localhost:3000/score/', {
        score: "FN0lsbgnaLs+XTYGNDHs/Q==", //aes encrypted alberta
        user: "sQDz20ObSJ7YxraKZVxQ8w==", //aes encypted zach
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
    .toss();

frisby.create('Invalid Post with negative decrypted score')
    .post('http://localhost:3000/score/', {
        score: "5oyZF8jUC5WlalAldMINkw==", //aes encrypted -10
        user: "sQDz20ObSJ7YxraKZVxQ8w==", //aes encypted zach
    })
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSON( {"status":"failed to update"} )
    .toss();

frisby.create('Get Score Listing')
    .get('http://localhost:3000/score/')
    .expectStatus(200)
    .expectHeaderContains('Content-Type', 'json')
    .expectJSONTypes('*', { user: String, score: Number})
    .toss();