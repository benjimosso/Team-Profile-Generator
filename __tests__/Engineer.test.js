const Engineer = require('../lib/Engineer');

test('Create object for intern', () => {
    const manager = new Engineer('benjimosso')
})

test('Check getGitHub', () => {
    const test = 'benjimosso'
    const employee = new Engineer('daniel', 15, 'something@gmail.com', 'benjimosso')
    expect(employee.getGitHub()).toBe(test)
})

test('check Github Constructor', () => {
    const test = 'benjimosso';
    const employee = new Engineer('daniel', 23, 'algo@gmail.com', test)
    expect(employee.github).toBe(test)
});

test('check Role Function', () => {
    const test = 'Engineer';
    const engineer = new Engineer('daniel', 15, 'something@gmail.com', 'benjimosso')
    expect(engineer.getRole()).toBe(test)
})