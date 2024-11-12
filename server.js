// http 모듈 불러와 서버를 생성했다.
// 서버 구동은 node server.js
let http = require("http");

// node.js의 url 모듈 불러오기
let url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    let pathname = url.parse(request.url).pathname; // url의 pathname 읽음.

    if (pathname === "/favicon.ico") {
      response.writeHead(200, { "Content-Type": "image/x-icon" });
      return response.end();
    }

    let queryData = url.parse(request.url, true).query;

    route(pathname, handle, response, queryData.productId);
  }

  http.createServer(onRequest).listen(8888);
}

// 밖에서 구동시킬 때 실행. 자유롭게 구동.
exports.start = start;
