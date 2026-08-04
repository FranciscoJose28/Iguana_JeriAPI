import { Router } from "express"
import { buscarTodos, buscarUm, criar, deletar, editar } from "../controllers/bannerController.js"
import { rotaProtegida } from "../utils/index.js"

export const bannerRoutes = Router()

bannerRoutes.get("/", async (req, res) => {
    // #swagger.tags = ['Banners']
    // #swagger.description = 'Retorna lista de banners'
    /* #swagger.responses[200] = {
            description: 'Retorna lista de banners',
            schema: [{
                id: 1,
                imagem: "https://exemplo.com/uploads/banners/banner-1.webp",
                link: "https://exemplo.com"
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

bannerRoutes.get("/:id", async (req, res) => {
    // #swagger.tags = ['Banners']
    // #swagger.description = 'Retorna um banner'
    /* #swagger.responses[200] = {
            description: 'Retorna um banner',
            schema: {
                id: 1,
                imagem: "https://exemplo.com/uploads/banners/banner-1.webp",
                link: "https://exemplo.com"
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

bannerRoutes.post("/:id", rotaProtegida, async (req, res) => {
    // #swagger.tags = ['Banners']
    // #swagger.description = 'Atualiza um banner'
    /* #swagger.parameters['imagem'] = {
            in: 'formData',
            type: 'file',
            required: true,
            description: 'Arquivo da imagem do banner'
    } */
    /* #swagger.parameters['link'] = {
            in: 'formData',
            type: 'string',
            required: true,
            description: 'Link de destino do banner'
    } */
    /* #swagger.responses[200] = {
            description: 'Registro atualizado',
            schema: {
                mensagem: 'Registro atualizado com sucesso',
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
    res.json(await editar(req))
})

bannerRoutes.post("/", rotaProtegida, async (req, res) => {
    // #swagger.tags = ['Banners']
    // #swagger.description = 'Registra um banner'
    /* #swagger.parameters['imagem'] = {
            in: 'formData',
            type: 'file',
            required: true,
            description: 'Arquivo da imagem do banner'
    } */
    /* #swagger.parameters['link'] = {
            in: 'formData',
            type: 'string',
            required: true,
            description: 'Link de destino do banner'
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
    res.json(await criar(req))
})

bannerRoutes.delete("/:id", rotaProtegida, async (req, res) => {
    // #swagger.tags = ['Banners']
    // #swagger.description = 'Deleta um banner.'
    /* #swagger.responses[200] = {
            description: 'Banner deletado',
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