export default {
    something (){
        console.log('this is module something');
    },
    other(){
        console.log('this is module other');
    }
}

var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};