class User {
    constructor(id, name, surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }
    toString() {
        return "(" + this.id + ", " + this.name + ", " + this.surname + ")";
    }
}

module.exports = User;