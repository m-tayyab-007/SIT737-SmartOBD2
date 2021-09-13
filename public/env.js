const adduser = (user) => {
    $.ajax({
        url: '/api/users',
        data: user,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
        }
    })
}

$(document).ready(function(){
   
    $('.modal').modal();
  });