var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'obamazondb'
});

connection.connect(function (err) {
    console.log(err);
    //createProduct();
    //console.log(connection.threadId);
    // showProducts();
    buyProduct();

    //createProduct();
})

function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log(res);
        res.forEach(function(row) {
            console.log(row.product_name);
        }, this);
        //???how to break up and better show results

    })
};

function buyProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([
                {
                    name: "itemChoice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which item would you like to buy?"
                }
            ]).then(function (answer) {
                console.log(answer.itemChoice);
            })
    })
};



function createProduct() {
    connection.query("INSERT INTO products SET ?",
        {
            product_name: 'shake weight',
            department_name: 'fitness',
            price: 20.15,
            stock_qty: 999
        },
        function (err, res) {
            if (err) throw err;
            //console.log(err);
            console.log(res);
        })
};


function createProductOld() {
    var query = connection.query(
        'insert into products set ?',
        {
            product_name: 'shake weight',
            department_name: 'fitness',
            price: 20.15,
            stop_qty: 999
        },
        function (err, res) {
            console.log(res.affectedRows + ' product inserted');
            console.log(err);
        }
    )
}

