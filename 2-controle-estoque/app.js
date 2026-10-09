const { buscaTodos, adicionarEstoque, removerEstoque, buscarProduto} = require("./estoque");

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const pergunta = (texto) => new Promise(resolve => rl.question(texto, resolve));

function exibirMenu(){
    console.log("\n=== SISTEMA DE ESTOQUE ===");
    console.log("1 - ver todos os produtos");
    console.log("2 - Adicionar estoque");
    console.log("3 - Remover estoque");
    console.log("0 - Sair\n");
}

async function iniciar(){
    let ativo = true;

    while(ativo){
        exibirMenu();
        const opcao = await pergunta("Escolha uma opção: ");

        if(opcao === "1"){
            buscaTodos();

        } else if (opcao === "2"){
            const codigo  = Number(await pergunta("Código do produto: "));
            const valor  = Number(await pergunta("Quantidade a adicionar: "));

            adicionarEstoque(codigo, valor);
        
        }else if (opcao === "3"){
            const codigo  = Number(await pergunta("Código do produto: "));
            const valor  = Number(await pergunta("Quantidade a remover: "));
            removerEstoque(codigo, valor);
        
        }else if(opcao === "0"){
            console.log("Encerrando sistema...");
            rl.close();
            ativo = false;
        
        }else{
            console.log("opção inválida.")
        }
    }
}

iniciar();