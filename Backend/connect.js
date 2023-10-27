import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "muju",
    password: "password",
    database: "socialmedia"
})