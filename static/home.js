import { NewArrowBox } from "./arrowbox.js"


var searchhelpmework = document.querySelector('#searchhelpmework');


document.querySelector('.hidemyprnt').addEventListener('click',function(){
    this.parentNode.style.display = "none";
})

function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    }
    const csrftoken = getCookie('csrftoken');

searchhelpmework.oninput=(e)=>{
    document.querySelector('#searchModal').style.display = "block"
      e.preventDefault(); // prevent the page from reload
      var url = "/search"
      var data = {
        todo_name: e.target.value,
        csrfmiddlewaretoken: csrftoken,
      }
    console.log(data)
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
      }).done(function(response) {
        document.querySelector('#UsersearchModalDiv').innerHTML = ""
          console.log(response) // let's just print the data in the console for now
        for(var i in response.users){
            //console.log(i.fields.username,"A")
            var a = document.createElement('a');
            a.setAttribute('href',`/view_profile/${response.users[i].fields.username}/` )
            a.innerHTML = response.users[i].fields.username
            document.querySelector('#UsersearchModalDiv').append(a)
            a.classList.add('a_result');
            console.log(response.users[i].fields.username)
        }
        
        })
    }



NewArrowBox({for:document.querySelector('.profile_div'),data: document.querySelector('#pofile_arrowbox'),
event: 'click'})



var upvote_btn = document.querySelectorAll('.upvote_btn');
console.log(upvote_btn)
for ( var el of upvote_btn){
el.addEventListener('click',function(e){
    e.preventDefault(); // prevent the page from reload
    var url = "/upvoted_a_homework"
    var upvoteBtn = this
    var upv_count = this.parentNode.parentNode.querySelector('.homework_upvoted_by_count')
    var data = {
      upvotedby_username:this.parentNode.parentNode.querySelector('.homework_postedby').innerText,
      homework:this.parentNode.parentNode.querySelector('.homework_no').innerText,
      csrfmiddlewaretoken: csrftoken,
    }
  console.log(data)
    $.ajax({
      url: url,
      type: 'POST',
      data: data,
    }).done(function(response) {
      console.log(response)
      if(response.success == 'true'){
        
        if(upvoteBtn.classList.contains('bi-hand-thumbs-up-fill')){
          upvoteBtn.classList.remove('bi-hand-thumbs-up-fill')
          upvoteBtn.classList.add('bi-hand-thumbs-up')
          upv_count.innerHTML = parseInt(upv_count.innerHTML) - 1
        }else{
          upv_count.innerHTML = parseInt(upv_count.innerHTML) + 1
          upvoteBtn.classList.add('bi-hand-thumbs-up-fill')
          upvoteBtn.classList.remove('bi-hand-thumbs-up')

        }
      }
      
      })
})}
