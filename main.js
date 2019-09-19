$(function (){
    var $username = $("#usersname")
    var $firstname = $("#name")
    var $lastname = $("#second")
    var $expertise = $("#expertise")
 

    var usertemplate =$("#user-template").html()// template for the whole formart
    function addUser(user){
        $username.append(Mustache.render(usertemplate,user))//appand it to a resule

    }
    
    $.ajax({//here we use it to get
        type:"GET",
        url: "http://localhost:3000/users",
        success: function(users){
            $.each(users,function(i,user){//we loop through each to return value
                addUser(user)
              //  $username.append("img.src="+user.image+"")
            })
        },error: function(){
            alert("error loading users")   
            
        }
    })
$("#click").click(function(){
var user = {// here i stored reference to all input as an object
    name:$firstname.val(),
    expertise:$expertise.val(),
    image:$image.val()

}
$.ajax({
    type:"POST",
    url:"http://localhost:3000/users",
     data:user,//the object we assigned 
     success:function(newuser){
      addUser(newuser)
     },error: function(){
         alert("error saving users")
     }
})
})
$username.delegate('.remove','click',function(){//not working properly
    var $li =$(this).closest('li')// we look for the nearest
    var z =  "http//localhost:3000/users/" + $(this).attr('data-id')
    console.log(z)
$.ajax({// here controls  the delete
    method:"DELETE",
    url:"http://localhost:3000/users/" + $(this).attr('data-id'),
    contentType: 'application/json',
    xhrFields: {
        credentials: true
    },
    success: function(){
        $li.fadeOut(300,function(){
        $(this).remove()// here we delete anything we want remove
        });
    }
})
});
$username.delegate('.edituser','click',function(){
    var $li = $(this).closest('li');//here is the edit  
    $li.find('input.name').val($li.find('span.name').html());// we populate the value of input with span
    $li.find('input.expertise').val($li.find('span.expertise').html())
$li.addClass('edit');
});
$username.delegate('.canceluser','click',function(){
    $(this).closest('li').removeClass('edit')// we remove the class of edit
});
$username.delegate('.saveuser','click',function(){
    var $li =$(this).closest('li')
    var user ={
     name:   $li.find('input.name').val(),
expertise: $li.find('input.expertise').val()
         
    };
    console.log( "http://localhost:3000/users/"+ $li.attr('data-id'))
$.ajax({
    type:"PUT",
    url:'http://localhost:3000/users/'+ $li .attr('data-id'),// here we access the stored refence of the id
     data:user,//the object we assigned 
     success:function(newwuser){
      $li.find('span.name').html(user.$firstname)
      $li.find('span.expertise').html(user.expertise)
      $li.removeClass('edit')
     },
     error: function(){
         alert("error updating users")
     }
})
})

 $username.delegate('.btn','click',function(){
     
    var $li =$(this).closest('li')
    console.log( $li .attr('data-id'))
    console.log("http://localhost:3000/users" + $li.attr('data-id'))
     localStorage.setItem("users",$li.attr('data-id'))
    window.location = "na.html" + '#' +$li .attr('data-id')
/*$.ajax({
    type:"GET",
    url:'http://localhost:3000/users/'+ $li .attr('data-id'),// here we access the stored refence of the id
     data:user,//the object we assigned 
     success:function(newwuser){
     addUser(user)
     },
     error: function(){
         alert("errror view users")
     }
     })*/
})
});
