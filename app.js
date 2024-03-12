
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from './server.js';

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const conexao = await sql.connect(sqlConfig);

app.get('/', async (req, res)=>{
    const { recordset } =  await conexao.query`select * from Produtos`
    return res.status(200).json(recordset)
})

app.listen(3000,()=>{ console.log('running!') })

