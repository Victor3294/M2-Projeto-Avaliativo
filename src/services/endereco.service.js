const axios = require('axios')

async function getEnderecoCep (valor) {
    try {
        const cep = valor.replace(/\D/g, '')
        console.log(cep)
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const dados = await response.json()
        if(!dados.erro){
            return {
                logradouro : dados.logradouro,
                localidade: dados.localidade,
                bairro: dados.bairro,
                uf: dados.uf,
            }
        }
        else{
            return {
                erro: "Cep não encontrado ou inexistente"
            }
        }
    } catch (error) {
        return {
            erro: "Erro ao chamar a api viaCep"
        }
    }
    
}

module.exports = {getEnderecoCep}