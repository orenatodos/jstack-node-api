const { randomUUID } = require('crypto')

const users = require('../mocks/users')

module.exports = {
  listUsers(request, response){
    const { orderBy } = request.query

    const sortedUsers = users.sort((a, b) => {
      if(orderBy === 'name'){
        return a.name < b.name ? -1 : 1
      }

      return users
    })

    response.send(200, sortedUsers)
  },

  getUserById(request, response){
    const { id } = request.params

    const user = users.find((user) => user.id === id)

    if(!user){
      return response.send(400, { error: 'User not found' })
    } 

    response.send(200, user)
  },

  createUser(request, response){
    let body = ''

    request.on('data', (chunk) => {
      body += chunk
    })

    request.on('end', () => {
      body = JSON.parse(body)

      const newUser = {
        id: randomUUID(),
        name: body.name
      }

      users.push(newUser)

      response.send(200, newUser)
    })
  }
}
