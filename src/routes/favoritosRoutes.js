import { Router } from "express"
import { buscarTodos, criar, deletar } from "../controllers/favoritosController.js"
import { rotaProtegida } from "../utils/index.js"

export const favoritosRoutes = Router()

favoritosRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Endereços']
    // #swagger.description = 'Retorna lista de endereços'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de endereços',
            schema: [{
                id: 1,
                logradouro: "Texto do endereço",
                bairro: "Bairro do cliente",
                cidade: "Cidade que o cliente mora",
                estado: "Estado que o cliente mora",
                id_cliente: "1"
            }]
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await buscarTodos(req.params.id))
})

favoritosRoutes.post("/", rotaProtegida, async (req, res) => {
    // #swagger.tags = ['Favoritos']
    // #swagger.description = 'Adiciona um produto aos favoritos'
    /* #swagger.parameters['obj'] = {
                in: 'body',
                schema: {
                    $id_cliente: 1,
                    $id_produto: 1
                }
        } */
    /* #swagger.responses[200] = {
            description: 'Favorito criado',
            schema: {
                mensagem: 'Favorito criado com sucesso!',
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

favoritosRoutes.delete("/:id", async (req, res) => {
    // #swagger.tags = ['Favoritos']
    // #swagger.description = 'Deleta um favorito.'
    /* #swagger.responses[200] = {
            description: 'Favorito deletado',
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