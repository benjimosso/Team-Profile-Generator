const { test, expect } = require('@jest/globals');
const Manager = require('../lib/Manager');

test('Create object for manager', () => {
    const manager = new Manager('555336')
})

test('Check getOfficeNum', () => {
    const test = '56444'
    const employee = new Manager('daniel', 15, 'something@gmail.com', '56444')
    expect(employee.getOfficeNum()).toBe(test)
})

test('check OficeNumber Constructor', () => {
    const test = '(805)-963-4569';
    const employee = new Manager('daniel', 23, 'algo@gmail.com', test)
    expect(employee.officeNumber).toBe(test)
});

test('check Role Function', () => {
    const test = 'Manager';
    const employee = new Manager('daniel', 15, 'something@gmail.com', '(805)-963-4569')
    expect(employee.getRole()).toBe(test)
})