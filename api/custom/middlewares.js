const listContentType = ['application/json']

function validateContentType(req, res, next) {
    const contentType = req.headers['content-type'];

    if (listContentType.indexOf(contentType) === -1 && (req.method === "POST" || req.method === "PUT")) {
        return res.status(400).json({ msg: 'invalid content-type' });
    }

    next();
}

function headerAccept(req, res, next){
    const accept = req.headers['accept'];

    if(accept === "text/xml" || accept === "application/xml"){
        res.setHeader('Content-Type', accept);
    }else{
        res.setHeader('Content-Type', 'application/json');
    }

    next();
}

module.exports = {
    validateContentType: validateContentType,
    headerAccept: headerAccept
}