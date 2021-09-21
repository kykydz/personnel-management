require('dotenv').config({
    path: `${process.env.NODE_ENV}.env`
});

module.exports = {
    'development': {
        'storage': './database.sqlite3',
        'dialect': 'sqlite'
    },
    'test': {
        'username': 'root',
        'password': null,
        'database': 'database_test',
        'host': '127.0.0.1',
        'dialect': 'mysql'
    },
    'production': {
        'username': process.env.DB_USER,
        'password': process.env.DB_PASSWORD,
        'database': process.env.DB_NAME,
        'host': process.env.DB_HOST,
        'port': process.env.DB_PORT,
        'dialect': process.env.DB_DIALECT
    }
};
