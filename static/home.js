import { getparent, NewArrowBox } from "./arrowbox.js"


var searchhelpmework = document.querySelector('#searchhelpmework');

for(var el of document.querySelectorAll('.hidemyprnt')){
el.addEventListener('click',function(){
    this.parentNode.style.display = "none";
})}

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
        document.querySelector('#HomeworksearchModalDiv').innerHTML = ""
          console.log(response) // let's just print the data in the console for now
        
        if(response.users == 'none'){
          var NSUF = document.createElement('div');
          NSUF.id = ('NSUF')
          NSUF.innerHTML = "NO SUCH USER FOUND"
          document.querySelector('#UsersearchModalDiv').append(NSUF)
        }else{
          for(var i in response.users){
            //console.log(i.fields.username,"A")
            var a = document.createElement('a');
            a.setAttribute('href',`/view_profile/${response.users[i].fields.username}/` )
            a.innerHTML = response.users[i].fields.username
            document.querySelector('#UsersearchModalDiv').append(a)
            a.classList.add('a_result');
            console.log(response.users[i].fields.username)
        }}
        if(response.homeworks == 'none'){
          var NSHF = document.createElement('div');
          NSHF.id = ('NSHF')
          NSHF.innerHTML = "NO SUCH HOMEWORK FOUND"
          document.querySelector('#HomeworksearchModalDiv').append(NSHF)
        
        }else{
          for(var i in response.homeworks){
            //console.log(i.fields.username,"A")
            var a = document.createElement('a');
            var img = document.createElement('img');
            var description = document.createElement('div');
            description.classList.add('search_hw_desc')
            img.classList.add('search_hw_img')
            a.setAttribute('href',`/view_homework/${response.homeworks[i].pk}/` )
            console.log(Array(response.homeworks[i].fields.imgsrcs))
            a.append(img)
            a.append(description)
            document.querySelector('#HomeworksearchModalDiv').append(a)
            a.classList.add('search_hw_Container');
            img.src = response.homeworks[i].fields.imgsrcs.split(',')[0].replace(/['"]+/g, '').replace('[https:','https:').replace(']','')
            description.innerHTML = response.homeworks[i].fields.description
            console.log(response.homeworks[i].fields.description)
        }}
        
        })
    }


try{
NewArrowBox({for:document.querySelector('.profile_div'),data: document.querySelector('#pofile_arrowbox'),
event: 'click'})}
catch(Err){

}

function is_user_authencied(){
  if(document.querySelector('#share_homework') == null){
    return false
  }else{
    return true
  }
}

document.querySelector('#about_input').addEventListener('input',function(){
  document.querySelector('[name=homework_about]').value = this.innerHTML
})

var upvote_btn = document.querySelectorAll('.upvote_btn');
console.log(upvote_btn)
for ( var el of upvote_btn){
el.addEventListener('click',function(e){
  if(document.querySelector('#share_homework') == null){
    $.notify("Login to like or share a homework", "error");
  }else{

    e.preventDefault(); // prevent the page from reload
    var url = "/upvoted_a_homework"
    var upvoteBtn = this
    var upv_count = this.parentNode.parentNode.parentNode.querySelector('.homework_upvoted_by_count')
    var data = {
      upvotedby_username:this.parentNode.parentNode.parentNode.querySelector('.homework_postedby').innerText,
      homework:this.parentNode.parentNode.parentNode.querySelector('.homework_no').innerText,
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
        
        if(upvoteBtn.classList.contains('bi-star-fill')){
          upvoteBtn.classList.remove('bi-star-fill')
          upvoteBtn.classList.add('bi-star')
          upv_count.innerHTML = parseInt(upv_count.innerHTML) - 1
        }else{
          upv_count.innerHTML = parseInt(upv_count.innerHTML) + 1
          upvoteBtn.classList.add('bi-star-fill')
          upvoteBtn.classList.remove('bi-star')

            }
      }
    
        })
}})
}

for ( var el of document.querySelectorAll('.img-slide-left')){
  
  el.addEventListener('click',function(){
    var img_contianer = this.parentNode.querySelector('.homework_img_divs')
    var active_img = this.parentNode.querySelector('.active_img')
    if(active_img != img_contianer.children[0]){
      active_img.classList.remove('active_img')
      active_img.previousElementSibling.classList.add('active_img')
      var new_active_img = this.parentNode.querySelector('.active_img')
      if(new_active_img == img_contianer.children[0]){
        this.style.display = "none"
      }
      this.parentNode.querySelector('.img-slide-right').style.display = "block"
    }
  })
}


for ( var el of document.querySelectorAll('.img-slide-right')){
  el.addEventListener('click',function(){
    var img_contianer = this.parentNode.querySelector('.homework_img_divs')
    var active_img = this.parentNode.querySelector('.active_img')

    if(active_img != img_contianer.children[img_contianer.childElementCount - 1]){
      active_img.classList.remove('active_img')
      active_img.nextElementSibling.classList.add('active_img')
      var new_active_img = this.parentNode.querySelector('.active_img')

      if(new_active_img == img_contianer.children[img_contianer.childElementCount - 1]){
        this.style.display = "none"
      }
      this.parentNode.querySelector('.img-slide-left').style.display = "block"
    }
  })
  
}
try{
document.querySelector('#share_homework').addEventListener('click',function(){
  document.querySelector('#shareModal').querySelector(`[name="linked_upload"]`).value = "none"
  document.querySelector('#shareModal').style.display = "block"
})}
catch(Err){

}
try{
document.querySelector('#ask_homework').addEventListener('click',function(){
  document.querySelector('#askModal').style.display = "block"
})}
catch(Err){

}

const NSHF = document.querySelector('#NSHF')
const NSUF = document.querySelector('#NSUF')
//const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
const url = "https://api.cloudinary.com/v1_1/djwe9njg4/upload";
const form = document.querySelector(".upload_image");
const sml_form = document.querySelector("#sml_upload_img_div");

form.addEventListener("input", (e) => {
  e.preventDefault();

  var files = form.files;
  var formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", "ep5ssenr");

    fetch(url, {
      method: "POST",
      body: formData
    })
    .then((response) => {
      return response.text();
      
    })
    .then((data) => {
      document.querySelector('#shareModalDivpost').style.display = "block"
      form.parentNode.parentElement.style.display = "none"
      
      //console.log(data)
      //console.log(JSON.parse(data).secure_url
      if(document.querySelector('[name=homework_images').value == ""){
        document.querySelector('[name=homework_images').value = JSON.parse(data).secure_url
      }else{
      document.querySelector('[name=homework_images').value = document.querySelector('[name=homework_images').value  + ',' + JSON.parse(data).secure_url 

      }
      var upld_img = document.createElement('img');
      upld_img.classList.add('preview_img');
      upld_img.src = JSON.parse(data).secure_url
      sml_form.parentElement.insertBefore(upld_img,sml_form)
      upld_img.addEventListener('click',function(){
        preview_img(this)
      })
      preview_img(upld_img)
    });
    
  }
});



sml_form.addEventListener("input", (e) => {
  e.preventDefault();

  var files = sml_form.children[0].files;
  var formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    formData.append("file", file);
    formData.append("upload_preset", "ep5ssenr");

    fetch(url, {
      method: "POST",
      body: formData
    })
    .then((response) => {
      return response.text();
      
    })
    .then((data) => {
      
      if(document.querySelector('[name=homework_images').value == ""){
        document.querySelector('[name=homework_images').value = JSON.parse(data).secure_url
      }else{
      document.querySelector('[name=homework_images').value = document.querySelector('[name=homework_images').value  + ',' + JSON.parse(data).secure_url 
      }

      var upld_img = document.createElement('img');
      upld_img.classList.add('preview_img');
      upld_img.src = JSON.parse(data).secure_url
      sml_form.parentElement.insertBefore(upld_img,sml_form)
      upld_img.addEventListener('click',function(){
        preview_img(this)
      })
      preview_img(upld_img)
    });
    
  }
});


function preview_img(imgtag){
for(el of document.querySelectorAll('.preview_img')){
    el.style.border = "none"
}
imgtag.style.border = "2px white ridge"
document.querySelector('#previewing_img').style.backgroundImage = `url(${imgtag.src})`
}

document.querySelector('#usernhw_search_switcher').children[0].addEventListener('click',function(){
document.querySelector('#UsersearchModalDiv').style.display  = "grid"
document.querySelector('#HomeworksearchModalDiv').style.display  = "none"
this.style.color = "blueviolet"
this.nextElementSibling.style.color = "white"
})


document.querySelector('#usernhw_search_switcher').children[1].addEventListener('click',function(){
document.querySelector('#HomeworksearchModalDiv').style.display  = "flex"
document.querySelector('#UsersearchModalDiv').style.display  = "none"
this.style.color = "blueviolet"
this.previousElementSibling.style.color = "white"
})


function forceDownload(url, fileName){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "blob";
  xhr.onload = function(){
      var urlCreator = window.URL || window.webkitURL;
      var imageUrl = urlCreator.createObjectURL(this.response);
      var tag = document.createElement('a');
      tag.href = imageUrl;
      tag.download = fileName;
      document.body.appendChild(tag);
      tag.click();
      document.body.removeChild(tag);
  }
  xhr.send();
}

for (var el of document.querySelectorAll('.bi-file-earmark-arrow-down')){
  el.addEventListener('click',function(){
    for( var images of this.parentElement.parentElement.parentNode.querySelectorAll('img')){
      $.notify("Downloading homework", "success");
    forceDownload(images.src,'homework.jpg')
      // var link = document.createElement('a');
    // link.href = images.src;
    // link.download = images.src;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    }
  })
}

for(var el of document.querySelectorAll('.bi-share')){
  el.addEventListener('click',function(){
    copyTextToClipboard(`https://helpmework.herokuapp.com/view_homework/%20${this.parentNode.parentNode.parentNode.querySelector('.homework_no').innerText}/`)
    //navigator.clipboard.writeText(`https://helpmework.herokuapp.com/view_homework/%20${this.parentNode.parentNode.parentNode.querySelector('.homework_no').innerText}/`)
    $.notify("Share link copied to clipboard", "success");
  })
}

for(var el of document.querySelectorAll('.pending_works_change_icon')){
  el.addEventListener('click',function(e){
    //if(this.classList.contains('bi-file-earmark-plus')){
      if(is_user_authencied())
      {e.preventDefault(); // prevent the page from reload
      var url = "/update_pending_works"
      var pending_Workaddbtn = this
      //var upv_count = this.parentNode.parentNode.parentNode.querySelector('.homework_upvoted_by_count')
      var data = {
        homework_id:parseInt(this.parentNode.parentNode.parentNode.querySelector('.homework_no').innerText),
        csrfmiddlewaretoken: csrftoken,
      }
    console.log(data)
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
      }).done(function(response) {
        console.log(response)
        if(response.success == 'added'){
          pending_Workaddbtn.classList.remove('bi-file-earmark-plus')
          pending_Workaddbtn.classList.add('bi-file-earmark-minus')
          $.notify("Homework added to pending works", "success");
        }else if(response.success == 'removed'){
          pending_Workaddbtn.classList.remove('bi-file-earmark-minus')
          pending_Workaddbtn.classList.add('bi-file-earmark-plus')
          $.notify("Homework removed from pending works", "success");
        }
          })}else{
            $.notify("Login to like or add pending works", "warning");
          }
    
    
    
  })
}
try{
document.querySelector('#select_hw_aq').addEventListener('input',function(){
  if(this.children[0].value == 'Homeworks' ){
    document.querySelector('#HomeworkHome').style.display = "block"
    document.querySelector('#askedWorkHome').style.display = "none"
  }else{
    document.querySelector('#askedWorkHome').style.display = "block"
    document.querySelector('#HomeworkHome').style.display = "none"
  }
})}catch(err){

}

// document.querySelector('#edit_profile_btn').addEventListener('click',function(){
//   this.style.display = "none";
//   document.querySelector('#save_profile_btn').style.display = "block"
//   document.querySelector('.viewprofile_user_bio').style.border = '1px dashed white';
//   document.querySelector('.viewprofile_user_bio').contentEditable = true

  
// })




document.querySelector('#HMWSearchIcon').addEventListener('click',function(){
  document.querySelector('#searchhelpmework').style.display = "block"
  try{
  document.querySelector('.profile_div').style.display = "none"}
  catch(err){}
})

document.body.addEventListener('click',function(e){
  if(e.target.id != 'searchhelpmework' && e.target.id != 'HMWSearchIcon' && e.target.id != 'HomeworksearchModalDiv' && getparent(e.target,'usernhw_search_switcher') == null ){
  document.querySelector('#searchhelpmework').style.display = "none"
  try{
  document.querySelector('.profile_div').style.display = "grid"}
  catch(err){}}
})


for(var el of document.querySelectorAll('.bi-trash-fill')){
  el.addEventListener('click',function(e){
    var confirm_ = confirm("Are you sure want to delete this?")
    console.log(confirm_)
    if(confirm_){
      e.preventDefault(); // prevent the page from reload
      var url = "/delete_homework"
      var delete_btn = this
      //var upv_count = this.parentNode.parentNode.parentNode.querySelector('.homework_upvoted_by_count')
      var data = {
        homework_id:parseInt(this.parentNode.parentNode.parentNode.querySelector('.homework_no').innerText),
        csrfmiddlewaretoken: csrftoken,
      }
    console.log(data)
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
      }).done(function(response) {
        //console.log(response)
        if(response.success == 'deleted'){
          delete_btn.parentNode.parentNode.parentNode.remove()
          $.notify("Homework deleted", "success");
        }else {
          
        }
          })
    }
  })
}


for(var el of document.querySelectorAll('.question_share')){
  el.addEventListener('click',function(){
    var container = this.parentNode.parentNode.parentNode
    copyTextToClipboard(`https://helpmework.herokuapp.com/asked_works/${container.querySelector('.asked_question_id').innerText}/${question}`)
    var question = container.querySelector('.asked_question').innerText.replace(/ /g,"_");
    //navigator.clipboard.writeText(`https://helpmework.herokuapp.com/asked_works/${container.querySelector('.asked_question_id').innerText}/${question}`)
    $.notify("Share link copied to clipboard", "success");
  })
}

for(var el of document.querySelectorAll('.bi-trash')){
  el.addEventListener('click',function(e){
    var confirm_ = confirm("Are you sure want to delete this?")
    console.log(confirm_)
    if(confirm_){
      e.preventDefault(); // prevent the page from reload
      var url = "/delete_question"
      var delete_btn = this
      //var upv_count = this.parentNode.parentNode.parentNode.querySelector('.homework_upvoted_by_count')
      var data = {
       q_id:parseInt(this.parentNode.parentNode.parentNode.querySelector('.asked_question_id').innerText),
        csrfmiddlewaretoken: csrftoken,
      }
    console.log(data)
      $.ajax({
        url: url,
        type: 'POST',
        data: data,
      }).done(function(response) {
        //console.log(response)
        if(response.success == 'deleted'){
          delete_btn.parentNode.parentNode.parentNode.parentNode.remove()
          $.notify("question deleted", "success");
        }else {
          
        }
          })
    }
  })
}

for(var el of document.querySelectorAll('.question_upload')){
  el.addEventListener('click',function(){
    //console.log(is_user_authencied())
    if(is_user_authencied()){
      document.querySelector('#shareModal').querySelector(`[name="linked_upload"]`).value = this.parentNode.parentNode.parentNode.querySelector('.asked_question_id').innerText
      document.querySelector('#shareModal').style.display = "block"
    }else{
      $.notify("Login to like or share a homework", "error");
    }
  })
}





Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
});

// $(document).ready( function() {
//   for(var el of document.querySelectorAll(`input[type="date"]`)){
//     el.value = new Date().toDateInputValue();
//   }
// });​

window.addEventListener("load", function(){
  for(var el of document.querySelectorAll(`input[type="date"]`)){
    el.value = new Date().toDateInputValue();
  }
  // setTimeout(() => {
  //   addBtn.style.display = "grid"
  // }, 1000);
});


for(var el of document.querySelectorAll('.view_que_homeworks')){
  el.addEventListener('click',function(){
    if(this.innerText == 'View homeworks' ){
    this.parentNode.parentNode.style.height = "fit-content"
    this.innerText = "minimize"}
    else{
      this.parentNode.parentNode.style.height = "220px"
    this.innerText = "View homeworks"
    }
  })
}


// let deferredPrompt;
// const addBtn = document.querySelector('.add-btn');
// addBtn.style.display = 'none'

// window.addEventListener('beforeinstallprompt', (e) => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   console.log('BlobEvent')
//   e.preventDefault();
//   // Stash the event so it can be triggered later.
//   deferredPrompt = e;
//   // Update UI to notify the user they can add to home screen
//   addBtn.style.display = 'block';

//   addBtn.addEventListener('click', (e) => {
//     console.log('clicked')
//     // hide our user interface that shows our A2HS button
//     addBtn.style.display = 'none';
//     // Show the prompt
//     deferredPrompt.prompt();
//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then((choiceResult) => {
//         if (choiceResult.outcome === 'accepted') {
//           console.log('User accepted the A2HS prompt');
//         } else {
//           console.log('User dismissed the A2HS prompt');
//         }
//         deferredPrompt = null;
//       });
//   });
// });


function fallbackCopyTextToClipboard(text) {
  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }


}

function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
  }, function(err) {
    console.error('Async: Could not copy text: ', err);
  });
}
