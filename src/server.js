const http = require('http');
const app = require('./app');
const config = require('./config');

const PORT = config.port || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
