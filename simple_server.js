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




async function getData(ctx) {


    console.log("GET getData()");

    console.log('Request URL: ' + ctx.request.url)//mostrar la ruta completa de la peticion
    console.log('Query String: ' + ctx.request.querystring)//el querystring pero como una cadena
    console.log('Body: ' + ctx.request.body);


    var parametros = ctx.request.query;//el query como un objeto

   
    let query = `SELECT id, geom, latitud, longitud FROM wifi_c5 LIMIT 5;`;//where id = ???
    let sqlReplacements = {};

    console.log(query)
    let resultados = await db.any(query, sqlReplacements);//esperamos los resultados de la consulta con await
    console.log(resultados);

   let jsondata = resultados


    // //iteramos sobre el arreglo de respuestas o results, es decir, para cada resultado_i ejecutamos una pieza de codigo que crea un feature
     resultados.forEach(function (resultado_i) {
   
       console.log(resultado_i);
       jsondata.results=resultado_i.b;
     });
      console.log(  jsondata  );

    ctx.body = jsondata;//devolviendo los resultados.

}

//definicion del recurso para obtener X3D
async function getInfo(ctx) {

    console.log("GET getInfo");
    console.log(ctx.request.url)//mostrar la ruta completa de la peticion
    console.log(ctx.request.querystring)//el querystring pero como una cadena
    console.log(ctx.request.method)//el querystring pero como una cadena

    var parametros = ctx.request.query;//el query como un objeto

    //aqui vamos a utilizar algunos parametros

    ctx.body = 'SIMPLE  SERVER v.0.1 ' + ctx.request.url ;//devolviendo los resultados.
}




async function getResults(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto
    console.log(parametros.lat);
    console.log(parametros.lon);
    let lat=20.0;
    let lon=-100.0;

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery = `WITH tablita AS 
    (SELECT id, geom g, latitud lat, longitud lon FROM wifi_c5) 
    SELECT st_asgeojson(g) FROM tablita json `;//FORM ... WHERE ...
    let sqlReplacements={};
    let resultados = await db.any(sqlquery, sqlReplacements);//esperamos los resultados de la consulta con await
    //console.log(results);

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
        //aunque hay manera de automatizar los properties que se agregan, eso queda fuera del alcance de la practica, sorry =(
        let feature = {
            "type": "Feature",
            "id": resultado_i.id,
            //"geometry": JSON.parse(resultado_i.json),
            "geometry_name": "geom",
            "properties": {

            }
        };
        //console.log(JSON.stringify(feature));//por si quisiera ver el contenido de cada iteracion
        //revisar https://www.w3schools.com/jsref/jsref_push.asp para mas informacion de push()
        geoJSONResult.features.push(feature);//agregamos el feature al arreglo numFeatures
    });

    //un poco de cortesia al programador
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

            router.get('/getC5', getData),//devuelve un listado de nubes
            router.get('/getResults', getResults),//devuelve un listado de nubes
            router.get('/', getInfo)
        ];
        return endpoints;
    }
}
console.log('Running SIMPLE  Server...');

module.exports = SimplePotreeServer