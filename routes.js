
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

routes.put('/produto/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const { descricao, preco } = req.body
        await pool.query`update Produtos set descricao = ${descricao}, preco = ${preco} where id = ${id}`
        return res.status(201).json('atualizado')
    } catch (error) {
        console.log(error)
        return res.status(501).json('erro ao atualizar produto...')
    }
})

routes.delete('/produto/:id', async (req, res)=>{
    try {
        const { id } = req.params
        await pool.query`delete from Produtos where id = ${id}`
        return res.status(200).json('excluido!')
    } catch (error) {
        console.log(error)
        return res.status(501).json('erro ao excluir produto...')
    }
})

export default routes