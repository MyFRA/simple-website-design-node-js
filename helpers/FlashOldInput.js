const FlashOldInput = function(req) {
    const oldInput = req.body;

    for (const key in oldInput) {
        req.flash(`old${key}`, oldInput[key]);
    }
}

module.exports = FlashOldInput;