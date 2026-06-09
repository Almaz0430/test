const http = require('http');
const url = require('url');

function gcd(a, b) { return b === 0n ? a : gcd(b, a % b); }
function lcm(a, b) { return a / gcd(a, b) * b; }

http.createServer((req, res) => {
  const q = url.parse(req.url, true).query;
  const x = q.x, y = q.y;
  const xn = Number(x), yn = Number(y);
  let result;
  if (!x || !y || !Number.isInteger(xn) || !Number.isInteger(yn) || xn < 1 || yn < 1) {
    result = 'NaN';
  } else {
    result = lcm(BigInt(xn), BigInt(yn)).toString();
  }
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(result);
}).listen(process.env.PORT || 3000);