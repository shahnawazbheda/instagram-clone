const express = require('express');
const mongoose = require('mongoose');
const dbconfig = require('./config/db.config');
const indexRoutes = require('./routes/index');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));
const PORT = dbconfig.portNo;

mongoose.connect(dbconfig.connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB ✅'))
    .catch(err => console.error('MongoDB connection error ❌:', err));

  

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
