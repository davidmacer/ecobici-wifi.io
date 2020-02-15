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

async function getQ1(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(metro_buffer.st_buffer, esteco.geom)), metro_buffer.id, metro_buffer.stop_desc, metro_buffer.stop_name, metro_buffer.trip_heads, esteco.districtname,esteco.stationtype FROM metro_buffer, esteco;`;//FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Linea_del_metro": resultado_i.stop_desc,
                "Terminales": resultado_i.trip_heads,
                "Estacion_metro": resultado_i.stop_name,
                "Distrito_ecobici": resultado_i.districtname,
                "Tipo_de_estacion_ecobici": resultado_i.stationtype
               
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

async function getQ2(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(metro_buffer_2.st_buffer, esteco.geom)), metro_buffer_2.id, metro_buffer_2.stop_desc, metro_buffer_2.stop_name, metro_buffer_2.trip_heads, esteco.districtname,esteco.stationtype FROM metro_buffer_2, esteco;`;//FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Linea_del_metro": resultado_i.stop_desc,
                "Terminales": resultado_i.trip_heads,
                "Estacion_metro": resultado_i.stop_name,
                "Distrito_ecobici": resultado_i.districtname,
                "Tipo_de_estacion_ecobici": resultado_i.stationtype
               
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

}//end getC2

async function getQ3(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(metrobus_buffer.st_buffer, esteco.geom)), metrobus_buffer.id, metrobus_buffer.nombre, metrobus_buffer.linea, esteco.districtname,esteco.stationtype FROM metrobus_buffer, esteco;`;//FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Linea_del_metrobus": resultado_i.linea,
                "Estacion_metrobus": resultado_i.nombre,
                "Distrito_ecobici": resultado_i.districtname,
                "Tipo_de_estacion_ecobici": resultado_i.stationtype
               
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

}//end getC3

async function getQ4(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(metrobus_buffer_2.st_buffer, esteco.geom)), metrobus_buffer_2.id, metrobus_buffer_2.nombre, metrobus_buffer_2.linea, esteco.districtname,esteco.stationtype FROM metrobus_buffer_2, esteco`;//FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Linea_del_metrobus": resultado_i.linea,
                "Estacion_metrobus": resultado_i.nombre,
                "Distrito_ecobici": resultado_i.districtname,
                "Tipo_de_estacion_ecobici": resultado_i.stationtype
               
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

}//end getC4

async function getQ5(ctx) { //pendiente accidente de bicis
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(metrobus_buffer_2.st_buffer, esteco.geom)), metrobus_buffer_2.id, metrobus_buffer_2.nombre, metrobus_buffer_2.linea, esteco.districtname,esteco.stationtype FROM metrobus_buffer_2, esteco;`;//FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Linea_del_metrobus": resultado_i.linea,
                "Estacion_metrobus": resultado_i.nombre,
                "Distrito_ecobici": resultado_i.districtname,
                "Tipo_de_estacion_ecobici": resultado_i.stationtype
               
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

}//end getC5

async function getQ6(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(idcdmx_alta.geom, wifi.geom)), idcdmx_alta.id_mun, idcdmx_alta.nom_mun, idcdmx_alta.grado, wifi.id, wifi.colonia, wifi.alcaldia, wifi.altavoz FROM idcdmx_alta, wifi;` //FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Alcaldia": resultado_i.nom_mun,
                "id_del_municipio": resultado_i.id_mun,
                "Grado_de_incidencia_delictiva": resultado_i.grado,
                "Altavoz": resultado_i.altavoz
                
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

}//end getC6

async function getQ7(ctx) {

    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(idcdmx_malta.geom, wifi.geom)), idcdmx_malta.id_mun, idcdmx_malta.nom_mun, idcdmx_malta.grado, wifi.id, wifi.colonia, wifi.alcaldia, wifi.altavoz FROM idcdmx_malta, wifi where id='274';` //FORM ... WHERE ...
    console.log(sqlquery)
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Alcaldia": resultado_i.nom_mun,
                "id_del_municipio": resultado_i.id_mun,
                "Grado_de_incidencia_delictiva": resultado_i.grado,
                "Altavoz": resultado_i.altavoz

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


}//end getC7

async function getQ8(ctx) {
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_Buffer(wifi.geom, 0.0001)), wifi.id, wifi.colonia, wifi.alcaldia, wifi.altavoz, wifi.estatus_conectividad FROM wifi;` //FORM ... WHERE ...
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Alcaldia": resultado_i.alcaldia,
                "Colonia": resultado_i.colonia,
                "Estatus": resultado_i.estatus_conectividad,
                "Altavoz": resultado_i.altavoz
                
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

}//end getC8

async function getQ9(ctx) {//pendiente escuelas
    
    var parametros = ctx.request.query;//el query como un objeto

    //ejemplo de consulta falsa a la DB , pero funcional
    let sqlquery=`SELECT st_asgeojson (ST_intersection(primcdmx.geom, wifi.geom)),  primcdmx.nom_loc, primcdmx.nom_cct, primcdmx.matricula, primcdmx.turno, wifi.id, wifi.colonia, wifi.alcaldia FROM primcdmx, wifi limit 100;` //FORM ... WHERE ...
    console.log(sqlquery)
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
            "geometry": JSON.parse(resultado_i.st_asgeojson),
            "geometry_name": "geom",
            "properties": {
                "id": resultado_i.id,  //<= muevanle aqui
                "Localidad": resultado_i.nom_loc,
                "Nombre_de_la_escuela": resultado_i.nom_cct,
                "Turno": resultado_i.turno,
                "Matricula": resultado_i.matricula,
                "Estatus": resultado_i.estatus_conectividad,
                "Altavoz": resultado_i.altavoz
                
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

}//end getC9

class SimplePotreeServer {

    constructor() {
        console.log('Starting...');
    }

    middleware() {
        const router = require('koa-route')

        const endpoints = [

            //The Server listens for requests on 
            router.get('/getQ1', getQ1),//devuelve un listado de nubes
            router.get('/getQ2', getQ2),
            router.get('/getQ3', getQ3),
            router.get('/getQ4', getQ4),
            router.get('/getQ5', getQ5),
            router.get('/getQ6', getQ6),
            router.get('/getQ7', getQ7),
            router.get('/getQ8', getQ8),
            router.get('/getQ9', getQ9),

        ];
        return endpoints;
    }
}
console.log('Running SIMPLE  Server...');

module.exports = SimplePotreeServer