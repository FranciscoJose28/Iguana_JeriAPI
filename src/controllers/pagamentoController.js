import { prisma } from "../utils/index.js";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
    accessToken: "TEST-5187935436662042-032319-8f331312da329d0eb3da0ce801349c3d-586090033",
});

async function buscarTodos() {
    try {
        return await prisma.pagamento.findMany()
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function buscarUm(id) {
    try {
        let req = await prisma.pagamento.findFirst({
            where: {
                id: Number(id)
            }
        })
        if (req) {
            return {
                tipo: "error",
                mensagem: "Registro não encontrado."
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function criar(dados) {
    try {
        const payment = new Payment(client);
        const formData = dados?.formData ?? dados?.body ?? dados;
        console.log(formData);

        const pagamentoMP = await payment.create({
            body: formData
        });

        await prisma.pagamento.create({
            data: {
                metodo: pagamentoMP.payment_method_id,
                status: pagamentoMP.status,
                data_pagamento: new Date().toISOString(),
                valor: pagamentoMP.transaction_amount,
                id_pedido: dados?.id_pedido ?? formData?.id_pedido,
                id_mercado_pago: pagamentoMP.id.toString()
            }
        });

        return {
            tipo: "success",
            pagamento: pagamentoMP
        };

    } catch (error) {

        return {
            tipo: "error",
            mensagem: error.message
        };

    }
}

async function editar(dados, id) {
    try {
        let req = await prisma.pagamento.update({
            where: {
                id: Number(id)
            },
            data: dados
        })
        if (req) {
            return {
                tipo: "success",
                mensagem: "Registro editado com sucesso!"
            }
        }
    } catch (error) {
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

async function deletar(id) {
    try {
        let req = await prisma.pagamento.delete({
            where: {
                id: Number(id)
            }
        })
        if (req) {
            return {
                tipo: "success",
                mensagem: "Registro deletado com sucesso!"
            }
        }
    } catch (error) {
        if (error.code === "P2003") {
            return {
                tipo: "error",
                mensagem:
                    "Não é possível excluir este registro, pois está sendo utilizado.",
            };
        }
        return {
            tipo: "error",
            mensagem: error.message
        }
    }
}

export {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar
}