const {Pool} = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "jesus4ever",
    port: 5432,
    database: "gym",
});

const insertar = async (datos) => {

    const consulta = {
        text: "INSERT INTO ejercicios values($1, $2, $3, $4)",
        values: datos,
    };

    try {
        const result = await pool.query(consulta);
        return result;
    } catch (error) {

        console.log(error.code);
        return error;
    }
};

const consultar = async () => {

    try {
        const result = await pool.query("SELECT * FROM ejercicios");
        return result;
    } catch (error) {

        console.log(error.code);
        return error;
    }
};

const editar = async (datos) => {

    const consulta = {
        text: `UPDATE ejercicios SET
    nombre = $1,
    series = $2,
    repeticiones = $3,
    descanso = $4
    WHERE nombre = $1 RETURNING *`,
        values: datos,
    };

    try {
        const result = await pool.query(consulta);
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
};
    
const eliminar = async (nombre) => {
    
    try {
    const result = await pool.query(
    `DELETE FROM ejercicios WHERE nombre = '${nombre}'`
    );
    return result;
    } catch (error) {
    console.log(error.code);
    return error;
    }
}
module.exports = {insertar, consultar, editar, eliminar};