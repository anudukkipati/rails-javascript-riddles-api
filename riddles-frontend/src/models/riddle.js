class Riddle {

    static all = []

    constructor(data) {
        this.id = data.id
        this.content = data.content
        this.answer = data.answer
        this.user = data.user
        this.save()
    }


    save() {
        Riddle.all.push(this)
    }

    
 
 
  
    static renderRiddles() {
        Riddle.all.forEach(riddle => riddle.render())
    }

    render() {
        getRiddlesList().innerHTML += this.template()
    }

    static createRiddleForm(event) {
        
        event.preventDefault()
    
        const content = getContent()
        const answer = getAnswer()
        const name = getAddedBy()
    
        let strongParams = {
    
            user: {name: name},
            riddle: {
                content: content,
                answer: answer
            }
        }

      API.post('/riddles', strongParams)
      .then(data => {
        if (data.error) {
            throw new Error(data.error)
          } else {
               let riddle = new Riddle(data)
               riddle.render()
               resetFormInput()
             
               
            //   riddles.push(riddle)
            //   render(riddle)
          }
      })
      .catch(errors => console.log(errors))
   }

   static getRiddles() {
       API.get('/riddles')
       .then(function (riddles){
           riddles.forEach(data => new Riddle(data))
           Riddle.renderRiddles()
        // riddles = data
        // renderRiddles()
    })
    .catch(errors => console.log(errors))
   }

   static editOrSelectRiddle(event) {
    console.log(event)
    //debugger
     if(event.target.className === "edit-riddle") {
         const id = event.target.parentElement.dataset.id
         const div = event.target.parentElement
         div.contentEditable = true
         div.focus()
         let addSubmitButton = document.createElement('BUTTON')
         let text = document.createTextNode("Submit")
         addSubmitButton.setAttribute("class", "edit-riddle-submit-button")
         addSubmitButton.setAttribute("data-id", "${id}")
         addSubmitButton.appendChild(text)
         div.appendChild(addSubmitButton)
         
       } else if (event.target.className === "edit-riddle-submit-button") {
          event.preventDefault()
          console.log("id is", event.target.parentElement.dataset.id)
          console.log(event.target.parentElement.innerHTML)
          const id = event.target.parentElement.dataset.id
          const div = event.target.parentElement

         let contentEdit = event.target.parentElement.firstElementChild.innerText
         let answerEdit = event.target.parentElement.firstElementChild.nextElementSibling.innerText
         let addedByEdit = event.target.parentElement.firstElementChild.nextElementSibling.nextElementSibling.innerText
          Riddle.updateRiddle(id, contentEdit, answerEdit, addedByEdit)
          div.contentEditable = false
          let button = document.querySelector(".edit-riddle-submit-button")
          button.remove()
    
     } else if(event.target.className === "user-link"){
         //console.log(event)
         const id = event.target.dataset.id
         //console.log(id)
         Riddle.getUserRiddles(id)
         //debugger
     }

}

 
  static updateRiddle(id,contentEdit, answerEdit, addedByEdit) {
  
   // debugger
    const content =  contentEdit //document.getElementById('content').value
    const answer = answerEdit //document.getElementById('answer').value
    const name = addedByEdit //document.getElementById('name').value
   
    let strongParams = {

        user: {name: name},
        riddle: {
            content: content,
            answer: answer
        }
    }
    

  API.patch(`/riddles/${id}`, strongParams)
  .then(data => {
    if (data.error) {
        throw new Error(data.error)
      } else {
            
           console.log(data)
        
           this.getRiddles()
        
      }
  })
  .catch(errors => console.log(errors))
  
    
  // debugger
   
  }
  
  

    static getUserRiddles(id) {
       
        API.get(`/users/${id}`)
        
        .then(function (riddles){
            
             let data = riddles 
             console.log(data)
             console.log(data["riddles"])
             let dataRiddles = data["riddles"]
             console.log(dataRiddles)
          
            getUserRiddlesList().innerHTML = ""
            let riddleData = dataRiddles.map(riddle => {
                const riddleLI = `
               
                
                
                <p> User ${riddle.user_id}'s riddle</p>
                <li class="riddleItems">
                    <div id="user-riddle-div" data-id="${riddle.user_id}">
                        <p> ${riddle.content}></p>    
                        <p class="riddleItems"> ${riddle.answer}</p>
                    </div>
                 </li>
                <!--</div>-->
                `
                getUserRiddlesList().innerHTML += riddleLI
            } )
                  
        })
        .catch(errors => console.log(errors))

    }
}




Riddle.prototype.template = function () {
        return `
        <div>
           <div id="riddle-div" data-id="${this.id}">
           <!--<h6>RIDDLE:</h6>-->
           <p class="riddleItems"> ${this.content}</p>
           <!--<h6>ANSWER:</h6>-->
           <p class="riddleItems"> ${this.answer}</p>
           <!--<h6>ADDED BY:</h6>-->
           <p class="riddleItems"> ${this.user.name}</p>
           
           <button class="edit-riddle">Edit</button>
           </div>
           <h6 style = "color: orange">To edit, click on Edit and click on the text content</h6>
           
        </div>
           <a href="#user-riddle" class="user-link" data-id="${this.user.id}">Click here to see ${this.user.name}'s riddles</a>
        `
    }

    Riddle.prototype.userRiddleTemplate = function () {
        return `
           <div>
             <div id="user-riddle-div" data-id="${this.user.id}">

                 <h6>${this.user.name}'s Riddles</h6>
                 <p class="riddleItems"> ${this.content}</p>
                 <p class="riddleItems"> ${this.answer}</p>

             </div>
           </div>


        `
    }