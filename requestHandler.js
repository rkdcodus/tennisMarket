// fs로 html을 가져올 수 있음.
const fs = require("fs");
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderList_view = fs.readFileSync("./orderList.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

// router가 경로를 알려주면 요청 처리.
function main(response) {
  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(main_view);
  response.end();
}

function orderList(response) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderList;", function (err, rows) {
    response.write(orderList_view);
    rows.forEach((row) => {
      console.log(row);
      response.write("<tr>" + "<td>" + row.id + "</td>" + "<td>" + row.date + "</td>" + "</tr>");
    });

    response.write("</table>");
    response.end();
  });
}

function order(response, productId) {
  response.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    `INSERT INTO orderList VALUES ('${productId}', '${new Date().toLocaleDateString()}');`,
    function (err, rows) {
      console.log(rows);
    }
  );
  response.end();
}

function redRacket(response) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blueRacket(response) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function blackRacket(response) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write(data);
    response.end();
  });
}

function style(response) {
  fs.readFile("./css/style.css", function (err, data) {
    response.writeHead(200, { "Content-Type": "text/css" });
    response.write(data);
    response.end();
  });
}

let handle = {
  "/": main,
  "/order": order,
  "/orderList": orderList,
  /** image directory */
  "/img/redRacket.png": redRacket,
  "/img/blueRacket.png": blueRacket,
  "/img/blackRacket.png": blackRacket,
  "/css/style.css": style,
};

exports.handle = handle;
