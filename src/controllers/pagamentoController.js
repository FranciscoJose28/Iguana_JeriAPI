import { prisma } from "../utils/index.js";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import bcrypt from "bcrypt";

const client = new MercadoPagoConfig({
    accessToken: "TEST-5187935436662042-032319-8f331312da329d0eb3da0ce801349c3d-586090033",
});

const statusPedidoPorStatusPagamento = {
    pending: "Pendente",
    in_process: "Em processamento",
    authorized: "Autorizado",
    approved: "Pago",
    rejected: "Rejeitado",
    cancelled: "Cancelado",
    refunded: "Reembolsado",
    charged_back: "Contestado",
    in_mediation: "Em disputa"
};

const mensagensStatusPagamento = {
    pending_contingency: {
        tipo: "warning",
        mensagem: "Pagamento pendente de análise pelo Mercado Pago. Aguarde a atualização do status."
    },
    cc_rejected_call_for_authorize: {
        tipo: "error",
        mensagem: "Pagamento recusado. Entre em contato com o banco emissor para autorizar a compra."
    },
    cc_rejected_insufficient_amount: {
        tipo: "error",
        mensagem: "Pagamento recusado por saldo ou limite insuficiente. Tente outro cartão ou forma de pagamento."
    },
    cc_rejected_bad_filled_security_code: {
        tipo: "error",
        mensagem: "Pagamento recusado porque o código de segurança informado é inválido. Confira os dados ou tente outro cartão."
    },
    cc_rejected_bad_filled_date: {
        tipo: "error",
        mensagem: "Pagamento recusado porque a data de validade informada é inválida. Confira os dados do cartão."
    }
};

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
    let usuario;
    let clienteFoiCriado = false;
    let pedidoId;

    try {
        const payment = new Payment(client);
        const formData = dados?.formData ?? dados?.body ?? dados;

        if (formData.usuario_id) {
            usuario = await prisma.cliente.findFirst({
                where: {
                    id: Number(formData.usuario_id)
                }
            })
        }

        if (!usuario) {
            usuario = await prisma.cliente.create({
                data: {
                    nome: formData.nome,
                    sobrenome: formData.sobrenome,
                    email: formData.email,
                    cpf: formData.cpf,
                    telefone: formData.telefone,
                    data_nascimento: formData.nascimento,
                    senha: await bcrypt.hash(formData.senha, 10)
                }
            })
            clienteFoiCriado = true;
        }

        if (clienteFoiCriado) {
            await prisma.enderecos.create({
                data: {
                    cep: formData.cep,
                    logradouro: formData.endereco,
                    numero: formData.numero,
                    complemento: formData.complemento,
                    bairro: formData.bairro,
                    cidade: formData.cidade,
                    estado: formData.estado,
                    id_cliente: usuario.id
                }
            });
        }

        if (!usuario) {
            return {
                tipo: "error",
                mensagem: "Erro ao criar usuário"
            }
        }

        const pedido = await prisma.pedido.create({
            data: {
                data_pedido: new Date(),
                status: formData?.status ?? "Pendente",
                valor_produto: Number(formData?.valor ?? formData?.transaction_amount ?? dados?.valor ?? 0) - formData?.valor_frete,
                id_cliente: Number(usuario.id),
                transportadora: String(formData?.transportadora ?? dados?.transportadora ?? ""),
                dias: formData?.dias ?? 0,
                valor_frete: formData?.valor_frete ?? 0,
                desconto: Number(formData?.desconto ?? dados?.desconto ?? 0)
            }
        });
        pedidoId = pedido.id;

        if (Array.isArray(formData.produtos)) {
            for (const produto of formData.produtos) {
                const idProduto = Number(produto?.id_produto ?? produto?.id ?? produto)
                const quantidade = Number(produto?.quantidade ?? produto?.quandidade ?? produto?.amount ?? 1)

                if (!Number.isNaN(idProduto) && idProduto > 0 && Number.isFinite(quantidade) && quantidade > 0) {
                    await prisma.produtos_pedido.create({
                        data: {
                            quantidade,
                            pedido: {
                                connect: {
                                    id: pedido.id
                                }
                            },
                            produto: {
                                connect: {
                                    id: idProduto
                                }
                            }
                        }
                    })
                }
            }
        }

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

        await prisma.$transaction(async (tx) => {
            await tx.pagamento.create({
                data: {
                    metodo: pagamentoMP.payment_method_id,
                    status: pagamentoMP.status,
                    data_pagamento: pagamentoMP.date_approved ?? new Date().toISOString(),
                    valor: pagamentoMP.transaction_amount,
                    id_pedido: pedido.id,
                    id_mercado_pago: pagamentoMP.id.toString()
                }
            });

            const statusPedido = statusPedidoPorStatusPagamento[pagamentoMP.status];
            if (statusPedido) {
                await tx.pedido.update({
                    where: { id: pedido.id },
                    data: { status: statusPedido }
                });
            }
        });

        const retornoStatus = mensagensStatusPagamento[pagamentoMP.status_detail] ?? {
            tipo: pagamentoMP.status === "approved"
                ? "success"
                : pagamentoMP.status === "rejected"
                    ? "error"
                    : "warning",
            mensagem: pagamentoMP.status === "approved"
                ? "Pagamento aprovado."
                : pagamentoMP.status === "rejected"
                    ? "Pagamento recusado pelo Mercado Pago."
                    : `Pagamento com status "${pagamentoMP.status}".`
        };

        return {
            tipo: retornoStatus.tipo,
            mensagem: retornoStatus.mensagem,
            codigo_status: pagamentoMP.status_detail,
            pedido,
            pagamento: pagamentoMP
        };

    } catch (error) {
        try {
            if (pedidoId || (clienteFoiCriado && usuario)) {
                await prisma.$transaction(async (tx) => {
                    if (pedidoId) {
                        await tx.produtos_pedido.deleteMany({
                            where: { id_pedido: pedidoId }
                        });
                        await tx.pagamento.deleteMany({
                            where: { id_pedido: pedidoId }
                        });
                        await tx.pedido.delete({
                            where: { id: pedidoId }
                        });
                    }

                    if (clienteFoiCriado && usuario) {
                        await tx.enderecos.deleteMany({
                            where: { id_cliente: usuario.id }
                        });
                        await tx.cliente.delete({
                            where: { id: usuario.id }
                        });
                    }
                });
            }
        } catch (rollbackError) {
            return {
                tipo: "error",
                mensagem: `${error.message}. Falha ao desfazer os registros criados: ${rollbackError.message}`
            };
        }

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

async function webhook(req) {
    const body = req.body ?? {};
    const notificationType = body.type ?? body.topic ?? req.query.type ?? req.query.topic;

    console.log(body);

    if (notificationType && String(notificationType).toLowerCase() !== "payment") {
        console.log("notificação ignorada");
        
        return {
            status: 200,
            body: { tipo: "success", mensagem: "Notificação ignorada." }
        };
    }

    const paymentId = body.data?.id ?? body.id ?? req.query["data.id"] ?? req.query.id;
    if (paymentId === undefined || !/^\d+$/.test(String(paymentId))) {
        console.log("ID do pagamento inválido ou ausente.");
        
        return {
            status: 400,
            body: { tipo: "error", mensagem: "ID do pagamento inválido ou ausente." }
        };
    }

    const payment = new Payment(client);
    let pagamentoMP;
    try {
        pagamentoMP = await payment.get({ id: String(paymentId) });
        console.log(pagamentoMP);
        
    } catch (error) {
        return {
            status: 502,
            body: {
                tipo: "error",
                mensagem: "Falha ao consultar o pagamento no Mercado Pago.",
                detalhes: error instanceof Error
                    ? error.message
                    : error
            }
        };
    }

    if (!pagamentoMP.status) {
        console.log("O Mercado Pago retornou um pagamento sem status.");
        
        throw new Error("O Mercado Pago retornou um pagamento sem status.");
    }

    const pagamentoLocal = await prisma.pagamento.findFirst({
        where: { id_mercado_pago: String(pagamentoMP.id) }
    });

    if (!pagamentoLocal) {
        console.log("Pagamento não encontrado.");
        
        return {
            status: 404,
            body: { tipo: "error", mensagem: "Pagamento não encontrado." }
        };
    }

    const statusPedido = statusPedidoPorStatusPagamento[pagamentoMP.status];

    await prisma.$transaction(async (tx) => {
        await tx.pagamento.update({
            where: { id: pagamentoLocal.id },
            data: {
                status: pagamentoMP.status,
                ...(pagamentoMP.payment_method_id && {
                    metodo: pagamentoMP.payment_method_id
                }),
                ...(pagamentoMP.date_approved && {
                    data_pagamento: pagamentoMP.date_approved
                }),
                ...(typeof pagamentoMP.transaction_amount === "number" && {
                    valor: pagamentoMP.transaction_amount
                })
            }
        });

        if (statusPedido) {
            await tx.pedido.update({
                where: { id: pagamentoLocal.id_pedido },
                data: { status: statusPedido }
            });
        }
    });
    console.log("Notificação processada com sucesso.");
    
    return {
        status: 200,
        body: {
            tipo: "success",
            mensagem: "Notificação processada com sucesso.",
            pagamento: {
                id: String(pagamentoMP.id),
                status: pagamentoMP.status
            }
        }
    };
}

export {
    buscarTodos,
    buscarUm,
    criar,
    editar,
    deletar,
    webhook
}