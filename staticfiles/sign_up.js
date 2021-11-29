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

document.querySelector('[name="username"]').addEventListener('input', function (e) {
    e.preventDefault(); 
    var url = "/check_ifusername_Available"
    var data = {
        username: this.parentNode.querySelector('[name="username"]').value,
        csrfmiddlewaretoken: csrftoken,
    }
    console.log(data)
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
    }).done(function (response) {
        console.log(response)
        if(response.available == "true"){
            document.querySelector('[name="username"]').style.color = "white"
            document.querySelector('#SignUp_btn').type = "submit" }
        else{
            document.querySelector('[name="username"]').style.color = "red"
            $('[name="username"]').notify("Username already taken", "error")
            document.querySelector('#SignUp_btn').type = "button"
        }
    })
    
})