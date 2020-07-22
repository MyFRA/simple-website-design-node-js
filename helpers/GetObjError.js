function GetObjError(req, input, message) {
    this.oldInput = req.body;
    this.result = {
        input: input,
        message: message,
    }
}

module.exports = GetObjError;