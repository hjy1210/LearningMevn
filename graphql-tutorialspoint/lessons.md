# GraphQL
跟隨 [GraphQL course at tutorialspoint](https://www.tutorialspoint.com/graphql/index.htm) 的腳步學習 GraphQL。
## GraphQL - Environment Setup

## GraphQL - Query (include: Nested, Variables)

### Schema Section

```
enum ColorType {
   RED
   BLUE
   GREEN
}
type Query {
   greeting:String
   students:[Student]
   students1:[Student]
   students2:[Student]
   colleges:[College]
   studentById(id:ID!):Student
   sayHello(name:String!):String
   setFavouriteColor(color:ColorType):String
}
type Student {
   id:ID!
   firstName:String
   lastName:String
   email:String
   password:String
   college:College
}
type College {
   id:ID!
   name:String
   location:String
   rating:Float
}
```

### Resolver Section

```
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

module.exports = { Query };

```

### Query Section
```
query myquery($myname_Variable:String!, $color_variable:ColorType)
{
  S: students{
    firstName
  }
  S1:students1{
    id,
    firstName,
    college{
      id,
      name,
      location
    }
  },
  S2:students2{
    id,
    firstName,
    college{
      id,
      name,
      location
    }
  },
  Hello:sayHello(name:"Yang HonJang"),
  H:sayHello(name:$myname_Variable)
  setFavouriteColor(color:$color_variable)
}
```

### Variables Section

```
{
   "color_variable":"RED",
   "myname_Variable": "Mohtashim"
}
```

### Result Section

```
{
  "data": {
    "S": [
      {
        "firstName": "Mohtashim"
      },
      {
        "firstName": "Kannan"
      },
      {
        "firstName": "Kiran"
      }
    ],
    "S1": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "id": "col-102",
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      }
    ],
    "S2": [
      {
        "id": "S1001",
        "firstName": "Mohtashim",
        "college": {
          "id": "col-102",
          "name": "CUSAT",
          "location": "Kerala"
        }
      },
      {
        "id": "S1002",
        "firstName": "Kannan",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      },
      {
        "id": "S1003",
        "firstName": "Kiran",
        "college": {
          "id": "col-101",
          "name": "AMU",
          "location": "Uttar Pradesh"
        }
      }
    ],
    "Hello": "Hello Yang HonJang",
    "H": "Hello Mohtashim",
    "setFavouriteColor": "Your Fav Color is :RED"
  }
}
```

## Mutation
### Schema Section
```
...
type Mutation {
   createStudent(collegeId:ID,firstName:String,lastName:String):String
   addStudent_returns_object(collegeId:ID,firstName:String,lastName:String):Student
}
...
```
### Resolver Section
```
...
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
    }
}
const Student = {
    college:(root) => {
       return db.colleges.get(root.collegeId);
    }
 }
module.exports = { Query, Student, Mutation };
```

### Mutation Section
```
mutation {
   addStudent_returns_object(collegeId:"col-101",firstName:"Susan",lastName:"George") {
      id
      firstName
      college{
         id
         name
      }
   }
}
```
### Result Section
```
{
  "data": {
    "addStudent_returns_object": {
      "id": "rJU-2ncdw",
      "firstName": "Susan",
      "college": {
        "id": "col-101",
        "name": "AMU"
      }
    }
  }
}
```
