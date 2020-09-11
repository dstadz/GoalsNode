const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const mdwr = require('../auth/restricted-middleware')

const router = express.Router()
const model = require("../model.js");
const db = require('../data/db-config.js')

// get all
router.get('/', (req,res)=> {
  model.getAll('habits')
    .then(habits => {res.status(200).json(habits)})
    .catch(err => {res.status(500).json(err)})
})

// add by goal_id
router.post('/add/:id', (req, res) => {
  const habit = req.body
  habit.goal_id = req.params.id

  model.add('habits', habit)
  .then(habit =>{ res.status(201).json(habit)})
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

// get all habits for specific goal
router.get('/all/:id',/* mdwr.restricted,*/ (req,res) => {
  console.log(req.params.id)
  return db('habits')
  .where({ goal_id: req.params.id })
  .then(habits => {res.json(habits)})
  .catch(err => {res.status(500).json(err);});
})

// get specific habit
router.get('/:id',/* mdwr.restricted,*/ (req,res) => {
  return db('habits')
  .where({ id: req.params.id })
  .first()
  .then(habits => {res.json(habits)})
  .catch(err => {res.status(500).json(err);});
})

module.exports = router;
