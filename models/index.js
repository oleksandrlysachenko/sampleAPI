function ModelsInit() {
    let User = require('./user');
    let Post = require('./post');

    new User();
    new Post();
}

module.exports = ModelsInit();
