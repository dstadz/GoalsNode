const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const mdwr = require('../auth/restricted-middleware')

const db = require('../data/db-config.js')


const router = express.Router()

router.get('/', (req,res) => {
  let thing = req.baseUrl.slice(1)

  return db('users')
    .then(things => {res.status(200).json(things)})
    .catch(err => {
      res.status(500).json(err)
      console.log(err)
  })
})

module.exports = router;
