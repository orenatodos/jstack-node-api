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

    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(sortedUsers))
  },

  getUserById(request, response){
    const { id } = request.params

    const user = users.find((user) => user.id === id)

    if(!user){
      response.writeHead(400, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ error: 'User not found' }))
    } else {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(user))
    }
  }
}
