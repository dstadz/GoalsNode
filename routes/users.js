const db = require('../db')


// app.get('/:id', (req, res, next) => {
//   db.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
//     if (err) { return next(err) }
//     res.send(res.rows[0])
//   })
// })