const path = require("path");
const fs = require("fs");

const htmlFolderPath = path.resolve(__dirname, "../templates");

const html =[];
const render = employees => {
    html.push(employees.filter(employee => employee.getRole() === "Engineer")
.map(engineer => renderEngineer(engineer))
)

html.push(employees.filter(employee => employee.getRole() === "Manager")
.map(manager => renderManager(manager))
)

html.push(employees.filter(employee => employee.getRole() === "Intern")
.map(intern => renderIntern(intern))
)
    return replaceTeam(html.join(""))
}

function renderManager(manager){
    const managerHTML = fs.readFileSync(path.resolve(htmlFolderPath,"manager.html"), "utf8");
    managerHTML = replacePlaceHolder(managerHTML, "name", manager.getName())
    managerHTML = replacePlaceHolder(managerHTML, "role", manager.getRole())
    managerHTML = replacePlaceHolder(managerHTML, "id", manager.getId())
    managerHTML = replacePlaceHolder(managerHTML, "email", manager.getEmail())
    managerHTML = replacePlaceHolder(managerHTML, "officeNumber", manager.getOfficeNumber())

    return managerHTML;
}

function renderEngineer(engineer){
    const engineerHTML = fs.readFileSync(path.resolve(htmlFolderPath,"engineer.html"), "utf8");
    engineerHTML = replacePlaceHolder(engineerHTML, "name", engineer.getName())
    engineerHTML = replacePlaceHolder(engineerHTML, "role", engineer.getRole())
    engineerHTML = replacePlaceHolder(engineerHTML, "id", engineer.getId())
    engineerHTML = replacePlaceHolder(engineerHTML, "email", engineer.getEmail())
    engineerHTML = replacePlaceHolder(engineerHTML, "githubName", engineer.getGithub())

    return engineerHTML;
}


function renderIntern(intern){
    var internHTML = fs.readFileSync(path.resolve(htmlFolderPath,"intern.html"), "utf8");
    internHTML = replacePlaceHolder(internHTML, "name", intern.getName())
    internHTML = replacePlaceHolder(internHTML, "role", intern.getRole())
    internHTML = replacePlaceHolder(internHTML, "id", intern.getId())
    internHTML = replacePlaceHolder(internHTML, "email", intern.getEmail())
    internHTML = replacePlaceHolder(internHTML, "school", intern.getSchool())

    return internHTML;
}

function replacePlaceHolder(htmlTemplate, placeholder, value){
    const regExp = new RegExp("{{" +placeholder + "}}", "gm");
    return htmlTemplate.replace(regExp, value);
}
function replaceTeam(html) {
    const mainHTML = fs.readFileSync(path.resolve(htmlFolderPath,"main.html"), "utf8");
    return replacePlaceHolder(mainHTML, "team", html)
}

module.exports = render;