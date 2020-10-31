const db = require('./db');
class Stud{
    constructor(id, firstName, lastName, collegeId){
        this.id=id
        this.firstName=firstName
        this.lastName=lastName
        this.collegeId=collegeId
    }
    college(){return db.colleges.get(this.collegeId)}
}
const Query = {
	greeting: () => {
		return 'hello from  TutorialsPoint !!!';
	},
    students: () => db.students.list(),
    // ///// students1, students2 are NOT good solution when const Student below exists
    students1: () => db.students.list().map(s=>new Stud(s.id,s.firstName,s.lastName,s.collegeId)),
    students2: () => db.students.list().map(s=>{return {id:s.id,firstName:s.firstName,college:db.colleges.get(s.collegeId)}}),
    colleges: () => db.colleges.list(),
    //resolver function for studentbyId
    studentById:(root,args,context,info) => {
        //args will contain parameter passed in query
        return db.students.get(args.id);
    },
    sayHello(_, args){
        return `Hello ${args.name}`
    },
    setFavouriteColor:(root,args) => {
        return  "Your Fav Color is :"+args.color;
     }
};
const Mutation = {
    createStudent:(root,args,context,info) => {
        return db.students.create({
            collegeId:args.collegeId,
            firstName:args.firstName,
            lastName:args.lastName})
    },
    addStudent_returns_object:(root,args,context,info) => {
        const id = db.students.create({
           collegeId:args.collegeId,
           firstName:args.firstName,
           lastName:args.lastName
        })
        return db.students.get(id)
    },
    signUp:(root,args,context,info) => {

        const {email,firstName,password} = args.input;
  
        const emailExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        const isValidEmail =  emailExpression.test(String(email).toLowerCase())
        if(!isValidEmail)
        throw new Error("email not in proper format")
  
        if(firstName.length > 15)
        throw new Error("firstName should be less than 15 characters")
  
        if(password.length < 8 )
        throw new Error("password should be minimum 8 characters")
        
        return "success";
     }
  
}
const Student = {
    college:(root) => {
       return db.colleges.get(root.collegeId);
    }
 }
 

module.exports = { Query, Student, Mutation };
