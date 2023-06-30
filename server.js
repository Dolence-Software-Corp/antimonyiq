const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    const splitUrlFromQuery = req.url.split('?');
    const cleanUrl = splitUrlFromQuery[0];
    const url = cleanUrl === '/' ? '/index.html' : req.url;
    const ext = path.extname(url).substring(1);

    const mimeTypes = {
        html: 'text/html',
        css: 'text/css',
        js: 'text/javascript',
        png: 'image/png',
        jpg: 'image/jpeg',
        pdf: 'text/pdf',
    };

    const imagePath = path.join('.', 'img', url);

    if (ext === 'png' || ext === 'jpg') {
        fs.readFile(imagePath, (err, imageContent) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.setHeader('Content-Type', mimeTypes[ext]);

                res.writeHead(200);
                res.end(imageContent);
            }
        });
    } else {
        fs.readFile(`.${url}`, 'utf-8', (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('404 Not Found');
            } else {
                res.setHeader('Content-Type', mimeTypes[ext]);
        
                res.writeHead(200);
                res.end(content);
            }
        });
    }

});

const port = 3100;
server.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${port}`);
});
