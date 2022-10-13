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
  }
}
