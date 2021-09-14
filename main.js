const {Client, Pool} = require("pg");

const config = {
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "jesus4ever",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000,

};


const pool = new Pool(config);

// 1era Forma
/*
pool.connect((error_conexion, client, release) => {

    client.query(`insert into ropa (nombre, color, talla) values
('botas', 'rosa', '4000') RETURNING *;`, (error_query, resul) => {

        release();

        console.log("Ultimo registro agregado: ", resul.rows[0]);
    });

    pool.end();
});*/
// 2da Forma
/*
pool.connect(async (error_conexion, client, release) => {

    const res = await client.query(
        `insert into ropa (nombre, color, talla) values ($1, $2, $3)
    RETURNING *;`,
        ["calcetines", "verde", "M"]
    );

    release();

    console.log(res.rows[0]);

    pool.end();
});

*/
 
// 3era Forma
/*
pool.connect(async (error_conexion, client, release) => {

    const SQLQuery = {
        text: `insert into ropa (nombre, color, talla) values ($1, $2, $3)
    RETURNING *;`,
        values: ["cinturon", "gris", "98"],
    };

    const res = await client.query(SQLQuery);
    release();
    console.log(res.rows[0]);
    pool.end();
});

*/



// Consulta con pool se muestra como objeto
pool.connect(async (error_conexion, client, release) => {
    const SQLQuery = {
        rowMode: 'object',
        text: "select * from ropa",
    };
    if (error_conexion) return console.error(error_conexion.code);

    try {
        const res = await client.query(SQLQuery);
        console.log("Ultimo registro agregado: ", res.rows);
    } catch (error) {
        console.log(error.code);
    }
        
    release();
    pool.end();
});

