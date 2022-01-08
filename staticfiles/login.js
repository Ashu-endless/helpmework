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


document.querySelector('#login_btn').addEventListener('click', function (e) {
    e.preventDefault(); 
    var url = "/login"
    var data = {
        username: this.parentNode.querySelector('[name="username"]').value,
        password: this.parentNode.querySelector('[name="password"]').value,
        csrfmiddlewaretoken: csrftoken,
    }
    //console.log(data)
    $.ajax({
        url: url,
        type: 'POST',
        data: data,
    }).done(function (response) {
        //console.log(response)
        if(response.success == "True"){
        window.location.replace("/");}
        else{
            $("#login_btn").notify("Wrong username or password", "error");
        }
    })
})