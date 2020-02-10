const fs = require("fs");
const inquirer = require("inquirer");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const path = require("path");

const team = [];

const teamFilePath = path.resolve(__dirname,"output", "team.html")

let htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Generator</title>
    <link href = "https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="header">
        <h1>My Team</h1>
    </div>
    <div class="card-container">
`

const endHTML = `
</body>
</html>
`
const addManager = () => {
    inquirer
        .prompt([
            {
               type: "input",
               message: "What is your name?",
               name: "name" 
            },
            {
                type: "number",
                message: "What is your id number?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your email?",
                name: "email"
            },
            {
                type: "number",
                message: "What is your office number?",
                name: "officeNumber"
            }
        ])
        .then(answers => {
            const managerName = answers.name;
            const managerID = answers.id;
            const managerEmail = answers.email;
            const managerOfficeNumber = answers.officeNumber;

            const manager = new Manager(managerName, managerID, managerEmail, managerOfficeNumber);

            team.push(manager);
            addTeamMember();
        });
}
const addEngineer = () => {
    inquirer
        .prompt([{
                type: "input",
                message: "What is your engineer's name?",
                name: "name"
            },
            {
                type: "number",
                message: "What is your engineer's id number?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your engineer's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What is your engineer's github name?",
                name: "githubName"
            }
        ])
        .then(answers => {
            const engineerName = answers.name;
            const engineerID = answers.id;
            const engineerEmail = answers.email;
            const engineerGithubName = answers.githubName;
            const engineer = new Engineer(engineerName, engineerID, engineerEmail, engineerGithubName);
            team.push(engineer);
            confirmAddMember();
        });
}
const addIntern = () => {
    inquirer
        .prompt([{
                type: "input",
                message: "What is your intern's name?",
                name: "name"
            },
            {
                type: "number",
                message: "What is your intern's id number?",
                name: "id"
            },
            {
                type: "input",
                message: "What is your intern's email?",
                name: "email"
            },
            {
                type: "input",
                message: "What school is your intern attending?",
                name: "school"
            }
        ])
        .then(answers => {
            const internName = answers.name;
            const internID = answers.id;
            const internEmail = answers.email;
            const internSchool = answers.school;
            const intern = new Intern(internName, internID, internEmail, internSchool);
            team.push(intern);
            confirmAddMember();
        });
}
const generateHTML = async () => {
    team.forEach(member => {
        if(member.role === "Manager"){
            const newCard = `
            <div class="card">
                <div class="top">
                    <h1>${ member.name }</h1>
                    <h2>${ member.role }</h2>
                </div>
                <div class="info-container">
                    <p class="info">ID: ${ member.id }</p> 
                    <p class="info">Email: ${ member.email }</p>
                    <p class="info">Office Number: ${ member.officeNumber }</p>       
                </div>
                </div>`
                htmlTemplate += newCard;
        }else if(member.role === "Engineer"){
            const newCard = `
            <div class="card">
                <div class="top">
                    <h1>${ member.name }</h1>
                    <h2>${ member.role }</h2>
                </div>
                <div class="info-container">
                    <p class="info">ID: ${ member.id }</p> 
                    <p class="info">Email: ${ member.email }</p>
                    <p class="info">Github Name: ${ member.githubName }</p>       
                </div>
                </div>`
            htmlTemplate += newCard;
        }
        else {
            const newCard = `
            <div class="card">
                <div class="top">
                    <h1>${ member.name }</h1>
                    <h2>${ member.role }</h2>
                </div>
                <div class="info-container">
                    <p class="info">ID: ${ member.id }</p> 
                    <p class="info">Email: ${ member.email }</p>
                    <p class="info">School: ${ member.school }</p>       
                </div>
                </div>`
            htmlTemplate += newCard;
        }
    });
    htmlTemplate += endHTML;
    fs.writeFile("output/index.html", htmlTemplate, err => {
        if(err) throw err;
        console.log("Done!");
    })
}
const confirmAddMember = () => {
    inquirer
        .prompt([
            {
                type: "confirm",
                message: "Would you like to add another team member?",
                name: "confirmAdd"
            }
        ])
        .then(answer => {
            if(answer.confirmAdd === true){
                addTeamMember();
            }
            else{
                // done
                console.log(team);
                generateHTML();
            }
        });
}
const addTeamMember = () => {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern"
                ],
                name: "memberType"
            }    
        ])
        .then(answers => {
            const newMemberType = answers.memberType;
            if(newMemberType === "Engineer"){
                addEngineer();
            }
            else{
                addIntern();
            }
        });
}
addManager();