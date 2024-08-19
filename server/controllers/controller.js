const { OAuth2Client } = require("google-auth-library");
const { comparesing } = require("../helpers/bcrypt");
const { jwebtoken } = require("../helpers/jwt");
const { User, Movie, Ticket } = require(`../models`);
const midtransClient = require('midtrans-client');
const { Op } = require("sequelize");
// const { Configuration, OpenAIApi } = require('openai');
const { where } = require("sequelize");
const fetch = require('node-fetch');
// const { Configuration, OpenAIApi } = require('openai');
// const OpenAi = require('openai')

// const configuration = new Configuration({
//     apiKey: process.env.OPEN_API_KEY,
// });
// const openai = new OpenAIApi({
//     apiKey: process.env.OPEN_API_KEY,
// });
// const openai = new OpenAi({
//     apiKey: process.env.OPEN_API_KEY,
// })
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);


class Controller {


    static async Register(req, res, next) {
        try {
            // const {username, email, password} = req.body

            let data = await User.create(req.body)
            res.status(201).json({ message: `data ${data.username} berhasil di tambahkan` })
        } catch (error) {
            next(error)
        }
    }
    static async Login(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(req.body, `--------------------------------------`);
            if (!email || !password) {
                throw { name: `user-error` }
            }

            let data = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!data) {
                throw { name: `email-password invalid` }
            }
            const compare = comparesing(password, data.password)
            if (!compare) {
                throw { name: `email-password invalid` }
            }
            const getToken = jwebtoken(data.email)
            res.status(200).json({ access_token: getToken })
        } catch (error) {
            next(error)
        }
    }

    static async getDataMovie(req, res, next) {
        try {
            const axios = require('axios');

            const options = {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/now_playing?append_to_response=videos&language=id-ID&page=1&region=ID',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjU5Mzk1MjE3NmVkNTkzNjgwNTJiZDc5OWM2NWRmNyIsIm5iZiI6MTcyMDY2NTE2OS4wODYzMiwic3ViIjoiNjY4ZDU2OTgxZDI3NDE4NTA2MDY0ZDdmIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.9-G1NaCWDQM3MEKt38YjBHtdOgUb4ZyqzCtQ-u-1dRI'
                }
            };

            const response = await axios.request(options)
            // .catch(function (error) {
            //     console.log(error);
            // });

            // console.log(response.data,`--------------`);
            res.status(200).json(response.data.results)
        } catch (error) {
            console.log(error, 'aaaa')
            // res.send(error)
            next(error)
        }
    }

    static async createTicket(req, res, next) {
        try {
            // console.log(req.params,`---------<`);
            // console.log(req.user.id, `----------------`);
            const { id } = req.params
            // console.log(id,`--------------------`);
            const { title, cover } = req.body
            // let dataId = req.body.id
            // console.log(req.user);
            // console.log(req.params, `------------`);

            // console.log(id,`111111111111111`);
            // console.log(dataMov, `----------`,req.params,`-------------<`);
            let check = await Ticket.findOne({
                where: {
                    [Op.and]: [
                        { movieId: id },
                        { UserId: req.user.id }
                    ]
                }
            })
            if (!check) {
                let data = await Ticket.create({
                    title: title,
                    cover: cover,
                    UserId: req.user.id,
                    movieId: id,
                    status: "pending"
                })

                res.status(200).json({ message: `${data.title} berhasil ditambahkan` })
            }
            // console.log(req.body);
            // console.log(check,`1--------------------`);
            // console.log(check.movieId,`aaaaaa`, req.body,`bbbbbbb`);
            if (check.movieId == req.body.id) {
                throw { name: `cannot-duplicate` }
            }

            // console.log(req.body, `aaaaaaaaaaa-----------`);
            let data = await Ticket.create({
                title: title,
                cover: cover,
                UserId: req.user.id,
                movieId: id,
                status: "pending"
            })

            res.status(200).json({ message: `${data.title} berhasil ditambahkan` })

            // console.log(check, title,`aaaaaaaaaa`);
            // if (!check && title === null) {
            // }

        } catch (error) {
            // console.log(error, `-----------------`);
            next(error)
        }
    }
    static async editPayment(req, res, next) {
        try {
            const { id } = req.params

            let data = Movie.findOne({
                where: { id: id }
            })
            if (data.status === "success") {
                throw ({ name: `payment-done` })
            }

            if (!pembayaranDone) {
                throw ({ name: `payment-error` })
            }
            Movie.update({ status: "success" }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({ message: `film ${data.title}berhasil dibayar` })
        } catch (error) {
            next(error)
        }
    }
    static async delMyTicket(req, res, next) {
        try {
            const { id } = req.params
            let data = Ticket.findOne({ where: { id: id } })
            if (data.status === "success") {
                throw ({ name: `cannot-del` })
            }
            await Ticket.destroy({
                where: { id: id }
            })
            res.status(200).json({ message: `film ${data.title}berhasil dihapus dari daftar anda` })
        } catch (error) {
            next(error)
        }
    }
    static async getMyTicket(req, res, next) {
        try {
            // console.log(req.user, `----------`);
            let data = await Ticket.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            console.log(data);
            res.status(200).json(data)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }
    static async loginGoogle(req, res, next) {
        try {
            if (!req.body.google_token) {
                throw { name: "googleToken-not" }
            }
            // console.log(req.body.google_token);
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            // console.log(payload.email, `--------------`);
            let user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            // console.log(user);
            if (!user) {
                let dataUser = payload.email.split(`@`)
                user = await User.create({
                    email: payload.email,
                    password: Date.now().toString() + Math.random().toString() + "-dummy",
                    username: dataUser[0]
                })
            }
            console.log('user', user.id)
            const access_token = jwebtoken(user.email)
            res.status(201).json({ access_token: access_token })
        } catch (error) {
            next(error)
        }
    }
    static async initiatePayment(req, res, next) {
        try {
            // console.log(`masokkkk11111111111`);
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-lEFDxEHKyL0KCw2pDErz4Df4',
            });
            // console.log(snap,`-----------------------------`);
            // console.log(req.user, `-----------------------------------------------<`);
            const order_id = Math.random().toString();
            let parameter = {
                //data detail order
                transaction_details: {
                    order_id: order_id,
                    gross_amount: 5000,
                },
                //data jenis pembayaran
                credit_card: {
                    secure: true,
                },
                //data detail customer

                customer_details: {
                    first_name: req.user.username,
                    email: req.user.email,
                    phone: "08111222333",
                },
            };

            const transaction = await snap.createTransaction(parameter);
            // console.log(transaction, `123-----------------------`);
            const transactionToken = transaction.token;

            res.status(200).json({ message: "Order created", transactionToken, order_id });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updatePayment(req, res, next) {
        try {
            // console.log(req.params.id);
            // const {order_id} = req.body
            // console.log("masuk?");
            // console.log(req.params,`--------------------------`);
            const { id } = req.body
            const ticket = await Ticket.findByPk(id);
            if (ticket.paymentStatus === "pending") throw { name: "AlreadyPaid" };
            // console.log(req.body, "/////////////////////////////////////////");

            await Ticket.update(
                { status: "success" },
                {
                    where: {
                        id: ticket.id,
                    },
                }
            );

            const data = await Ticket.findByPk(req.params.id)

            // console.log(data, "<<<<<<<<<<<<<<<<DATA");

            const user = await User.findOne({ where: { id: data.UserId } });
            if (!user) throw { name: "InvalidEmail" };
            // console.log(user);

            res.status(201).json({ message: "Pembayaran berhasil" });
        } catch (error) {
            next(error)
        }
    }
    static async OpenAi(req, res, next) {
        try {
            // const configuration = new Configuration({
            //     apiKey: process.env.OPEN_API_KEY,
            // });
            // const openai = new OpenAIApi(configuration);


            // const { message } = req.body;
            // const response = await openai.createChatCompletion({
            //     model: 'gpt-4',
            //     messages: [{ role: 'user', content: message }],
            // });

            // const reply = response.data.choices[0].message.content;
            // res.status(200).json({ reply });


            // const { message } = req.body;
            // const response = await openai.createChatCompletion({
            //     model: 'gpt-4',
            //     messages: [{ role: 'user', content: message }],
            // });

            // const reply = response.data.choices[0].message.content;
            // res.status(200).json({ reply });
            const { history, message } = req.body;
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            const chat = model.startChat({
                history: req.body.history,
            });
            const msg = req.body.message;

            const result = await chat.sendMessage(msg);
            const response = await result.response;
            const text = response.text();
            res.send(text);
        } catch (error) {
            console.log(error, `--------->`);
            next(error)
        }
    }


}
module.exports = Controller