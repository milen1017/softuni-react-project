const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
require('dotenv').config();
const { DB_CONNECTION, PORT } = process.env;

const port = process.env.PORT || 3001 
// port var for render deploy

const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173'||"https://softuni-react-project-sigma.vercel.app" }));
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

app.use('/auth', authRoutes);

app.use('/posts', postRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at port ${PORT}`);
});
