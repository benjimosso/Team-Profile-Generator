// Dependencies
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const jest = require('jest');

// Constructors

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Employee = require('./lib/Employee');
const Intern = require('./lib/Intern');
const { buildFailureTestResult } = require('@jest/test-result');
const { findSourceMap } = require('module');

// Path
const DIST = path.resolve(__dirname, 'dist');
const Outpath = path.join(DIST, 'index.html');

const render = require('./src/template');

const EmplArr = [];

// function that starts the application
function EmployeeQuestions() {
    inquirer.prompt([{
            type: 'input',
            message: 'Please enter the name of the employee you want to add: ',
            name: 'empname',
        },
        {
            type: 'input',
            message: 'Please enter their ID number: ',
            name: 'idN',
            validate: function IdValidation(idN) {
                if (typeof idN == 'string') {
                    return true
                } else
                    return 'Id needs to be a number'
            }
        },
        {
            type: 'input',
            message: 'Please enter their email address: ',
            name: 'emailadd',
            validate: function ValidateEmail(emailadd) {
                // Method for email validation, a word needs a @ after it, otherwise won't allow the input. 
                return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(emailadd);
            }
        },
        {
            type: 'list',
            message: 'What is the employee role?: ',
            name: 'role',
            choices: ['Manager', 'Engineer', 'Intern']
        }
    ]).then(function(answers) {
        if (answers.role === 'Manager') {
            ManQuestions(answers);
        } else if (answers.role === 'Engineer') {
            EngQuestions(answers)
        } else IntQuestions(answers)
    });

    // if Manager is selected this function fires
    function ManQuestions(employeeAnswers) {
        inquirer.prompt([{
                type: 'input',
                message: 'What is the Manager office number?: ',
                name: 'Officenum'
            },
            {
                type: 'confirm',
                message: 'Do you want to add another Employee?',
                name: 'Addanother'
            }
        ]).then(function(answers) {
            const newManager = new Manager(employeeAnswers.empname, employeeAnswers.idN, employeeAnswers.emailadd, answers.Officenum)
            EmplArr.push(newManager);
            // if user decides to add another employee employeequiestions is called again, otherwise we build the site.
            if (answers.Addanother) {
                EmployeeQuestions()
            } else {
                BuildSite();
            }
        })
    }
    // if Engineer is selected tihs function fires
    function EngQuestions(employeeAnswers) {
        inquirer.prompt([{
                type: 'input',
                message: 'What is the Engineer GitHub name?: ',
                name: 'GithubName'
            },
            {
                type: 'confirm',
                message: 'Do you want to add another Employee?',
                name: 'Addanother'
            }
        ]).then(function(answers) {
            const newEngineer = new Engineer(employeeAnswers.empname, employeeAnswers.idN, employeeAnswers.emailadd, answers.GithubName)
            EmplArr.push(newEngineer);
            if (answers.Addanother) {
                EmployeeQuestions()
            } else {
                BuildSite();
            }
        })
    }

    // if intern is selected this function fires
    function IntQuestions(employeeAnswers) {
        inquirer.prompt([{
                type: 'input',
                message: 'What is the Intern School name?: ',
                name: 'SchoolName'
            },
            {
                type: 'confirm',
                message: 'Do you want to add another Employee?',
                name: 'Addanother'
            }
        ]).then(function(answers) {
            const newIntern = new Intern(employeeAnswers.empname, employeeAnswers.idN, employeeAnswers.emailadd, answers.SchoolName)
            EmplArr.push(newIntern);
            if (answers.Addanother) {
                EmployeeQuestions()
            } else {
                BuildSite();
            }
        })
    }
    // console.log(EmplArr)
    // creates html file and folder path in case is not created.
    function BuildSite() {
        if (!fs.existsSync(DIST)) {
            fs.mkdirSync(DIST)
        }
        console.log('Site Rendered')
            // here we are pushing the information to the html file.
        fs.writeFileSync(Outpath, render(EmplArr), 'utf-8')
    }
};



EmployeeQuestions()