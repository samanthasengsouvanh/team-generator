const Employee = require("./employee");

class Engineer extends Employee{
    constructor(name, id, email, githubName){
        super(name, id, email, githubName);
        this.githubName = githubName;
        this.role = "Engineer";
    }
    getGithub(){
        return this.githubName;
    }
    getRole(){
        return this.role;
    }
}
module.exports = Engineer;