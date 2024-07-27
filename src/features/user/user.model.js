let user = [];

export default class userModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static addUser(name, email, password) {
    let userData = new userModel(user.length + 1, name, email, password);
    user.push(userData);
    console.log("Sign up sucessfull");
    console.log(user);
  }

  static validUser(email, password) {
    const result = user.find(
      (u) => u.email === email && u.password === password
    );
    return result;
  }
}

user = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: "alice1234",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    password: "bob2024",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    password: "carol987",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    password: "david2024!",
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva.brown@example.com",
    password: "eva!2024",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    password: "frankm123",
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@example.com",
    password: "grace@2024",
  },
  {
    id: 8,
    name: "Henry Martinez",
    email: "henry.martinez@example.com",
    password: "henry#2024",
  },
  {
    id: 9,
    name: "Ivy Rodriguez",
    email: "ivy.rodriguez@example.com",
    password: "ivy2024*",
  },
  {
    id: 10,
    name: "Jack Taylor",
    email: "jack.taylor@example.com",
    password: "jack!2024",
  },
];
