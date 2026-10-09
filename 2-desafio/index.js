const fs = require("fs");

//Local variável dos dados.
const localData = "dados.json";
const localLog = "log.json";

//Leitor do JSON
const dados = fs.readFileSync(localData, "utf8");
const logData = fs.readFileSync(localLog, "utf8");

//Passando os dados que estão em String para objeto.
const json = JSON.parse(dados);
const log = JSON.parse(logData);

//Função para buscar todos os produtos.
function buscaTodos(){
   return json.estoque.forEach(estoque => {
        console.log("Código: " + estoque.codigoProduto + "\nDescrição: " + estoque.descricaoProduto + "\nEstoque: " + estoque.estoque + "\n");
   });
}

//Função para buscar produtos especifico por código ou nome
function buscarProduto(identificador){

     json.estoque.find( p => p.codigoProduto === identificador || 
        p.descricaoProduto.toLowerCase() === identificador.toString().toLowerCase()
    );

}

//Função que adiciona produtos ao estoque e retorna uma atualização do produto. 
function adicionarEstoque(codigo, valor){

    if(typeof codigo !== "number"){
        return console.log("Código inaceitável.");
    }
    
    if(valor <= 0){
        return console.log("Adicione um valor positivo.")
    }

    const produto = buscarProduto(codigo);

    if(!produto){
        return console.log("Produto não encontrado.");
    }

    produto.estoque += valor;

    fs.writeFileSync(localData, JSON.stringify(json, null, 2), "utf8");

    registrarMovimentação("Adicionar", produto.descricaoProduto, produto.codigoProduto, produto.estoque);

    return console.log(`Estoque atualizado: ${produto.descricaoProduto} -> ${produto.estoque} unidades.`);
}


//Função que remove produtos do estoque e retorna uma atualização do produto.
function removerEstoque(codigo, valor){

    if(typeof codigo !== "number"){
        return console.log("Código inaceitável.");
    }
    
    if(valor <= 0){
        return console.log("Adicione um valor positivo.")
    }

    const produto = buscarProduto(codigo);

    if(!produto){
        return console.log("Produto não encontrado.");
    }

    produto.estoque -= valor;

    fs.writeFileSync(localData, JSON.stringify(json, null, 2), "utf8");

    registrarMovimentação("Remover", produto.descricaoProduto, produto.codigoProduto, produto.estoque);

    return console.log(`Estoque atualizado: ${produto.descricaoProduto} -> ${produto.estoque} unidades.`);
}

//Gera o próximo ID baseado no último registro do log.
function gerarId(){
    const movimentacoes = log.movimentacoes;

    if(movimentacoes.length === 0){
        return 1;
    }

    return movimentacoes[movimentacoes.length -1].id + 1;
}

//Padronização das movimentações e seu salvamento no log.
function registrarMovimentação(tipo, descricao, codigo, estoque){

    const movimentacao = {
        id: gerarId(),
        tipo,
        descricao,
        codigo,
        estoque
    };

    log.movimentacoes.push(movimentacao);
    fs.writeFileSync(localLog, JSON.stringify(log, null, 2), "utf8");
}
