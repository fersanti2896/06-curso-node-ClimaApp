
import 'dotenv/config'
import { inquiererMenu, leerInput, listarLugares, pause } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() => {
    let opc;
    const busquedas = new Busquedas();

    do {
        opc = await inquiererMenu(); 

        switch (opc) {
            case 1:
                /* Muestra mensaje */
                const busqueda = await leerInput('Ciudad:');
                /* Busca los valores */
                const lugares = await busquedas.city( busqueda );
                /* Selecciona el lugar */
                const id = await listarLugares( lugares );
                if( id === '0' ) continue;
                const { nombre, lng, lat } = lugares.find(lugar => lugar.id === id);
                /* Guardar en BD */
                busquedas.addHistoryCity( nombre );
                /* Clima */
                const { desc, min, max, temp } = await busquedas.tempCity( lat, lng );
                /* Muestra los resultados */
                console.log('\nInformación del lugar\n'.green);
                console.log('Ciudad:', nombre);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Clima:', desc);
                console.log('Temperatura:', temp);
                console.log('Mínima:', min);
                console.log('Máxima:', max);
                break;
            
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, index) => {
                    const idx = `${ index + 1 }.`.green;
                    console.log(`${ idx } ${ lugar }`);
                });
                break;
        }

        await pause();
    } while ( opc !== 0 );
}

main();