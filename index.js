import express from "express"
import cors from "cors"
import { categoriaRoutes } from "./src/routes/categoriaRoutes.js"
import { clienteRoutes } from "./src/routes/clienteRoutes.js"
import { enderecosRoutes } from "./src/routes/enderecosRoutes.js"
import { favoritosRoutes } from "./src/routes/favoritosRoutes.js"
import { pagamentoRoutes } from "./src/routes/pagamentoRoutes.js"
import { pedidoRoutes } from "./src/routes/pedidoRoutes.js"
import { produtoRoutes } from "./src/routes/produtoRoutes.js"
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './src/docs/documentacao.json' with { type: "json" }
import { login } from "./src/controllers/clienteController.js";
import { rotaProtegida } from "./src/utils/index.js"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.redirect("/docs")
})

app.post("/frete", async (req, res) => {
    try {
        const melhorEnvio = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", {
            method: "post",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5NTYiLCJqdGkiOiIzZjQ4YTEzZGEyMzUwYzgzNWI2ZTY5N2U0MWVmZThhNDdjMzljY2Y3NjM3YzBiMTgyMDI4NmRmNGZmZjU0NzNhMDQ2NmZjNWJiZTgwMTZmMSIsImlhdCI6MTc3MjQ5MjI4Ny44ODE5MzEsIm5iZiI6MTc3MjQ5MjI4Ny44ODE5MzQsImV4cCI6MTgwNDAyODI4Ny44NzM5MzUsInN1YiI6ImExMzUwMDZlLWE1MGItNDBlMy1hYWRjLTFhOGQ5NWI3N2Q0NSIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.eNYZio2plVGN3MOJUux52wmyrPDSstGfNLOaRk_5RUsFhXtoF3TwgKuD-8gjdYueB5nhLRQmgmuo8CkQDrtGWE3gB8NcQCkK8sUZnBZxZmPxEf3_6XThM_LXYTajTia5LdzHq0Dn-E5yIwsTLwG5VCF8QADglKq0hhUoO6z5zY5mD1Odp7RYa3HeXJf8WMa68rjW5HWqAHQCpBYHfKg4aY1ZlMZDQGV2O2Qe3E3ZFxuif769NAE4C9jahgbLswBh9FER_WXqciaKqxXrge1C42emi_Va3q57ar1FX-42nirTGNF4AOOvFNlVBLCBarOxvAlxIHO6IOSepnTm19w7tg_bTWwkorvu4sEF6-QrqtfRpNC1lZDIJctGU9Vv4LeaCnVkYf011GsFSyJuUpzzNAioo3OVAtpYbBetrPCyNQp7MFKV1LSfQ2QxTPcZ4e-zo8_5cERDvuH3-3wdyiAW6Kok7zKsZQ0Fg-lPoF0D5ci5wL-W43QX5OiQZzTPo45chZjqwnGEn7boFmgWRYrRBWqzWqhqqwOZCZoN2PJZVF7MbV3QYWkqKJW62AgmAaPGN0sM-7yri3yMkxsN0r3b5sDahFgHzV6AzFZMdIFZHkCXqtKQF5-A8l0p3lX9FcwusdKg1gKQ5pDWXKc9TYPd2mYtRIJSR94dHGstQh9w1xk',
                'User-Agent': 'Aplicação tico-neto9@hotmail.com'
            },
            body: JSON.stringify(req.body)
        })
        const fretes = await melhorEnvio.json()
        res.json(fretes)
        // res.send(JSON.stringify(req.body))
    } catch (error) {

    }
})

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/login", async (req, res) => {
    // #swagger.tags = ['Logins']
    // #swagger.description = 'Retorna os dados de quem logou'
    /* #swagger.responses[200] = {
            description: 'Retorna os dados de quem logou',
            schema: {
                id: 1,
                email: "Email do cliente"
            }
    } */
    /* #swagger.responses[422] = {
            description: 'Erro interno',
            schema: {
                tipo: "error",
                mensagem: 'mensagem do sistema'
            }
    } */
    res.json(await login(req.body));
});

app.use("/categorias", categoriaRoutes); //rotaProtegida,

app.use("/clientes", clienteRoutes);

app.use("/enderecos", enderecosRoutes); //rotaProtegida,

app.use("/favoritos", favoritosRoutes); //rotaProtegida,

app.use("/pagamentos", pagamentoRoutes); //rotaProtegida,

app.use("/pedidos", pedidoRoutes); //rotaProtegida,

app.use("/produtos", produtoRoutes);

app.use('/uploads/produtos', express.static('./src/uploads/produtos'));

app.use((req, res) => {
    res.status(404).json({
        tipo: "error",
        mensagem: "Rota não encontrada."
    })
})

app.listen(8000, () => {
    console.log("http://localhost:8000");
});