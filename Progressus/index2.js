$(function(){

    //var $username = $("#usersname")
    var $firstname = $("#name")
    var $lastname = $("#second")
    var $expertise = $("#expertise")
    var $username= $('#toby')
var usertemplate =$("#user-template2").html()// template for the whole formart
function addUser(user){
    $username.append(Mustache.render(usertemplate,user))//appand it to a resule

}
var storage = JSON.parse(localStorage.getItem('users'))

$.ajax({
    type:"GET",
    url:'http://localhost:3000/users/'+ storage, // here we access the stored refence of the id
     data:storage,//the object we assigned 
     success:function(newuser){
        addUser(newuser)
        
     },
     error: function(){
         alert("errror view users")
     }
     })
})
