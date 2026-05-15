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

       it('Validar que pagamento com valor menor ou igual a zero retorna erro', () => {
            const servicoDePagamento = new ServicoDePagamento();

            assert.throws(() => {
                servicoDePagamento.fazerPagamento('1111-2222-3333', 'Golpista', -100000.00);
            }, {
                    message: 'Valor do pagamento deve ser maior que zero'
                });
        });

        it('Validar que pagamento com valor até 100.00 recebe categoria padrão', () => {
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.fazerPagamento('9784-0000-7654', 'Empresa X', 100.00)
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
            
            assert.equal(ultimoPagamento.codigoBarras, '9784-0000-7654');
            assert.equal(ultimoPagamento.empresa, 'Empresa X');
            assert.equal(ultimoPagamento.valor, 100.00); 
            assert.equal(ultimoPagamento.categoria, 'padrão');
        });

        it('Validar que pagamento com valor maior que 100.00 recebe categoria cara', () => {
            const servicoDePagamento = new ServicoDePagamento();

            servicoDePagamento.fazerPagamento('9999-0000-7654', 'Empresa Y', 101.00)
            const ultimoPagamento = servicoDePagamento.consultarUltimoPagamento();
            
            assert.equal(ultimoPagamento.codigoBarras, '9999-0000-7654');
            assert.equal(ultimoPagamento.empresa, 'Empresa Y');
            assert.equal(ultimoPagamento.valor, 101.00); 
            assert.equal(ultimoPagamento.categoria, 'cara');
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