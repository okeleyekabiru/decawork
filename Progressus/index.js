$(function(){
    var $username = $('#username')
    var $userpage = $('#userpage')
    var $firstName =$('#first_name');
    var $secondName =$('#last_name')
    var $email = $('#email')
    var $password = $('#password')
    var $rpassword =$('#password1')
    var $expertise =$('#expertise')
    var usertemplate =$("#user-template").html()
    var usertemplate2=$('#user-template2').html() ;
    function addUser(user){
        $username.append(Mustache.render(usertemplate,user))//appand it to a resule

    }
    function addNUser(user){
        $userpage.append(Mustache.render(usertemplate2,user))//appand it to a resule

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
    $.ajax({//here we use it to get
        type:"GET",
        url: "http://localhost:3000/users",
        success: function(users){
            $.each(users,function(i,user){//we loop through each to return value
                addNUser(user)
              //  $username.append("img.src="+user.image+"")
            })
        },error: function(){
            alert("error loading users")   
            
        }
    })
    
  $('#submit').click(function(e){
    e.preventDefault()
     var users  = {
         firstName:$firstName.val(),
         secondName:$secondName.val(),
         email:$email.val(),
         password:$password.val(),
         re_password:$rpassword.val(),
         expertise:$expertise.val()
        
     } 
     
     console.log(users)
     $.ajax({
         type:'POST',
         url:'http://localhost:3000/users',
         data:users,
         success:function(newuser){
             alert("uploaded successfully" + newuser)
         },
         error: function(){
             alert('error uploading')
         }

     })
  })
  $username.delegate('.remove','click',function(){//not working properly
    var $li =$(this).closest('li')// we look for the nearest
    var z =  "http://localhost:3000/users/" + $(this).attr('data-id')
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
    $li.find('input.firstname').val($li.find('span.firstname').html());// we populate the value of input with span
   $li.find('input.secondname').val($li.find('span.secondname').html())
    $li.find('input.expertise').val($li.find('span.expertise').html())
    $li.find('input.password').val($li.find('span.password').html())

$li.addClass('edit');
});
$username.delegate('.canceluser','click',function(){
    $(this).closest('li').removeClass('edit')// we remove the class of edit
});
$username.delegate('.saveuser','click',function(){
    var $li =$(this).closest('li')
    var user ={
     firstname:   $li.find('input.first_name').val(),
     secondname: $li.find('input.second_name').val(),
expertise: $li.find('input.expertise').val(),
password:$li.find('input.password').val()


         
    };
    console.log( "http://localhost:3000/users/"+ $li.attr('data-id'))
$.ajax({
    type:"PUT",
    url:'http://localhost:3000/users/'+ $li .attr('data-id'),// here we access the stored refence of the id
     data:user,//the object we assigned 
     success:function(newwuser){
      $li.find('span.firstname').html(user.firstname)
      $li.find('span.expertise').html(user.expertise)
      $li.find('span.secondname').html(user.secondname)
      $li.find('span.password').html(user.password)
      $li.removeClass('edit')
     },
     error: function(){
         alert("error updating users")
     }
})
})
})