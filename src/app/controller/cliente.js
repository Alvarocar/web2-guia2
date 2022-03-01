const Cliente = require('../models/cliente')

exports.create = (req, res) => {

  if(!req.body) {
    res.status(400).json({
      message: 'La petición debe tener contenido'
    })
    return
  }
  const { email, nombre, activo } = req.body
  const cliente = new Cliente({
    email, nombre, activo
  })

  Cliente.create(cliente, (err, data) => {
    console.log(err)
    if (err) {
      res.status(500).json({
        message: err.message || 'Ocurrió un error en la creacion del Cliente'
      })
      return
    }
    res.json(data)
  })
} 

exports.findAll = (req, res) => {
  Cliente.getAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || 'Ocurrio un error recuperando los clientes'
      })
      return
    }

    res.status(200).json(data)
    return
  })
}

exports.findOne = (req, res) => {
  Cliente.findById(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).json({
          message: `Cliente no encontrado con el id ${req.params.clienteId}.`
        })
        return
      }
      res.status(500).json({
        message: `Error recuperando Cliente con id: ${req.params.clientId}`
      })
      return
    }

    res.status(200).json(data)
  })
}

exports.update = (req, res) => {

  if (!req.body) {
    res.status(400)
    .json({
      message: 'El contenido no puede estar vacio'
    })
    return
  }

  Cliente.updateById(req.params.clienteId, new Cliente(req.body),
  (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).json({
          message: `Cliente no encontrado con el id ${req.params.clienteId}.`
        })
        return
      }
      res.status(500).json({
        message: `Error recuperando Cliente con id: ${req.params.clientId}`
      })
      return
    }
    res.json(data)
  })
}

exports.delete = (req, res) => {
  Cliente.remove(req.params.clienteId, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(404).json({
          message: `Cliente no encontrado con el id ${req.params.clienteId}.`
        })
        return
      }
      res.status(500).json({
        message: `Error recuperando Cliente con id: ${req.params.clientId}`
      })
      return
    }

    res.status(204).json()
  })
}

exports.deleteAll = (req, res) => {
  Cliente.removeAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: err.message || 'Ocurrio un error al eliminar los clientes.'
      })
    }
    res.json({ messages: 'Todos los registros de cliente fueron eliminados' })
  })
}