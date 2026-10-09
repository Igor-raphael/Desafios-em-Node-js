const fs = require("fs");

//Local variável dos dados.
const localData = "dados.json";

//Leitor do JSON
const dados = fs.readFileSync(localData, "utf8");

//Passando os dados que estão em String para objeto.
const json = JSON.parse(dados);

function buscaTodos(){
   return json.estoque.forEach(estoque => {
        console.log("Código: " + estoque.codigoProduto + "\nDescrição: " + estoque.descricaoProduto + "\nEstoque: " + estoque.estoque + "\n");
   });
}

//Função simples que retorna
function buscarProduto(identificador){

    return json.estoque.find( p => p.codigoProduto === identificador || 
        p.descricaoProduto.toLowerCase() === identificador.toString().toLowerCase()
    );

}

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

    return console.log(`Estoque atualizado: ${produto.descricaoProduto} -> ${produto.estoque} unidades.`);
}

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

    return console.log(`Estoque atualizado: ${produto.descricaoProduto} -> ${produto.estoque} unidades.`);
}

buscaTodos();