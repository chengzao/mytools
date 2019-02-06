import P from "./person";

let person = new P("Ram", "Kulkarni");

document.getElementById("nameSpan").innerHTML = person.getFirstName() + " " + person.getLastName();