function route(pathname, handle, response, productId) {
  if (typeof handle[pathname] == "function") {
    handle[pathname](response, productId);
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write("404 error Not found page");
    response.end();
  }
}

exports.route = route;
