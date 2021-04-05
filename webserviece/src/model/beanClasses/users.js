class User {
    constructor(obj) {
        this.userId = obj.userId;
        this.firstname = obj.firstname;
        this.lastname = obj.lastname;
        this.email = obj.email;
        this.password = obj.password;
    }
}

module.exports = User;