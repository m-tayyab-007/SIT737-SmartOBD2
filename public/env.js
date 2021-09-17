const adduser = (user) => {
    $.ajax({
        url: '/api/users',
        contentType: "application/json",
        data: JSON.stringify(user),
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.reload();
            alert("User created Successfully")
        }
    })
}

const newUser = () => {
    let email = $("#email").val();
    let password = $("#pasword").val();
    let make = $("#make").val();
    let model = $("#model").val();
    let year = $("#year").val();

    let user = { email, password, make, model, year };
    console.log(user);
    adduser(user);
}

$(document).ready(function () {

    $('.modal').modal();
    $('select').formSelect();
});