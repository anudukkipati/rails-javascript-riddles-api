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

    // template() {
    //     return `
    //     <div>
    //        <div>
    //        <p>Riddle: ${this.content}</p>
    //        <p>Answer: ${this.answer}</p>
    //        <p>Added By: ${this.user.name}</p>
    
    //        <button>Edit</button>
    //        </div>
    //     </div>
    //     `
    // }

 
  
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
}

Riddle.prototype.template = function () {
        return `
        <div>
           <div id="riddle-div">
           <p>Riddle: ${this.content}</p>
           <p>Answer: ${this.answer}</p>
           <p>Added By: ${this.user.name}</p>
    
           <button class="edit-riddle">Edit</button>
           </div>
        </div>
        `
    }