const http = require('http');
const fs = require('fs');
const path = require('path');
const ip = require('./utils/ip');
const journal = require('./utils/filelogger');
const { SitemapStream, streamToPromise } = require('sitemap');
const source = 'Server';

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: `http://${ip}:${port}` }); // Update the hostname
    // Add URLs to the sitemap
    sitemap.write({ url: '/', changefreq: 'weekly', priority: 1 });
    sitemap.write({ url: '/projects', changefreq: 'monthly', priority: 0.8 });
    sitemap.write({ url: '/research', changefreq: 'monthly', priority: 0.8 });
    sitemap.write({ url: '/blog', changefreq: 'monthly', priority: 0.8 });
    // Add more URLs here
    sitemap.end();

    const xml = await streamToPromise(sitemap).then(data => data.toString());
    return xml;
}

const server = http.createServer(async (req, res) => {
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
        pdf: 'application/pdf',
        mp3: 'audio/mpeg',
        mp4: 'video/mp4',
        txt: 'text/plain',
    };

    const mediaPath = path.join(__dirname, 'media', url);
    const documentPath = path.join(__dirname, '', url);

    let filePath = '';
    let contentType = '';

    if (ext === 'png' || ext === 'jpg' || ext === 'mp3' || ext === 'mp4') {
        filePath = mediaPath;
        contentType = mimeTypes[ext];
    } else {
        filePath = documentPath;
        contentType = mimeTypes[ext] || 'application/octet-stream';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            const message = err.message;
            journal(message, source);
            res.writeHead(404);
            res.end('404 Not Found');
        } else {
            const message1 = 'File path: ' + filePath;
            const message2 = 'Content type: ' + contentType;
            journal(message1, source);
            journal(message2, source);
            res.setHeader('Content-Type', contentType);
            res.writeHead(200);
            res.end(content);
        }
    });

    // Handle sitemap request
    if (cleanUrl === '/sitemap.xml') {
        try {
            const sitemapXml = await generateSitemap();
            res.setHeader('Content-Type', 'application/xml');
            res.writeHead(200);
            res.end(sitemapXml);
        } catch (error) {
            journal(error.message, source);
            res.writeHead(500);
            res.end('500 Internal Server Error');
        }
        return;
    }

});

const port = 3000;
server.listen(port, ip, () => {
    const message = `Server running on http://${ip}:${port}`;
    journal(message, source);
    console.log(message);
});
