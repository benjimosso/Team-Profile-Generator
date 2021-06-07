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


function EmployeeQuestions() {
    inquirer.prompt([{
            type: 'input',
            message: 'Please enter the name of the employee you want to add: ',
            name: 'empname',
        },
        {
            type: 'input',
            message: 'Please enter their ID number: ',
            name: 'idN'
        },
        {
            type: 'input',
            message: 'Please enter their email address: ',
            name: 'emailadd'
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
            if (answers.Addanother) {
                EmployeeQuestions()
            } else {
                BuildSite();
            }
        })
    }

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
    function BuildSite() {
        if (!fs.existsSync(DIST)) {
            fs.mkdirSync(DIST)
        }
        console.log('Site Rendered')
        fs.writeFileSync(Outpath, render(EmplArr), 'utf-8')
    }
};



EmployeeQuestions()