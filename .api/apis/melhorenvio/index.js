import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'melhorenvio/unknown (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * Autenticação
     *
     * @summary Solicitação do token
     * @throws FetchError<401, types.SolicitacaoDoTokenResponse401> 401
     */
    solicitacaoDoToken(body, metadata) {
        return this.core.fetch('/oauth/token', 'post', body, metadata);
    }
    /**
     * Autenticação
     *
     * @summary Listar informações de aplicativo
     * @throws FetchError<404, types.ListarInformacoesDeAplicativoResponse404> 404
     */
    listarInformacoesDeAplicativo(metadata) {
        return this.core.fetch('/api/v2/me/shipment/app-settings', 'get', metadata);
    }
    /**
     * Envios
     *
     * @summary Cálculo de Fretes
     * @throws FetchError<422, types.CalculoDeFretesPorProdutosResponse422> 422
     */
    calculoDeFretesPorProdutos(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/calculate', 'post', body, metadata);
    }
    /**
     * Carrinho de Compras
     *
     * @summary Inserir fretes no carrinho
     * @throws FetchError<422, types.InserirFretesNoCarrinhoResponse422> 422
     */
    inserirFretesNoCarrinho(body, metadata) {
        return this.core.fetch('/api/v2/me/cart', 'post', body, metadata);
    }
    /**
     * Carrinho de Compras
     *
     * @summary Listar itens do carrinho
     * @throws FetchError<401, types.ListarItensDoCarrinhoResponse401> 401
     */
    listarItensDoCarrinho(metadata) {
        return this.core.fetch('/api/v2/me/cart', 'get', metadata);
    }
    /**
     * Carrinho de Compras
     *
     * @summary Exibir informações de item do carrinho
     * @throws FetchError<400, types.ExibirInformacoesDeItemDoCarrinhoResponse400> 400
     */
    exibirInformacoesDeItemDoCarrinho(metadata) {
        return this.core.fetch('/api/v2/me/cart/{id}', 'get', metadata);
    }
    /**
     * Carrinho de Compras
     *
     * @summary Remoção de itens do carrinho
     * @throws FetchError<400, types.RemocaoDeItensDoCarrinhoResponse400> 400
     */
    remocaoDeItensDoCarrinho(metadata) {
        return this.core.fetch('/api/v2/me/cart/{id}', 'delete', metadata);
    }
    geracaoDeEtiquetas(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/generate', 'post', body, metadata);
    }
    /**
     * Impressão de etiquetas
     *
     * @throws FetchError<400, types.ImpressaoDeEtiquetasResponse400> 400
     */
    impressaoDeEtiquetas(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/print', 'post', body, metadata);
    }
    /**
     * Etiquetas
     *
     * @summary Pré-visualização de etiquetas
     * @throws FetchError<404, types.PreVisualizacaoDeEtiquetasResponse404> 404
     */
    preVisualizacaoDeEtiquetas(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/preview', 'post', body, metadata);
    }
    /**
     * Pagamento de envios (Checkout)
     *
     * @summary Compra de fretes
     * @throws FetchError<422, types.CompraDeFretes1Response422> 422
     */
    compraDeFretes1(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/checkout', 'post', body, metadata);
    }
    /**
     * Pesquisar etiqueta
     *
     * @throws FetchError<400, types.PesquisarEtiquetaResponse400> 400
     */
    pesquisarEtiqueta(metadata) {
        return this.core.fetch('/api/v2/me/orders/search', 'get', metadata);
    }
    /**
     * Listar etiquetas
     *
     * @throws FetchError<401, types.ListarEtiquetasResponse401> 401
     */
    listarEtiquetas(metadata) {
        return this.core.fetch('/api/v2/me/orders', 'get', metadata);
    }
    /**
     * Listar informações de uma etiqueta
     *
     * @throws FetchError<404, types.ListarInformacoesDeUmaEtiquetaResponse404> 404
     */
    listarInformacoesDeUmaEtiqueta(metadata) {
        return this.core.fetch('/api/v2/me/orders/{id}', 'get', metadata);
    }
    /**
     * Verificar se etiqueta pode ser cancelada
     *
     * @throws FetchError<422, types.VerificarSeEtiquetaPodeSerCanceladaResponse422> 422
     */
    verificarSeEtiquetaPodeSerCancelada(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/cancellable', 'post', body, metadata);
    }
    /**
     * Cancelamento de etiquetas
     *
     * @throws FetchError<422, types.CancelamentoDeEtiquetasResponse422> 422
     */
    cancelamentoDeEtiquetas(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/cancel', 'post', body, metadata);
    }
    /**
     * Lista todas as transportadoras disponíveis
     *
     * @summary Listar transportadoras
     * @throws FetchError<400, types.ListarTransportadorasResponse400> 400
     */
    listarTransportadoras(metadata) {
        return this.core.fetch('/api/v2/me/shipment/companies', 'get', metadata);
    }
    /**
     * Lista informações detalhadas de uma transportadora específica
     *
     * @summary Listar informações de uma transportadora
     * @throws FetchError<400, types.ListarInformacoesDeUmaTransportadoraResponse400> 400
     */
    listarInformacoesDeUmaTransportadora(metadata) {
        return this.core.fetch('/api/v2/me/shipment/companies/{companyId}', 'get', metadata);
    }
    /**
     * Lista todos os serviços de transportadoras disponíveis
     *
     * @summary Listar serviços
     * @throws FetchError<400, types.ListarServicosResponse400> 400
     */
    listarServicos(metadata) {
        return this.core.fetch('/api/v2/me/shipment/services', 'get', metadata);
    }
    /**
     * Lista informações detalhadas de um serviço específico
     *
     * @summary Listar informações de um serviço
     * @throws FetchError<400, types.ListarInformacoesDeUmServicoResponse400> 400
     */
    listarInformacoesDeUmServico(metadata) {
        return this.core.fetch('/api/v2/me/shipment/services/{serviceId}', 'get', metadata);
    }
    /**
     * Lista todas agências de transportadoras disponíveis
     *
     * @summary Listar agências (e opções de filtro)
     * @throws FetchError<400, types.ListarAgenciasEOpcoesDeFiltroResponse400> 400
     */
    listarAgenciasEOpcoesDeFiltro(metadata) {
        return this.core.fetch('/api/v2/me/shipment/agencies', 'get', metadata);
    }
    /**
     * Lista informações detalhadas de uma agência específica
     *
     * @summary Listar informações de uma agência
     * @throws FetchError<400, types.ListarInformacoesDeUmaAgenciaResponse400> 400
     */
    listarInformacoesDeUmaAgencia(metadata) {
        return this.core.fetch('/api/v2/me/shipment/agencies/{agencyId}', 'get', metadata);
    }
    /**
     * Informações do usuário
     *
     * @summary Listar informações do usuário
     * @throws FetchError<401, types.ListarInformacoesDoUsuarioResponse401> 401
     */
    listarInformacoesDoUsuario(metadata) {
        return this.core.fetch('/api/v2/me', 'get', metadata);
    }
    /**
     * Informações do usuário
     *
     * @summary Listar endereços do usuário
     * @throws FetchError<401, types.ListarEnderecosDoUsuarioResponse401> 401
     */
    listarEnderecosDoUsuario(metadata) {
        return this.core.fetch('/api/v2/me/addresses', 'get', metadata);
    }
    /**
     * Informações do usuário
     *
     * @summary Saldo do usuário
     * @throws FetchError<401, types.SaldoDoUsuarioResponse401> 401
     */
    saldoDoUsuario(metadata) {
        return this.core.fetch('/api/v2/me/balance', 'get', metadata);
    }
    /**
     * Inserir saldo na carteira do usuário
     *
     * @throws FetchError<400, types.InserirSaldoNaCarteiraDoUsuarioResponse400> 400
     */
    inserirSaldoNaCarteiraDoUsuario(body, metadata) {
        return this.core.fetch('/api/v2/me/balance', 'post', body, metadata);
    }
    /**
     * Cadastro e informações das lojas
     *
     * @summary Listar lojas do usuário
     * @throws FetchError<401, types.ListarLojasDoUsuarioResponse401> 401
     */
    listarLojasDoUsuario(metadata) {
        return this.core.fetch('/api/v2/me/companies', 'get', metadata);
    }
    /**
     * Cadastro e informações das lojas
     *
     * @summary Cadastrar loja
     * @throws FetchError<401, types.CadastrarLojaResponse401> 401
     */
    cadastrarLoja(body, metadata) {
        return this.core.fetch('/api/v2/me/companies', 'post', body, metadata);
    }
    /**
     * Cadastro e informações das lojas
     *
     * @summary Visualizar loja
     * @throws FetchError<404, types.VisualizarLojaResponse404> 404
     */
    visualizarLoja(metadata) {
        return this.core.fetch('/api/v2/me/companies/{storeId}', 'get', metadata);
    }
    /**
     * Cadastro e visualização de endereços e telefones de lojas
     *
     * @summary Cadastrar endereço de uma loja
     * @throws FetchError<404, types.CadastrarEnderecoDeUmaLojaResponse404> 404
     */
    cadastrarEnderecoDeUmaLoja(body, metadata) {
        return this.core.fetch('/api/v2/me/companies/{storeId}/addresses', 'post', body, metadata);
    }
    /**
     * Listar endereços de uma loja
     *
     * @throws FetchError<404, types.ListarEnderecosDeUmaLojaResponse404> 404
     */
    listarEnderecosDeUmaLoja(metadata) {
        return this.core.fetch('/api/v2/me/companies/{storeId}/addresses', 'get', metadata);
    }
    /**
     * Cadastro e visualização de endereços e telefones de lojas
     *
     * @summary Cadastrar telefones de uma loja
     * @throws FetchError<422, types.CadastrarTelefonesDeUmaLojaResponse422> 422
     */
    cadastrarTelefonesDeUmaLoja(body, metadata) {
        return this.core.fetch('/api/v2/me/companies/{storeId}/phones', 'post', body, metadata);
    }
    /**
     * Cadastro e visualização de endereços e telefones de lojas
     *
     * @summary Listar telefones de uma loja
     * @throws FetchError<404, types.ListarTelefonesDeUmaLojaResponse404> 404
     */
    listarTelefonesDeUmaLoja(metadata) {
        return this.core.fetch('/api/v2/me/companies/{storeId}/phones', 'get', metadata);
    }
    /**
     * Retorna o status do ciclo de vida das etiquetas.
     *
     * @summary Status da etiqueta
     * @throws FetchError<400, types.RastreioDeEnviosResponse400> 400
     */
    rastreioDeEnvios(body, metadata) {
        return this.core.fetch('/api/v2/me/shipment/tracking', 'post', body, metadata);
    }
    /**
     * Impressão de etiquetas em arquivo
     *
     * @throws FetchError<401, types.ImpressaoDeEtiquetasEmArquivoResponse401> 401
     * @throws FetchError<404, types.ImpressaoDeEtiquetasEmArquivoResponse404> 404
     */
    impressaoDeEtiquetasEmArquivo(metadata) {
        return this.core.fetch('/api/v2/me/imprimir/{arquivo}/{id}', 'get', metadata);
    }
    /**
     * Logística Reversa
     *
     * @summary Inserir Logística Reversa no carrinho
     * @throws FetchError<422, types.InserirLogisticaReversaNoCarrinhoResponse422> 422
     */
    inserirLogisticaReversaNoCarrinho(body, metadata) {
        return this.core.fetch('/api/v2/me/cart/reverse', 'post', body, metadata);
    }
    /**
     * Gerar link de impressão do Documento Auxiliar de Conteúdo Eletrônico
     *
     * @summary Impressão de DACE
     * @throws FetchError<401, types.ImpressaoDaceResponse401> 401
     * @throws FetchError<404, types.ImpressaoDaceResponse404> 404
     */
    impressaoDace(metadata) {
        return this.core.fetch('/api/v2/me/imprimir/dace/{arquivo}/{order_id}', 'get', metadata);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
