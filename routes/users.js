const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const mdwr = require('../auth/restricted-middleware')

const router = express.Router()
const model = require("../model.js");
const db = require('../data/db-config.js')

//get all
router.get('/', (req,res)=> {
  model.getAll('users')
    .then(users => {res.status(200).json(users)})
    .catch(err => {res.status(500).json(err)})
})

//get single by id
router.get('/:id', (req,res)=> {
  model.findById('users', req.params.id)
    .then(user => {res.status(200).json(user)})
    .catch(err => {res.status(500).json(err)})
})

router.post('/signUp', (req, res) => {

  const user = req.body
  user.password = bcrypt.hashSync(user.password, 12)

  model.add('users', user)
  .then(saved =>{ res.status(201).json(saved)})
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.post('/signIn', (req, res) => {
  const {email, password} = req.body;

  model.findByname({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // const token = signToken(user);
        // res.status(200).json(token);
        res.status(200).json(user)
      } else {res.status(401).json({ message: "Invalid Credentials" })}
    })
    .catch(err => {
      res.status(500).json(err)
      console.log(err)
    });
});

router.post("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {res.status(500).json(err);}
      else {res.status(200).json({ message: "logged out" });}
    });
  } else {res.status(200).end()}
});

router.put('/:id', (req, res) => {
  const newInfo = req.body
  const id = req.params.id
  db('users').where('id', '=', id).update( newInfo )
  .then(
    db('users').where({ id }).first()
    .then(user => {res.status(200).json(user)})
    .catch(err => {res.status(500).json(err)}))
  .catch(err => console.log(err))
});

function signToken(user) {
  const payload = {name: user.name,};
  const secret = process.env.JWT_SECRET || "is it secret, is it safe?";
  const options = {expiresIn: "1h",};
  return jwt.sign(payload, secret, options);
}

router.get('/all',/* mdwr.restricted,*/ (req,res) => {
  model.getAll('users')
    .then(users => {res.json(users)})
    .catch(err => {res.status(500).json(err);});
})

module.exports = router;
