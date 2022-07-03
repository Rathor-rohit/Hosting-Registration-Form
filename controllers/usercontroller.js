import userModel from '../model/user.js';
import bcrypt from 'bcrypt';
class UserController {
    static home = (req, res) => {
        res.render("index");
    }
    static registration = (req, res) => {
        res.render("registration");
    }
    static login = (req, res) => {
            res.render("login");
        }
        /*  password without hash
        static createDoc = async(req, res) => {
            try {
                // creating new document
                const doc = new userModel({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password
                    })
                    // saving document
                await doc.save();
                res.redirect('/login');

            } catch (error) {
                console.log(error);
            }
        } */

    // password with hash
    static createDoc = async(req, res) => {
            const hashPassword = await bcrypt.hash(req.body.password, 10);
            try {
                // creating new document
                const doc = new userModel({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashPassword
                    })
                    // saving document
                await doc.save();
                res.redirect('/login');

            } catch (error) {
                console.log(error);
            }
        }
        /* login without hash
        static verifyLogin = async(req, res) => {
            try {

                const { email, password } = req.body
                const result = await userModel.findOne({ email: email })
                if (result != null) {
                    if (result.email == email && result.password == password) {
                        res.send(`login successfull <br> <h1> ${result} </h1>`)
                    } else {
                        res.send("Email or password Not corrct");
                    }
                } else {
                    res.send("You are not a registered user")
                }
            } catch (error) {
                console.log(error);
            }
        } */
        // using hash
    static verifyLogin = async(req, res) => {
        try {

            const { email, password } = req.body
            const result = await userModel.findOne({ email: email })
            if (result != null) {
                const isMatch = await bcrypt.compare(password, result.password);
                if (result.email == email && isMatch) {
                    res.send(`login successfull <br> <h1> ${result} </h1>`)
                } else {
                    res.send("Email or password Not corrct");
                }
            } else {
                res.send("You are not a registered user")
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default UserController;