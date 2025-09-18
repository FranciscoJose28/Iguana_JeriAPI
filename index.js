import express from "express"
import cors from "cors"
import {categoriaRoutes} from "./src/routes/categoriaRoutes.js"
import { clienteRoutes } from "./src/routes/clienteRoutes.js"
import {enderecosRoutes} from "./src/routes/enderecosRoutes.js"
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

// app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post("/login", async (req, res) => {
    //
    res.json(await login(req.body));
});

app.use("/categorias", rotaProtegida, categoriaRoutes);

app.use("/clientes", clienteRoutes);

app.use("/enderecos", enderecosRoutes);

app.use("/pagamentos", pagamentoRoutes);

app.use("/pedidos", pedidoRoutes);

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