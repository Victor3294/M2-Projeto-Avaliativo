const axios = require('axios')

async function getEnderecoCep (cep) {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        if(!response.data || !response.data.length === 0 || response.data.erro){
            return {
                erro: "Localização não encontrada"
            }
        }
        const {logradouro, localidade, bairro, uf} = response.data
        return {
                logradouro : logradouro,
                localidade: localidade,
                bairro: bairro,
                uf: uf,
        }
    } catch (error) {
        console.log(error)
        return {
            erro: "Erro ao chamar a api viaCep"
        }
    }
    
}

module.exports = {getEnderecoCep}