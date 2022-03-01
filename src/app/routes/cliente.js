module.exports = app => {
  const clientes = require('../controller/cliente')
  app.post('/clientes', clientes.create)
  app.get('/clientes', clientes.findAll)
  app.get('/clientes/:clienteId', clientes.findOne)
  app.put('/clientes/:clienteId', clientes.update)
  app.delete('/clientes/:clienteId', clientes.delete)
  app.delete('/clientes', clientes.deleteAll)
}