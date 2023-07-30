
import 'dotenv/config'
import { inquiererMenu, leerInput, pause } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() => {
    let opc;
    const busquedas = new Busquedas();

    do {
        opc = await inquiererMenu(); 

        switch (opc) {
            case 1:
                /* Muestra mensaje */
                const lugar = await leerInput('Ciudad:');
                /* Busca los valores */
                await busquedas.city( lugar );
                /* Selecciona el lugar */
                /* Clima */
                /* Muestra los resultados */
                console.log('\nInformación del lugar\n'.green);
                console.log('Ciudad:');
                console.log('Lat:');
                console.log('Lng:');
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