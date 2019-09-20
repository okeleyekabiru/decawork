$(function(){
    var $email1 = $('#email1')
    var $password1 =  $('password1')
    var $formData = $('#submitform')
    $('#submitform').submit(function(e){
       e.preventDefault()
       
        var details = {
            email: $email1.val(),
            password:$password1.val()
        }
      
$.ajax({
    type:'GET',
    url:'http://localhost:3000/users'
})
    })
})