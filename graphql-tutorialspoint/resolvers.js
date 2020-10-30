const db = require('./db');
const Query = {
	greeting: () => {
		return 'hello from  TutorialsPoint !!!';
	},
	students: () => db.students.list(),
	colleges: () => db.colleges.list()
};

module.exports = { Query };
