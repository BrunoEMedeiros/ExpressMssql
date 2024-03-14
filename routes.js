
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const pool = new sql.ConnectionPool(sqlConfig)
await pool.connect();
const routes = express.Router()

routes.get('/', async (req, res)=>{
   try{
        const { recordset } =  await pool.query`select * from Produtos`
        return res.status(200).json(recordset)
   }
   catch(error){
        return res.status(501).json('ops...algo deu errado')
   }
})

routes.post('/produto/novo', async (req, res)=>{
    try{
        const { descricao, preco} = req.body;
        await pool.query`insert into Produtos values(${descricao},${preco})`
        return res.status(201).json(`ok`)
    }
    catch(error){
        return res.status(501).json('erro ao inserir produto...')
    }
})

export default routes