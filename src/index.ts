import express from 'express';
import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';
import jwksRsa from 'jwks-rsa';

// const jwt = require('express-jwt');
// const jwtAuthz = require('express-jwt-authz');
// const jwksRsa = require('jwks-rsa');

// should move this to another file.
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://YOUR_DOMAIN/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'YOUR_API_IDENTIFIER',
  issuer: [`https://YOUR_DOMAIN/`],
  algorithms: ['RS256']
});

// don't forget check scope 
const checkScopes = jwtAuthz([ 'read:messages' ]);

const app = express()
const port = 80

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/hello', checkJwt, (req, res) => {
  res.send('well hello there!!' + new Date().getDate());
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

