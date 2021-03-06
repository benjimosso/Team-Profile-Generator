const { expect } = require('@jest/globals');
const Intern = require('../lib/Intern');

test('Create object for intern', () => {
    const manager = new Intern('Columbia')
})

test('Check getSchool', () => {
    const test = 'Yale'
    const employee = new Intern('daniel', 15, 'something@gmail.com', 'Yale')
    expect(employee.getSchool()).toBe(test)
})

test('check Github Constructor', () => {
    const test = 'Columbia';
    const employee = new Intern('daniel', 23, 'algo@gmail.com', test)
    expect(employee.school).toBe(test)
});

test('check Role Function', () => {
    const test = 'Intern';
    const employee = new Intern('daniel', 15, 'something@gmail.com', '(805)-963-4569')
    expect(employee.getRole()).toBe(test)
})