const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body>');
        res.write('</html>');
        return res.end();
}

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {//listen to event and execute function
            body.push(chunk);
    }); 
        req.on('end',() => { //buffer
            const parsedBody = Buffer.concat(body).toString(); // add all chunks
            const message = parsedBody.split('=')[1]; // remove message= 
            fs.writeFileSync('message.txt', message, err => {
            res.statusCode = 302; // redirect
                res.setHeader('Location', '/');
                return res.end();
                   });
    }); 
}
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My first Page</title></head>');
    res.write('<body><h1>Hello from my Node.js server!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = requestHandler;