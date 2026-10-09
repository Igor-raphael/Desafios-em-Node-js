//Criação de um modelo com parametros definidos. 
class boleto {
    constructor(valor, vencimento){
    this.valor = valor,
    this.dataVencimento = vencimento
    }
};

//Criação de objetos.
const boletoInternet = new boleto(500, "2026-05-29");
const boletoSaaS = new boleto(200, "2026-08-29")
const boletoAluguel = new boleto(500, "2026-11-29");

//Criado uma função para calcular os juros dependendo do boleto.
function cobrançaJuros(vencimento, valor, juros){

    const diferenca = new Date() - new Date(vencimento);

    //Guard caso o boleto não esteja vencido.
    if( diferenca <= 0){
        return console.log("Boleto não vencido, sem juros.\n")
    }

    const dias = diferenca / (1000 * 60 * 60 * 24)

    const diasCobrados = Math.ceil(dias);

    const calculoDeJuro = valor * diasCobrados * juros;

    const total = valor + calculoDeJuro;

    return console.log("Valor = R$" + valor + "\nDias atrasados = " + diasCobrados + "\n" + "Valor total dos juros = \x1b[31mR$" + calculoDeJuro + "\x1b[0m" + "\n" + "Valor total a ser pago = \x1b[32mR$" + total +"\x1b[0m\n");
}

//Por fim é testado os 3 modelos de boleto.
    cobrançaJuros(boletoInternet.dataVencimento, boletoInternet.valor, 0.025);
    cobrançaJuros(boletoSaaS.dataVencimento, boletoSaaS.valor, 0.025);
    cobrançaJuros(boletoAluguel.dataVencimento, boletoAluguel.valor, 0.025);