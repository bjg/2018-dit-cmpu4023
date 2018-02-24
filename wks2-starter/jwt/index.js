const express = require("express");
const http = require("http");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

const conntectionInfo = {
    host: "127.0.0.1",
    port: 5432,
    database: "authentication"
};

/*
 * You need to generate your own keys here.
 * 
 * ssh-keygen -t rsa -b 4096 -f keys/jwtRS256.key
 * openssl rsa -in keys/jwtRS256.key -pubout -outform PEM -out keys/jwtRS256.key.pub
 * 
 */
const privateKey = fs.readFileSync("keys/jwtRS256.key");
const publicKey = fs.readFileSync("keys/jwtRS256.key.pub");

massive(conntectionInfo).then(instance => {
    app.set("db", instance);

    // This endpoint must be publicly-accessible
    app.post("/login", (req, res) => {
        /*
         * The steps for implementing a login endpoint are as follows:
         * 
         *  1. Query the database to check that the passwd sent in the request
         *     body (when hashed) matches the stored hash associated with username.
         *     This can be done in the database (more secure) or in Express
         *  2. If not matched reply with a 401. Otherwise, if matched, then build
         *     a claims object with the user id and an expiry timestamp.
         *  3. Pass with to jwt.sign() and the private key
         *  4. Respond to the requesting client with the resulting JWT-TOKEN with a
         *     status of 200
         */
        // YOUR CODE GOES HERE
    });

    // This endpoint is publicly-accessible (by choice)
    app.get("/products/:id", (req, res) => {
        req.app
            .get("db")
            .query("select * from products where id = $1", [req.params.id])
            .then(items => {
                res.status(200).json(items);
            })
            .catch(error => res.status(400).send(error));
    });

    // This endpoint must be protected with authentication
    app.post("/products", authenticate, (req, res) => {
        // Not actually implemented
        res.status(200).send("Successfully authenticated");
    });

    http.createServer(app).listen(3000);
});

// Authentication middleware for protected endpoints
function authenticate(req, res, next) {
    /*
     * The steps for completing this function are as follows:
     * 
     *  1. Extract the authorization header from req.headers
     *  2. The needs to be of the form:
     *         BEARER JWT-TOKEN
     *  3. Parse the authorization header to extract the value of JWT-TOKEN
     *  4. Call the jwt.verify() function passing this and the public key
     *  5. If they match then call next(), otherwise respond with a 401
     */
    // YOUR CODE GOES HERE
}
