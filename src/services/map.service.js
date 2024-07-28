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

async function getGoogleMapsLink(local) {
    try {

        const {lat, lon} = local
        const googleMapsLink =  `https://www.google.com/maps?q=${lat},${lon}`
        return googleMapsLink

    } catch (error) {
        return {
            erro: "Erro ao gerar o link do google maps"
        }
    }
}

module.exports = {getMapaLocal , getGoogleMapsLink}