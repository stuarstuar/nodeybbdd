const Cursor = require("pg-cursor")
const { Pool } = require("pg");


// Sintaxis

// 1) new Cursor(sql, values)

// 2) const consulta = new Cursor("select * from usuarios")
//    const cursor = client.query(consulta);


// Leer 
/*
cursor.read(10, (err, rows) => {
    console.log(rows);
    cursor.close()
});*/


const config = {
    user: "postgres",
    host: "localhost",
    password: "jesus4ever",
    database: "blog",
    port: 5432,
};

const pool = new Pool(config);

/*

pool.connect((error_conexion, client, release) => {
    
    const consulta = new Cursor("select * from ropa");
    const cursor = client.query(consulta);

    if (error_conexion) return console.error(error_conexion);

    cursor.read(5, (err, rows) => {

        console.log(rows);

        cursor.close();
        release();
        pool.end();
    })
 
});*/

pool.connect(async (error_conexion, client, release) => {
    
    try {
    await client.query("BEGIN");
    
    const descontar = `UPDATE ropa SET saldo = saldo - 20000 WHERE nombre ='pantalon' RETURNING * `;
    descuento = await client.query(descontar);

    const acreditar = `UPDATE ropa SET saldo = saldo + 20000 WHERE nombre = 'polera' RETURNING *`;
    acreditacion = await client.query(acreditar);

    console.log("Descuento realizado con éxito: ", descuento.rows[0]);
    console.log("Acreditación realizada con éxito: ", acreditacion.rows[0]);

    
    await client.query("COMMIT")
    }catch(e){

        await client.query("ROLLBACK");
        console.log("Error código: " + e.code);
        console.log("Detalle del error: " + e.detail)
        console.log("Tabla originaria del error: " + e.table); 
        console.log("Restricción violada en el campo: " + e.constraint);
    }
    
    release();
    pool.end();
});
    