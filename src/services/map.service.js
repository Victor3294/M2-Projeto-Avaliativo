const axios = require("axios")

const linkOpenMap = 'https://nominatim.openstreetmap.org/search?format=json&country=Brazil&limit=1'

async function getMapaLocal(cep) {
    try {
        const response = await axios.get(`${linkOpenMap}&postalcode=${cep}`)
        if(!response.data || !response.data.length === 0){
            return {
                erro: "Localização não encontrada"
            }
        } 
        const {lat, lon} = response.data[0]
        return {
            latitude: lat,
            longitude: lon
        }
    } catch (error) {
        return {
            erro : "Erro ao chamar chamar a api de mapas"
        }
    }
}

module.exports = {getMapaLocal}