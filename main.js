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

//const client = new Client(config);
//client.connect();

const pool = new Pool(config);

pool.connect((error_conexion, client, release) => {

    client.query(`insert into ropa (nombre, color, talla) values
('botas', 'rosa', '4000') RETURNING *;`, (error_query, resul) => {

        release();

        console.log("Ultimo registro agregado: ", resul.rows[0]);
    });

    pool.end();
});

const ingresar = async() => {
    
    const res = await client.query(
        `insert into ropa (nombre, color, talla) values ('polera', 'roja', '89') RETURNING * ;`);


console.log('Registro agregado',res.rows[0]);
console.log('Último id',res.rows[0].id);
console.log('Cantidad de registros afectados',res.rowCount);
console.log('Campos del registro: ', res.fields.map( r => r.name).join(" - "));


client.end();
}
//ingresar();

const consulta = async() => {

    const res = await client.query(
        "SELECT * FROM ropa "
    );

    console.log('Registros: ', res.rows);

    client.end();
}
//consulta();

const editar = async() =>{
    const res = await client.query(
        "UPDATE ropa SET talla = 'L' WHERE id = 2 RETURNING *;"
    );

    console.log('Registro modificado', res.rows[0]);

    console.log('Cantidad de registros afectados', res.rowCount);
    client.end();
}
//editar(); 

const eliminar = async() => {
    
    const res = await client.query(
        "DELETE FROM ropa where id=2"
    );
    
    console.log('Cantidad de registros afectados', res.rowCount);
    client.end();
}
//eliminar();



