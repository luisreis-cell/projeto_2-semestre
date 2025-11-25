const session = require('express-session');

module.exports = (app) => {
    app.use(session({
        secret: 'supersecretkey', 
        resave: false, 
        saveUninitialized: false,
        cookie: { secure: false } 
    }));
};
