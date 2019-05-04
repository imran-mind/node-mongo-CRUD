const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./mongo');
const UsersModel = require('./models/user.model');
const ExpenseModel = require('./models/expsens.model');
var cors = require('cors');
const asyncLib = require('async');
let _ = require('lodash');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());

app.post('/signup', async (req, res) => {
    console.log(req.body)
    let userInfo = new UsersModel(req.body);
    const data = await UsersModel.find({
        email: req.body.email
    });
    console.log(data)
    if (data && data.length) {
        return res.status(200).json({
            message: " user already exist ",
            data: data
        });
    }
    try {
        userInfo = await userInfo.save();
        return res.status(201).json({
            message: " user created ",
            data: userInfo
        });
    } catch (err) {
        return res.status(500).jsonp({
            error: err
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const data = await UsersModel.find({
            username: req.body.username,
            password: req.body.password
        });
        if (data && data.length) {
            return res.status(200).json({
                message: 'Login success'
            })
        } else {
            return res.status(400).json({
                message: 'Login Failed'
            })
        }
    } catch (err) {
        return res.status(500).jsonp({
            error: err
        });
    }
});

app.get('/users', async (req, res) => {
    try {
        const data = await UsersModel.find({}).populate("expenses");
        if (data) {
            return res.status(200).json({
                message: 'success',
                data
            })
        } else {
            return res.status(400).json({
                message: 'Failed'
            })
        }
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
});

app.get('/users/:email', async (req, res) => {
    try {
        const data = await UsersModel.find({
            email: req.params.email
        }).populate("expenses");
        if (data) {
            return res.status(200).json({
                message: 'success',
                data
            })
        } else {
            return res.status(400).json({
                message: 'Failed'
            })
        }
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
});

app.put('/expenses', async (req, res) => {
    try {
        let data = await UsersModel.findOne({
            email: req.body.email
        });
        let expense = new ExpenseModel(req.body.expense)
        let expenseInfo = await expense.save();
        data.expenses.push(expenseInfo._id);

        let updateExp = await UsersModel.updateOne({
            email: req.body.email
        }, data);
        if (updateExp) {
            return res.status(200).json({
                message: 'success',
                updateExp
            })
        } else {
            return res.status(400).json({
                message: 'Failed'
            })
        }
    } catch (err) {
        return res.status(500).json({
            error: err
        });
    }
});


app.put('/approve', async (req, res) => {
    try {
        let totalAmt = 0;
        let data = await UsersModel.find().populate("expenses");;
        let numOfEmps = data.length - 1;
        console.log('data => ', data)
        await req.body.forEach((element) => {
            let sumAmount = _.sumBy(element.expenses, function (o) {
                return parseInt(o.amount);
            });
            totalAmt += sumAmount;
        });

        let settlementAmount = (totalAmt / numOfEmps);
        await data.forEach(async (element) => {
            element.dueAmount = 0;
            element.settlementAmount = 0;
            if (element.role !== 'ADMIN') {
                let empTotalAmount = _.sumBy(element.expenses, function (o) {
                    return parseInt(o.amount);
                });
                if (empTotalAmount > settlementAmount) {
                    element.dueAmount = empTotalAmount - settlementAmount;
                    element.settlementAmount = 0;
                } else if (settlementAmount === empTotalAmount) {
                    element.settlementAmount = 0;
                } else {
                    element.settlementAmount = settlementAmount;
                }
                console.log(element.email);
                console.log('Dena he', element.settlementAmount);
                console.log('Lena he ', element.dueAmount);
                await UsersModel.updateOne({
                    email: element.email
                }, element);
            }
        });
        return res.status(200).json({
            message: 'approved success'
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error: err
        });
    }
});


app.listen(5000, () => {
    console.log("server is up on 5000");
});