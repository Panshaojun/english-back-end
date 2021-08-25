const responseFactory = (data, code = 0, msg = '') => {
    return {
        data,
        code,
        msg
    }
}

const Response = {
    ok(data) {
        return responseFactory(data)
    },
    err(code, msg = '') {
        return responseFactory(null, code, msg);
    }
}

module.exports = Response;