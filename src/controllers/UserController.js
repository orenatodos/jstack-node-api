const { randomUUID } = require('crypto')

let users = require('../mocks/users')

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
    const body = request.body

    const newUser = {
      id: randomUUID(),
      name: body.name
    }

    users.push(newUser)

    response.send(200, newUser)
  },

  updateUser(request, response){
    const { id } = request.params
    const { name } = request.body

    const userExists = users.find((user) => user.id === id)

    if(!userExists){
      return response.send(400, { error: 'User not found' })
    }

    users = users.map((user) => {
      if(user.id === id){
        return {
          ...user,
          name
        }
      }

      return user
    })

    response.send(200, { id, name })
  }
}
