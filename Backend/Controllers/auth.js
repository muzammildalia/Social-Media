import { db } from "../connect.js"
import bycrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }

        const q = "SELECT * FROM users WHERE username = ?"
        db.query(q, [req.body.username], (err, data) => {
            if (err) return res.status(500).json(err)
            if (data.length) return res.status(409).json("user Already Exists")
            const salt = bycrypt.genSaltSync(10);
            const hashedPassword = bycrypt.hashSync(password, salt)
            const q = "INSERT INTO users (`username`,`name`, `email`, `password`) VALUE (?)"
            const Values = [username, name, email, hashedPassword]
            db.query(q, [Values], (err, data) => {
                if (err) return res.status(500).json(err)
                return res.status(200).send({
                    success: true,
                    message: "user has been created."
                })
            })
        })



        // 
    } catch (error) {

    }

}

export const login = (req, res) => {
    console.log("login")
    const q = "SELECT * FROM users WHERE username = ?"
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User Not Found!");

        const chechpassword = bycrypt.compareSync(req.body.password, data[0].password)

        if (!chechpassword) return res.status(400).json("Wrong password or username!")

        const token = jwt.sign({ id: data[0].id }, "secretkey");

        const { password, ...others } = data[0];

        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(others);
    })
}

export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out.")
}