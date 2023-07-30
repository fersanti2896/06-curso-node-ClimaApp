
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
                /* Clima */
                const { nombre, lng, lat } = lugares.find(lugar => lugar.id === id);
                /* Muestra los resultados */
                console.log('\nInformación del lugar\n'.green);
                console.log('Ciudad:', nombre);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:');
                console.log('Mínima:');
                console.log('Máxima:');
                break;
            
            case 2:
                console.log('Historial');
                break;
        }

        await pause();
    } while ( opc !== 0 );
}

main();