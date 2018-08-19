import express from 'express';
import path from 'path';

const app = express();
let server;

// Tell server where static assets live
app.use(express.static(path.join(__dirname, '../../public')));

// Lets us start server, and return a promise which resolves when server is ready
export async function listen() {
  // Setting up promise resolver
  let resolver;
  const done = new Promise((resolve) => {
    resolver = resolve;
  });

  server = app.listen(8081, resolver);
  return done;
}

// Lets us end server, and return a promise which resolves when server is killed
export function close() {
  // Setting up promise resolver
  let resolver;
  const done = new Promise((resolve) => {
    resolver = resolve;
  });

  server.close(resolver);
  return done;
}

let messageSeen = false;

app.post('/msg', function (req, res) {
  messageSeen = true;
  res.send('Hi client');
});

export function gotMessage() {
  return messageSeen;
}