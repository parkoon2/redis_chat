module.exports = {
    mysql: {
        host: 'localhost',
        user: 'root',
        password: '1234',
        port: '3306',
        database: 'kt'
    },
    postgresql: {
        host         : "ktgenie.com",
		port         : 5432,
		user         : "genie",
		password     : "genie01",
        database     : "wgcptestdb",
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000 // how long a client is allowed to remain idle before being closed
    }
}