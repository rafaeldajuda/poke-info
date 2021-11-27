const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

function http(options) {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url, false);
    xhr.timeout = options.timeout;

    for(let item in options.headers) {
        xhr.setRequestHeader(item, options.headers[item])
    }

    let body = options.body == undefined ? null: options.body;

    xhr.send(body);
    resposta = {};
    resposta.body = xhr.responseText;
    resposta.responseCode = xhr.status;
    resposta.headers = xhr.getResponseHeader;
    return resposta;
}

module.exports = http;