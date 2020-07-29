const db = require('./data/db-config.js')

module.exports = {
  getAll,
  findBy,
  findById,
  findByName,
  findByRestId,
  findByname,
  add
}

//all
function getAll(data){ return db(data) }

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

//restautants
function findByName(name){
  return db('restaurants')
  .where({ name })
  // .first()
}

///reviews
function findByRestId(restaurant_id){
  return db('reviews')
  .where({ restaurant_id })
}
