const Pool = require('pg').Pool
const pool = new Pool({
  user: 'jatzqqyn',
  host: 'localhost',
  database: 'lallah.db.elephantsql.com',
  password: 'R8ht2GkWgsIMxdnMQsIAh6bVyMea3gs-',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY Name ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserByName = (request, response) => {
  const name = parseInt(request.params.name)

  pool.query('SELECT * FROM users WHERE Name = $1', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { name, email, perm, group } = request.body

  pool.query('INSERT INTO users (Name, Email, Permission, Group) VALUES ($1, $2, $3, $4)', [name, email, perm, group], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with Name: ${name}`)
  })
}

const updateUser = (request, response) => {
  const name = parseInt(request.params.name)
  const { name, email, perm, group } = request.body

  pool.query(
    'UPDATE users SET Group = $4, Permission = $3, Email = $2 WHERE Name = $1',
    [name, email, perm, group],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with Name: ${name}`)
    }
  )
}

const deleteUser = (request, response) => {
  const name = parseInt(request.params.name)

  pool.query('DELETE FROM users WHERE Name = $1', [name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with Name: ${name}`)
  })
}

module.exports = {
  getUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
}