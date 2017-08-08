var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'obamazondb'
});



function showProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        //console.log(res);
        console.log("Here is what's for sale");
        res.forEach(function (row) {
            console.log(`ID number: ${row.item_id}, ${row.product_name} for $${row.price}`);
        }, this);
        buyProduct();


    })

};

function buyProduct() {
    inquirer
        .prompt([
            {
                name: "itemChoice",
                type: "input",
                message: "Please enter the ID number of the item you want to buy",
                filter: Number
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter how many you would like",
                filter: Number
            }
        ]).then(function (answer) {
            var item = answer.itemChoice;
            var quantity = answer.quantity;

            connection.query(
                "SELECT * FROM products WHERE ?",
                [
                    {
                        item_id: item
                    }
                ],
                function (err, res) {
                    if (err) { throw err };

                    if (res.length === 0) {
                        console.log("Error: Invalid ID number, select a valid item ID");
                        showProducts();
                    } else {
                        var selectedProduct = res[0];

                        if (quantity <= selectedProduct.stock_qty) {
                            console.log("Placing order now");

                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_qty: selectedProduct.stock_qty - 1
                                    },
                                    {
                                        item_id: selectedProduct.item_id
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log(`Your total is $${selectedProduct.price * quantity}`)
                                }
                            )
                        } else {
                            console.log("We don't have that much in our inventory, please order a smaller quantity");
                            showProducts();
                        }
                    }
                });
        })
};


showProducts();