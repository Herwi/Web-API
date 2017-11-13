class User {
    constructor(id, name, surname, birthDate, password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
        this.password = password;
    }
    toString() {
        return "(" + this.id + ", " + this.name + ", " + this.surname + ", " + this.birthDate + ")";
    }
}

module.exports = User;