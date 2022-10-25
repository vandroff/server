import http from 'http'
import path from 'path'
import fs from 'fs'

const serve = http.createServer((req, res) => {
  let filePath = '.' + req.url
  if (filePath === './') filePath = './index.html'

  const extName = path.extname(filePath).toLowerCase()
  const mimeTypes: { [index: string]: string } = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
  }

  const contentType = mimeTypes[extName] || 'application/octet-stream'

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(400)
        res.end(`Error 404 Not Found, Error No Entity`)
      } else {
        res.writeHead(500)
        res.end(`Error: ${err.code}`)
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
})

serve.listen(4000, () => {
  console.log('listening on port 4000')
})
