import { ServicoDePagamento } from '../src/ServicoDePagamento.js';
import assert from 'node:assert';

describe('Classe do Serviço de Pagamento', () => {
    
    describe('Testes de fazerPagamento', () => {
        it('Validar que pagamento é adicionado a lista de pagamentos com sucesso', () => {
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.fazerPagamento('9784-8598-7654', 'Gerdau', 100000.00)
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
            
            assert.equal(ultimoPagamento.codigoBarras, '9784-8598-7654');
            assert.equal(ultimoPagamento.empresa, 'Gerdau');
            assert.equal(ultimoPagamento.valor, 100000.00); 
        });
    });

    describe('Testes de consultarUltimoPagamento', () => {  
        it('Deve consultar último pagamento com sucesso', () => {
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.fazerPagamento('9784-8598-7654', 'Gerdau', 100000.00);
            servicoDePagamento.fazerPagamento('9784-8598-2222', 'Ipanema', 90000.00);
            servicoDePagamento.fazerPagamento('9784-8598-1111', 'Havaianas', 120000.00);

            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();

        

            assert.equal(ultimoPagamento.codigoBarras, '9784-8598-1111');
            assert.equal(ultimoPagamento.empresa, 'Havaianas');
            assert.equal(ultimoPagamento.valor, 120000.00); 
        });
    });
});