import axios from 'axios';

export class Busquedas {
    historial = ['CDMX', 'Huatulco', 'Bacalar'];

    constructor() {
        // TODO: Leer base de datos
    }

    async city( ciudad = '' ) {
        // TODO: Peticion de HTTP

        try {
            const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/HUATULCO.json?bbox=-180%2C-90%2C180%2C90&limit=6&proximity=-73.990593%2C40.740121&language=es&access_token=pk.eyJ1IjoiZmVyc2FudGkyODk2IiwiYSI6ImNsa3AxeWt2NDE0Y28za3BjeWNiZXQ1YnUifQ.TheqoBlDmvR0q7ofdSRgTQ');
            console.log(resp.data)
        } catch (error) {
            console.log(error)
            return [];
        }
        

        return []; // Retorna los lugares que coincidan con la ciudad.
    }
}