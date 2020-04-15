//console.log("Hello from index.js")
document.addEventListener('DOMContentLoaded', function() {
    //load all riddles by sending an AJAX call to the rails backend 
    //getRiddles();
    Riddle.getRiddles()
    //getForm().addEventListener('submit', createRiddleForm)
    getForm().addEventListener('submit', Riddle.createRiddleForm)
})

//let riddles = []
const getRiddlesList = () => document.querySelector('div#riddles-list-div')
const getForm = () => document.querySelector('form')
const getContent = () => document.getElementById('content').value
const getAnswer = () => document.getElementById('answer').value
const getAddedBy = () => document.getElementById('name').value;

// function template(riddle) {
//     return `
//     <div>
//        <div>
//        <p>Riddle: ${riddle.content}</p>
//        <p>Answer: ${riddle.answer}</p>
//        <p>Added By: ${riddle.user.name}</p>

//        <button>Edit</button>
//        </div>
//     </div>
//     `
// }
// function getRiddles() {
//     fetch('http://localhost:3000/api/riddles')
//        .then(function (response){
//            if(response.status !== 200) {
//                throw new Error(response.statusText)
//            }
//            return response.json()
//        })
//        .then(function (data){
//            riddles = data
//            renderRiddles()
//        })
//        .catch(errors => console.log(errors))
// }

// function renderRiddles() {

//     riddles.forEach(riddle => render(riddle))
// }

// function render(riddle) {
//     getRiddlesList().innerHTML += template(riddle)
// }

// function createRiddleForm(event) {
//     event.preventDefault()

//     const content = getContent()
//     const answer = getAnswer()
//     const name = getAddedBy()

//     let strongParams = {

//         user: {name: name},
//         riddle: {
//             content: content,
//             answer: answer
//         }
//     }
     
  
//     fetch('http://localhost:3000/api/riddles', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(strongParams)
//     })
//       .then(response => response.json())
    
//       .then(riddle => {
//         if (riddle.error) {
//             throw new Error(riddle.error)
//           } else {
           
//               riddles.push(riddle)
//               render(riddle)
//           } 
//       })
//       .catch(errors => console.log(errors))
// }

function resetFormInput() {
    getContent().value = ""
    getAnswer().value = ""
    getAddedBy().value = ""
}

  