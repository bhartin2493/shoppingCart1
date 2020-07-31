const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var _mapValues = require("lodash/mapValues");
var _values = require("lodash/values");
var _groupBy = require("lodash/groupBy");

options = {};
const app = express();
app.use(cors(options));

//connection

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "my_DB",
});

connection.connect((error) => {
  if (error) console.log("Error:", error);
  console.log("Connected!!!");
});

//Get all products
app.get("/api/v1/products", (req, res) => {
  let sql_query = "SELECT * FROM Products";

  let query = connection.query(sql_query, (error, response) => {
    if (error) throw error;
    res.status(200).send({ data: response });
  });
});

//to get category and subcategory
app.get("/api/v1/product_details", (req, res) => {
  let sql_query =
    "SELECT Category.category_name, SubCategory.sub_category_name FROM Category INNER JOIN SubCategory ON Category.category_name = SubCategory.category_name ";
  let query = connection.query(sql_query, (error, response) => {
    if (error) throw error;
    var categories = _mapValues(_groupBy(response, "category_name"));

    res.status(200).send({ data: categories });
  });
});

// to get products based on selected category and subcategory
app.get("/api/v1/products_by_category/", (req, res) => {
  let sql_query =
    "SELECT a.product_id, a.Product_name, a.image_name, a.price, b.category_name, b.category_id, c.sub_category_name, c.sub_category_id FROM Products a INNER JOIN Category b ON a.category_name = b.category_name INNER JOIN SubCategory c ON a.sub_category_name = c.sub_category_name WHERE b.category_name ='" +
    req.query.category_name +
    "'" +
    " AND c.sub_category_name='" +
    req.query.sub_category_name +
    "'";

  let query = connection.query(sql_query, (error, response) => {
    if (error) throw error;
    res.status(200).send({ data: response });
  });
});

app.listen(3000, () => {
  console.log("Services running on port 3000..");
});
