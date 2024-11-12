// server.js 모듈화
let server = require("./server");
let router = require("./router");
let requestHandler = require("./requestHandler");

const mariadb = require("./database/connect/mariadb");
mariadb.connect(); // mariadb 찐 연결

server.start(router.route, requestHandler.handle);
