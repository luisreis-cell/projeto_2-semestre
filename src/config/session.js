const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET || 'supersecretkey',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
};
