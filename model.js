const db = require('./data/db-config.js')

module.exports = {
  getAll,
  findBy,
  findById,
  findByname,
  add,
  // update,
}

//all
function getAll(data){
  return db(data)
}

function findById(data, id){
  return db(data)
  .where({ id })
  .first()
}

function findBy(data, filter){
  return db(data).where({filter})
}

function add(data, x){
  return db(data)
  .insert(x,'id')
  .then(ids => {
    const [id] = ids
    return findById(data, id)
  })
}


//users
function findByname(name){
  return db('users')
  .where( name )
  .first()
}

// function update(id, user) {
//   return db('users')
//     .where({ id })
//     .update({ user });
// }

function remove(id) {
  return db('users')
    .where({ id })
    .del();
}