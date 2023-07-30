import fs from 'fs';
import axios from 'axios';

export class Busquedas {
    historial = [];
    dbPath = './database/db.json';

    constructor() {
        this.readDB();
        console.log(this.readDB())
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 6,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    get historialCapitalizado() {
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        } );
    }

    async city( ciudad = '' ) {     
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
    }

    async tempCity( lat, lon ) {
        try {
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    addHistoryCity( lugar = '' ) {
        if( this.historial.includes( lugar.toLocaleLowerCase() ) ) return;

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift( lugar.toLocaleLowerCase() );
        this.saveDB();
    }

    saveDB() {
        const payload = {
            historial: this.historial
        };

        fs.writeFileSync( this.dbPath, JSON.stringify( payload ) );
    }

    readDB() {
        if( !fs.existsSync( this.dbPath ) ) return;
    
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );

        if( !info ) return;

        const data = JSON.parse( info );
        this.historial = data.historial;
    }
}