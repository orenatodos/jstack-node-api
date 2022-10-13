const { randomUUID } = require('node:crypto')

module.exports = [
  {
    id: randomUUID(),
    name: 'Renato'
  },
  {
    id: randomUUID(),
    name: 'Mateus'
  },
  {
    id: randomUUID(),
    name: 'João'
  }
]