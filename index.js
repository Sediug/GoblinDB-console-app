const inquirer = require('inquirer');

inquirer.registerPrompt('command', require('inquirer-command-prompt'));

function runGoblinPrompt() {
	inquirer.prompt([
		{
			type: 'command',
			name: 'goblin',
			message: '>',
			validate: val => {
				return val
					? true
					: 'I you don\'t know the available commands, type help for help'
			},
			autoCompletion: ['get', 'push', 'delete', 'truncate', 'help'],
			context: 0,
			short: false
		}
	]).then(answers => {
		console.log(answers);
		
		if (answers.cmd !== 'quit' && answers.cms !== 'exit') {
			return runGoblinPrompt()
		}
	}).catch(err => {
		console.error(err.stack)
	});
}
  
runGoblinPrompt()