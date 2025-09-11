import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/categoriaController.js"

export const categoriaRoutes = Router()

categoriaRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Retorna lista de categorias'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de categorias',
            schema: [{
                id: 1,
                nome: "Texto da categoria",
                descricao: "Descrição da categoria"
            }]
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await buscarTodos())
})

categoriaRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Retorna uma categoria'
    /* #swagger.responses[200] = {
            description: 'Retorna uma categoria',
            schema: {
                id: 1,
                nome: "Texto da categoria",
                descricao: "Descrição da categoria"
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await buscarUm(req.params.id))
})

categoriaRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Cria uma Categoria'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $nome: "Texto da Categoria",
                    $descricao: "Descrição da categoria"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Registro criado',
            schema: {
                mensagem: 'Registro criado com sucesso',
                tipo: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await criar(req.body))
})

categoriaRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Edita uma categoria'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $nome: "Texto da Categoria",
                    $descricao: "Descrição da categoria"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Categoria atualizada.',
            schema: {
                mensagem: 'Registro atualizado com sucesso.',
                tipo: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await editar(req.body, req.params.id))
})

categoriaRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Categorias']
    // #swagger.description = 'Deleta uma categoria.'
    /* #swagger.responses[200] = {
            description: 'Categoria deletada',
            schema: {
                mensagem: 'Registro deletado com sucesso.',
                tipo: 'success'
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await deletar(req.params.id))
})
