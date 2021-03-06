const cors = require('cors')
const helmet = require('helmet')
const express = require('express')
const sessions = require('express-session')

// const { Client } = require('pg')
// const {config} = require('./config')

// const client = new Client(config)

// client.connect()
//   .then(() => console.log('connected successfully'))
//   .catch(err => console.log(err))
//   .finally(() => client.end())

const userRouter = require('../routes/users.js');
const goalsRouter = require('../routes/goals.js')
const habitsRouter = require('../routes/habits.js');

//

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/users', userRouter);
server.use('/goals',/* mdwr.restricted,*/ goalsRouter);
server.use('/habits',/* mdwr.restricted,*/ habitsRouter);

server.get('/', (req,res) => { res.send({api: 'running like wind'}) })

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`\n\n ** API running on port: ${PORT} ** \n\n`);
});
