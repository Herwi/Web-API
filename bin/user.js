class User {
    constructor(id, name, surname, birthDate) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.birthDate = birthDate;
    }
    toString() {
        return "(" + this.id + ", " + this.name + ", " + this.surname + ", " + this.birthDate + ")";
    }
}

module.exports = User;