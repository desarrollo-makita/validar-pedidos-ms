const axios = require('axios');
const logger = require('../config/logger.js');
const { connectToDatabase, closeDatabaseConnection } = require('../config/database.js');
const sql = require('mssql');

/**
 * Funcion qe consulta si el servicio pedido existe en las base de datos de makita
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
async function validarPedidos(req , res){
    try{
        if (!req.body || !req.body.data) {
            logger.error(`Error: los parametros de entrada son incorrectos`);
            return res.status(400).json({ error: `Parámetros faltantes o vacíos` });
        }

        const objPedido =  req.body;
        logger.info(`Iniciamos la funcion validarPedidos`);

        // Conectarse a la base de datos 'DTEBdQMakita'
        await connectToDatabase('Telecontrol');
        
        const consulta = `SELECT * FROM Pedidos where ID_Pedido = '${objPedido.pedido} and ProcesoCompleto = 0'`;
        const result = await sql.query(consulta);
        
        logger.info(`Fin  la funcion validarPedidos ${JSON.stringify(result.recordset)}`);
        
        return  res.status(200).json(result.recordset);
     
    }catch (error) {
        // Manejamos cualquier error ocurrido durante el proceso
        logger.error(`Error en validarPedidos: ${error.message}`);
        res.status(500).json({ error: `Error en el servidor [validar-pedidos-ms] :  ${error.message}`  });
    }finally{
        await closeDatabaseConnection();
    }
}


module.exports = {
    validarPedidos
};
