const readline = require('node:readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

class Contact {
    constructor(name, phoneNumber, email) {
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class ContactManager {
    constructor() {
        this.contacts = [];
    }
    add() {
        var name, phoneNumber, email;
        readline.question("Enter contact name: ", nameAnswer => {
            name = nameAnswer;
            readline.question("Enter contact number: ", phoneAnswer => {
                phoneNumber = phoneAnswer;
                readline.question("Enter contact email: ", emailAnswer => {
                    email = emailAnswer;
                    var contact = new Contact(name, phoneNumber, email);
                    this.contacts.push(contact);
                    takeInput();
                });
            });
        });
    }
    remove() {
        var contactName;
        readline.question("Enter the name of the contact you want to remove ", answer => {
            contactName = answer;
            this.contacts = this.contacts.filter(element => element.name !== contactName);
            takeInput();
        });

    }
    viewAll() {
        if (this.contacts.length != 0) {
            console.log(this.contacts);
        }
        else {
            console.log("You have no contacts")
        }
        takeInput();

    }
    edit(){
        var contactName;
        readline.question("Enter the name of the contact you want to edit ", ans =>{
            contactName=ans;
            var index = this.contacts.findIndex(element => element.name == contactName);
            readline.question("What would you like to edit? (name, number, email) ", ans=> {
                switch (ans.toLowerCase()) {
                    case "name":
                        readline.question("Enter the new name: ",newName =>{
                            this.contacts[index].name = newName;
                            takeInput();
                        })
                        break;
                    case "number":
                        readline.question("Enter the new number: ", newNumber =>{
                            this.contacts[index].phoneNumber = newNumber;
                            takeInput();
                        });
                        break;
                    case "email":
                        readline.question("Enter the new email: ", newEmail =>{
                            this.contacts[index].email = newEmail;
                            takeInput();
                        });
                        break;    
                    default:
                        console.log("Invalid input");
                        takeInput();
                        break;
                }
            });
        });
    }
}

function printOptions() {
    console.log("");
    console.log("-----------");
    console.log("1. Add a contact");
    console.log("2. Delete a contact");
    console.log("3. View all contacts");
    console.log("4. Edit a contact");
    console.log("5. Exit");
    console.log("-----------");
}

var contactManager = new ContactManager();
function takeInput() {
    printOptions();
    readline.question(`What would you like to do? `, answer => {
        switch (answer) {
            case "1":
                contactManager.add();
                break;
            case "2":
                contactManager.remove();
                break;
            case "3":
                contactManager.viewAll();
                break;
            case "4":
                contactManager.edit();
                break;
            case "5":
                readline.close();
                console.log("Goodbye!");
                break;
            default:
                console.log("Invalid input");
                takeInput();
                break;
        }
    });
}
takeInput();