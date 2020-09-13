const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const mdwr = require('../auth/restricted-middleware')

const router = express.Router()
const model = require("../model.js");
const db = require('../data/db-config.js')

// get all
router.get('/', (req,res)=> {
  model.getAll('goals')
    .then(goals => {res.status(200).json(goals)})
    .catch(err => {res.status(500).json(err)})
})

// add by user_id
router.post('/add/:id', (req, res) => {
  const goal = req.body
  goal.completed = false
  goal.user_id = req.params.id

  model.add('goals', goal)
  .then(goal =>{ res.status(201).json(goal)})
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

// get all goals for specific user
router.get('/all/:id',/* mdwr.restricted,*/ (req,res) => {
  console.log(req.params.id)

  return db('goals')
  .where({ user_id: req.params.id })
  .then(goals => {res.json(goals)})
  .catch(err => {res.status(500).json(err);});
})

// get specific goal
router.get('/:id',/* mdwr.restricted,*/ (req,res) => {
  return db('goals')
  .where({ id: req.params.id })
  .first()
  .then(goals => {res.json(goals)})
  .catch(err => {res.status(500).json(err);});
})

//edit goal by id
router.put('/:id', (req, res) => {
  const newInfo = req.body
  const id = req.params.id
  console.log(newInfo)
  db('goals').where('id', '=', id).update( newInfo )
  .then(
    db('goals').where({ id }).first()
    .then(goal => {res.status(200).json(goal)})
    .catch(err => {res.status(500).json(err)}))
  .catch(err => console.log(err))
});

router.delete('/:id', (req,res) => {
  const { id } = req.params
  db('goals').where('id', '=', id).del()
    .then(count => {
      if(count) res.json({delete: count})
      else res.status(404).json({message: 'could not find goal with given id'})
    })
    .catch(err => {res.status(500).json(err)})
})

module.exports = router;
