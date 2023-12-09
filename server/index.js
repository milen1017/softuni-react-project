const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
const { DB_CONNECTION, PORT } = process.env;

const port = process.env.PORT || 3001;

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

// Your allowCors middleware function
const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Your route handlers
const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

// Wrap your handlers with allowCors middleware
const handlerWithCors = allowCors(handler);

app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(`${DB_CONNECTION}`)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use('/auth', allowCors(authRoutes)); // Wrap authRoutes with allowCors middleware
app.use('/posts', allowCors(postRoutes)); // Wrap postRoutes with allowCors middleware

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
