import {Router} from "express"
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/produtoController.js"

export const produtoRoutes = Router()

produtoRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Retorna lista de produtos'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de produtos',
            schema: [{
                id: 1,
                nome: "Nome do produto",
                descricao: "Descrição do produto",
                tamanha: "Tamanho do produto",
                cor: "Cor do produto",
                valor: "Valor do produto",
                estoque: "Quantidade disponível do produto",
                desconto: "Desconto do produto"
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

produtoRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Retorna um produto'
    /* #swagger.responses[200] = {
            description: 'Retorna um produto',
            schema: {
                id: 1,
                nome: "Nome do produto",
                descricao: "Descrição do produto",
                tamanha: "Tamanho do produto",
                cor: "Cor do produto",
                valor: "Valor do produto",
                estoque: "Quantidade disponível do produto",
                desconto: "Desconto do produto"
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

produtoRoutes.post("/", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Registra um produto'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $nome: "Nome do produto",
                    $descricao: "Descrição do produto",
                    $tamanha: "Tamanho do produto",
                    $cor: "Cor do produto",
                    $valor: "Valor do produto",
                    $estoque: "Quantidade disponível do produto",
                    $desconto: "Desconto do produto"
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

produtoRoutes.put("/:id", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Edita um produto'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id: 1,
                    $nome: "Nome do produto",
                    $descricao: "Descrição do produto",
                    $tamanha: "Tamanho do produto",
                    $cor: "Cor do produto",
                    $valor: "Valor do produto",
                    $estoque: "Quantidade disponível do produto",
                    $desconto: "Desconto do produto"
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Produto atualizado.',
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

produtoRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Produtos']
    // #swagger.description = 'Deleta um produto.'
    /* #swagger.responses[200] = {
            description: 'Produto deletado',
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
