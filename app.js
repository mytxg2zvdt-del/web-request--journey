const http = require("http");

let data = [];

const server = http.createServer((req, res) => {

    // GET 1
    if (req.method === "GET" && req.url === "/") {
        res.end("Welcome to Home");
        return;
    }

    // GET 2
    if (req.method === "GET" && req.url === "/about") {
        res.end("Welcome to About");
        return;
    }

    // GET 3
    if (req.method === "GET" && req.url === "/users") {
        res.end("Users Page");
        return;
    }

    // POST
    if (req.method === "POST" && req.url === "/data") {

        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            const receivedData = JSON.parse(body);

            data.push(receivedData);

            res.end("Data received and stored successfully");
        });

        return;
    }

    // Route not found
    res.statusCode = 404;
    res.end("Not Found");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});