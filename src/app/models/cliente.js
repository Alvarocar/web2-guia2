const res = require('express/lib/response')
const sql = require('./db')

/**
 * 
 * @typedef {object} Cliente
 * @property {string} email
 * @property {string} nombre
 * @property {string} activo
 */


/**
 * 
 * @param {Cliente} cliente
 */
const Cliente = function(cliente) {
  this.email = cliente.email
  this.nombre = cliente.nombre
  this.activo = cliente.activo
}
/**
 * @param {Cliente} newCliente
 * @param {Function} result
 */
Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO cliente SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }
    const cliente = { id: res.insertId, ...newCliente}
    console.log('crear cliente: ', cliente)
    result(null, cliente)
  })
}

/**
 * @param {number} clienteId
 * @param {Function} result
 */
Cliente.findById = (clienteId, result) => {
  sql.query(`SELECT * FROM cliente WHERE id = ${clienteId}`, (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(err, null)
      return
    }

    if (res.length) {
      console.log("cliente: ", res[0], " ; hallado!")
      result(null, res[0])
      return
    }

    result({ kind: "no_encontrado" }, null)
  })
}

/**
 * @param {Function} result
 */
Cliente.getAll = result => {
  sql.query("SELECT * FROM cliente", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }
    console.log("clientes: ", res)
    result(null, res)
  })
}

/**
 * @param {number} id
 * @param {Cliente} cliente
 * @param {Function} result
 */
Cliente.updateById = (id, cliente, result) => {
  sql.query("UPDATE cliente SET email = ?, nombre = ?, activo = ? WHERE ID = ?", 
  [cliente.email, cliente.nombre, cliente.activo, id],
  (err, res ) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    console.log("modificado cliente: ", { id, ...cliente })
    result(null, { id, ...cliente })
  })
}

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM cliente WHERE id = ?", id,
  (err, req) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null)
      return
    }

    console.log("cliente borrado con el id: ", id)
    result(null, res)
  })
}

Cliente.removeAll = result => {
  sql.query("DELETE FROM cliente", (err, res) => {
    if (err) {
      console.log("error: ", err)
      result(null, err)
      return 
    }
    console.log(`borrados ${res.affectedRows} clientes`)
    result(null, res)
  })
}

module.exports = Cliente