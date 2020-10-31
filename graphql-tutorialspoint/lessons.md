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
class Student{
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
	students: () => db.students.list().map(s=>new Student(s.id,s.firstName,s.lastName,s.collegeId)),
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
  StudentList:students{
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
    "StudentList": [
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


