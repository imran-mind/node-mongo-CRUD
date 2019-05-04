let _ = require('lodash');

let data = [{
        "expenses": [],
        "dueAmount": 0,
        "settlementAmount": 0,
        "isAdminApproved": false,
        "createdAt": 1556963378107,
        "updatedAt": 1556963378110,
        "_id": "5ccd6058f36278409e96782c",
        "email": "admin@gmail.com",
        "password": "123",
        "role": "ADMIN",
        "__v": 0
    },
    {
        "expenses": [{
            "createdAt": 1556966298968,
            "updatedAt": 1556966298968,
            "_id": "5ccd6e079638fb4e5e82edec",
            "item": "Dinner",
            "amount": "700",
            "date": 1556963987,
            "__v": 0
        }],
        "dueAmount": 0,
        "settlementAmount": 0,
        "isAdminApproved": false,
        "createdAt": 1556963378107,
        "updatedAt": 1556963378110,
        "_id": "5ccd6069f36278409e96782d",
        "email": "amir@gmail.com",
        "password": "123",
        "role": "EMP",
        "__v": 0
    },
    {
        "expenses": [],
        "dueAmount": 0,
        "settlementAmount": 0,
        "isAdminApproved": false,
        "createdAt": 1556963378107,
        "updatedAt": 1556963378110,
        "_id": "5ccd606ef36278409e96782e",
        "email": "inam@gmail.com",
        "password": "123",
        "role": "EMP",
        "__v": 0
    },
    {
        "expenses": [],
        "dueAmount": 0,
        "settlementAmount": 0,
        "isAdminApproved": false,
        "createdAt": 1556963378107,
        "updatedAt": 1556963378110,
        "_id": "5ccd6073f36278409e96782f",
        "email": "prakash@gmail.com",
        "password": "123",
        "role": "EMP",
        "__v": 0
    },
    {
        "expenses": [],
        "dueAmount": 0,
        "settlementAmount": 0,
        "isAdminApproved": false,
        "createdAt": 1556963378107,
        "updatedAt": 1556963378110,
        "_id": "5ccd6077f36278409e967830",
        "email": "geet@gmail.com",
        "password": "123",
        "role": "EMP",
        "__v": 0
    },
    {
        "expenses": [{
                "createdAt": 1556965682680,
                "updatedAt": 1556965682680,
                "_id": "5ccd696cb1a5a44bf708cb3f",
                "item": "Lunch",
                "amount": "500",
                "date": 1556963987,
                "__v": 0
            },
            {
                "createdAt": 1556965682680,
                "updatedAt": 1556965682680,
                "_id": "5ccd697bb1a5a44bf708cb40",
                "item": "Bus Fare",
                "amount": "300",
                "date": 1556963987,
                "__v": 0
            }
        ],
        "dueAmount": 0,
        "settlementAmount": 0,
        "isAdminApproved": false,
        "createdAt": 1556963247398,
        "updatedAt": 1556963247400,
        "_id": "5ccd5fb76f2afe401a3181c2",
        "email": "imran@gmail.com",
        "password": "123",
        "role": "EMP",
        "__v": 0
    }
];

let totalAmt = 0;
let numOfEmps = 5;
data.forEach((element) => {
    let sumAmount = _.sumBy(element.expenses, function (o) {
        return parseInt(o.amount);
    });
    totalAmt += sumAmount;
});

let settlementAmount = totalAmt / numOfEmps;
data.forEach((element) => {
    if (element.role !== 'ADMIN') {
        let empTotalAmount = _.sumBy(element.expenses, function (o) {
            return parseInt(o.amount);
        });
        if (empTotalAmount > settlementAmount) {
            element.dueAmount = empTotalAmount - settlementAmount;
        }
        element.settlementAmount = settlementAmount;
        console.log(element.email);
        console.log('has to paid ',element.settlementAmount);
        console.log('has to taken ',element.dueAmount);
    }
});