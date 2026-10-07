const fs = require("fs");

const dados = fs.readFileSync("dados.json", "utf8");

const json = JSON.parse(dados);

json.vendas.forEach(venda => {
    
    if(venda.valor < 100){
        console.log(venda.vendedor + " : R$" + venda.valor + " =" + " \x1b[31m-- Sem comissão. \x1b[0m");
    }

    if(venda.valor >= 100 && venda.valor < 500 ){

      const com = venda.valor - (venda.valor - (venda.valor * 0.01));

        console.log(venda.vendedor + " : R$" + venda.valor + " =" + " -- Comissão de \x1b[32mR$ " + com.toFixed(2) + "\x1b[0m" );
    }

    if(venda.valor > 500 ){

      const com = venda.valor - (venda.valor - (venda.valor * 0.05));

        console.log(venda.vendedor + " : R$" + venda.valor + " =" + " -- Comissão de \x1b[32mR$ " + com.toFixed(2) + "\x1b[0m" );
    }

});
