async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`



  let learners = await axios.get('http://localhost:3003/api/learners')
  let mentors = await axios.get('http://localhost:3003/api/mentors')
   
   console.log(learners.data)
   console.log(mentors.data)

   

   for(let i = 0; i < learners.data.length; i++){
      for(let j = 0; j < mentors.data.length; j++){
        for(let k = 0; k < learners.data[i].mentors.length; k++){
          if(learners.data[i].mentors[k] ===  mentors.data[j].id){
            learners.data[i].mentors[k] = `${mentors.data[j].firstName} ${mentors.data[j].lastName}`
          }
      }
   }
  }

    try{
          let buildCards = ((info) =>{
              let card = document.createElement('div') //Create Elements
              card.classList.add('card')
              let learnerName = document.createElement('h3')
              let learnerEmail = document.createElement('div')
              let learnerMentors = document.createElement('h4')
              let mentorList = document.createElement('ul')

              learnerName.textContent = `${info.fullName}`  //Create text content
              learnerEmail.textContent = `${info.email}`
              learnerMentors.classList = 'closed'
              learnerMentors.textContent = `Mentors`
              info.mentors.forEach((mentor) => {
                var li = document.createElement('li')
                li.textContent = mentor;
                mentorList.appendChild(li)
              })
              
      
              card.appendChild(learnerName)             //Append to card
              card.appendChild(learnerEmail)
              card.appendChild(learnerMentors)

              card.addEventListener('click', (evt) => {  //card event listener
                
                
                if(evt.target === card.children[2] && card.children[2].className === 'closed'){
                      //if(card.children[2].classList === 'closed'){
                      
                      card.children[2].className = 'open'
                      card.children[2].appendChild(mentorList)
                    }else if(evt.target === card.children[2] && card.children[2].className === 'open'){
                      card.children[2].className = 'closed'
                      card.children[2].removeChild(mentorList)

                    }
                  document.querySelectorAll('.card').forEach(thisCard => {
                    if(thisCard.classList.contains('selected') && thisCard !== card){
                      thisCard.classList.remove('selected')  
                    }
                    console.log(thisCard.children[0].textContent)
                    
                    
                  })
                    if(card.classList.contains('selected') && evt.target !== card.children[2]){
                      card.children[0].textContent = `${info.fullName}`
                      card.classList.remove('selected')
                      document.querySelector('.info').textContent = `No learner is selected`
                    
                    }else{
                      card.classList.add('selected')
                      document.querySelector('.selected').children[0].textContent =  `${info.fullName}, ID ${info.id}`
                      document.querySelector('.info').textContent = `The selected learner is ${info.fullName}`
                      
                    }

                    // if(card.classList.contains('selected')){
                    //   document.querySelector('.info').textContent = `The selected learner is ${info.fullName}`
                    // }else{
                    //   document.querySelector('.info').textContent = `No learner is selected`
                    // }


                    //document.querySelector('.selected').children[0].textContent = `${info.fullName}, ID ${info.id}`
                  
                    // if(evt.target === card.children[2] && card.children[2].className === 'closed'){
                    //   //if(card.children[2].classList === 'closed'){
                    //   card.children[2].className = 'open'
                    //   card.children[2].appendChild(mentorList)
                    // }else if(evt.target === card.children[2] && card.children[2].className === 'open'){
                    //   card.children[2].className = 'closed'
                    //   card.children[2].removeChild(mentorList)

                    // }
              })

              
                  return card
          })
          
          learners.data.forEach(learner => {
              let learnerCard = buildCards(learner)
              document.querySelector('.cards').appendChild(learnerCard)   //Append cards to DOM
              document.querySelector('.info').textContent = `No learner is selected`
          })

    }catch (err){
     console.log('Error occurred: ' + err)
    }
  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
