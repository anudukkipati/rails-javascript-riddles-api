//console.log("Hello from index.js")
document.addEventListener('DOMContentLoaded', function() {
    //load all riddles by sending an AJAX call to the rails backend 
    //getRiddles();
    Riddle.getRiddles()
   // Riddle.selectARiddles()
  
    //getForm().addEventListener('submit', createRiddleForm)
    getForm().addEventListener('submit', Riddle.createRiddleForm)
    attachListeners()
    
})

//let riddles = []
const getRiddlesList = () => document.querySelector('div#riddles-list-div')
const getUserRiddlesList = () => document.querySelector('ul#user-riddles')
const getARiddlesList = () => document.querySelector('div#button-div')

const getForm = () => document.querySelector('form')
const getContent = () => document.getElementById('content').value
const getAnswer = () => document.getElementById('answer').value
const getAddedBy = () => document.getElementById('name').value;
//const button = document.getElementById("edit-riddle-sumbit-button")

//document.getElementById("riddles-list-div").addEventListener('click', function() {
    //console.log("I am clicked")

//})

function attachListeners() {

    document.getElementById("riddles-list-div").addEventListener('click', Riddle.editOrSelectRiddle)//,true
    document.getElementById("button-div").addEventListener('click', Riddle.selectARiddles)

    
}



function resetFormInput() {
    // debugger
   
     document.getElementById('content').value = ''
     document.getElementById('answer').value = ''
    document.getElementById('name').value = ''
}

