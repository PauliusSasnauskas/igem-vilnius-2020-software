const { execSync } = require('child_process');
const http = require('http');

http.createServer((request, response) => {
    const { method, url } = request;
    if (method !== "POST" || url !== "/"){
        response.writeHead(404);
        response.end("404");
        return;
    }
    let body = [];
    request.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        let parameters = JSON.parse(body);
    
        response.on('error', (err) => {
            console.error(err);
            response.statusCode = 500;
            response.end("500");
        });

        let result = doProcedure(parameters);

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });
        response.end(JSON.stringify({result}));
        
    });

}).listen(8000);


function doProcedure(parameters){
    // parameters object is from HTTP request

    // ----- Custom code which gives result -----
    //
    // Maybe worth looking into blast-api https://www.npmjs.com/package/blast-api
    // 
    // ... etc.
    //
    let result = execSync('ls').toString(); // demo
    
    return result;
}