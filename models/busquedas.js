import axios from 'axios';

export class Busquedas {
    historial = ['CDMX', 'Huatulco', 'Bacalar'];

    constructor() {
        // TODO: Leer base de datos
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 6,
            'language': 'es'
        }
    }

    async city( ciudad = '' ) {
        // TODO: Peticion de HTTP        
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ ciudad }.json?`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( lugar => ({ 
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));
        } catch (error) {
            console.log(error)
            return [];
        }
        
        return []; // Retorna los lugares que coincidan con la ciudad.
    }
}