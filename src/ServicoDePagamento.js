export class ServicoDePagamento {
    #pagamentos
    
    constructor(){
        this.#pagamentos = [];
    }

    fazerPagamento(cod, destino, valorPago) {
        if (valorPago > 100){
            this.#pagamentos.push({
            codigoBarras: cod,
            empresa: destino,
            valor: valorPago,
            categoria: 'cara' 
            })
        }else {
            this.#pagamentos.push({
            codigoBarras: cod,
            empresa: destino,
            valor: valorPago,
            categoria: 'padrão'
            })
        }
        
        return this.#pagamentos;
    }

    consultarUltimoPagamento() {
        return  this.#pagamentos.at(-1)
    }
}