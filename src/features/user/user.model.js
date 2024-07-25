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
    name: "adarsh",
    email: "adarshsingh705@gmail.com",
    password: "adarsh98",
  },
];
