import { prisma } from "../utils/index.js";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import bcrypt from "bcrypt";

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
        const usuario = await prisma.cliente.create({
            data:{
                nome: formData.nome,
                sobrenome: formData.sobrenome,
                email: formData.email,
                cpf: formData.cpf,
                telefone: formData.telefone,
                data_nascimento: formData.nascimento,
                senha: await bcrypt.hash(formData.senha, 10)
            }
        })
        console.log(usuario);
        

        if (!usuario) {
            return{
                tipo: "error",
                mensagem: "Erro ao criar usuário"
            }
        }

        const pedido = await prisma.pedido.create({
            data: {
                data_pedido: new Date(),
                status: formData?.status ?? "pendente",
                valor: Number(formData?.valor ?? formData?.transaction_amount ?? dados?.valor ?? 0),
                id_cliente: Number(usuario.id),
                transportadora: String(formData?.transportadora ?? dados?.transportadora ?? ""),
                data_envio: new Date(formData?.data_envio ?? Date.now()),
                data_entrega: new Date(formData?.data_entrega ?? Date.now()),
                desconto: Number(formData?.desconto ?? dados?.desconto ?? 0)
            }
        });

        const paymentBody = {
            transaction_amount: Number(formData?.transaction_amount ?? formData?.valor ?? 0),
            token: formData.token,
            installments: Number(formData.installments ?? 1),
            payment_method_id: formData.payment_method_id,
            issuer_id: formData.issuer_id,
            payer: {
                email: formData.payer?.email ?? formData.email,
                identification: formData.payer?.identification ?? {
                    type: formData.payer?.identification?.type ?? "CPF",
                    number: formData.payer?.identification?.number ?? formData.cpf
                }
            },
            metadata: {
                id_pedido: String(pedido.id)
            }
        };

        const pagamentoMP = await payment.create({
            body: paymentBody
        });

        await prisma.pagamento.create({
            data: {
                metodo: pagamentoMP.payment_method_id,
                status: pagamentoMP.status,
                data_pagamento: new Date().toISOString(),
                valor: pagamentoMP.transaction_amount,
                id_pedido: pedido.id,
                id_mercado_pago: pagamentoMP.id.toString()
            }
        });

        return {
            tipo: "success",
            pedido,
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