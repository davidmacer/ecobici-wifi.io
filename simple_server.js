//npx lws --stack  body-parser lws-static lws-cors simple_server.js   

console.log('SIMPLE   SERVER  V0.1');

const initOptions = {/* initialization options */ };
const pgp = require('pg-promise')(initOptions);

const connection = {
    host: 'localhost',
    port: 5432,
    database: 'geoinfo',
    user: 'postgres',
    password: 'postgres'
};

const db = pgp(connection);

async function getWifiBuffer(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto
    
    let sqlquery = `SELECT wifi_c5.id id, st_asgeojson(st_buffer(wifi_c5.geom, 0.01)) json, wifi_c5.longitud, wifi_c5.latitud 
    FROM wifi_c5`;
    let sqlReplacements={};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await
    
    //plantilla de objeto geoJSON, la cual debe ser unica para cada peticion
    let geoJSONResult = {
        "type": "FeatureCollection",
        "totalFeatures": 0,  //este valor se debe actualizar
        "features": [],//aqui es donde se colocan los rasgos
        "crs": {
            "type": "name",
            "properties": {
                "name": "urn:ogc:def:crs:EPSG::4326"//habra que modificarlo conforme a las respuestas
            }
        }
    };

    //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
    resultados.forEach(function (resultado_i) {
        //creamos una plantilla para cada feature
        //los properties son especificas de cada fila.
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            "geometry": JSON.parse(resultado_i.json),
            "geometry_name": "geom",
            "properties": {
            }
        };
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    console.log("Registros devueltos: " + geoJSONResult.features.length);
    geoJSONResult.totalFeatures = geoJSONResult.features.length;//actualizando el numero de registros de GeoJSON
    ctx.body= geoJSONResult;//devolviendo los resultados.

}//end getREsults

class SimplePotreeServer {

    constructor() {
        console.log('Starting...');
    }

    middleware() {
        const router = require('koa-route')

        const endpoints = [

            //The Server listens for requests on 
            router.get('/wifiBuffer', getWifiBuffer),//devuelve un listado de nubes

        ];
        return endpoints;
    }
}
console.log('Running SIMPLE  Server...');

module.exports = SimplePotreeServer