let checkAccount = false;

function validationChangePass(pass, newPass, cfPass) {
    if (pass == newPass) {
        notificationChangePass.html('Mật khẩu mới và mật khẩu phải khác nhau!');
        return false;
    }
    if (newPass == "") {
        notificationChangePass.html('Vui lòng nhập mật khẩu mới!');
        return false;
    }
    else if (cfPass == "") {
        notificationChangePass.html('Vui lòng nhập xác nhận mật khẩu mới!');
        return false;
    }
    else if (newPass != cfPass) {
        notificationChangePass.html('Xác nhận mật khẩu không đúng!');
        return false;
    }
    return true;
}

async function checkPass(email, pass, type) {
    apiUrl = `/${type}/checkAccount/${email}/${pass}`;
    checkAccount = await fetch(apiUrl);
    checkAccount = await checkAccount.json();
    checkAccount = checkAccount.result;
}

const notificationChangePass = $('#notificationChangePass');

$('#changePassBtn').click(async function (e) {
    e.preventDefault();
    const email = $('#getDataAccount').attr('data-email');
    const typeAccount = $('#getDataAccount').attr('type-account');

    const pass = $('#pass').val();
    const newPass = $('#newPass').val();
    const confirmPass = $('#confirmPass').val();

    if (pass == "") {
        notificationChangePass.html('Vui lòng nhập mật khẩu!');
        return;
    }


    await checkPass(email, pass, typeAccount);
    if (checkAccount == false) {
        notificationChangePass.html('Nhập sai mật khẩu!');
        return;
    }

    if (validationChangePass(pass, newPass, confirmPass))
        eventPOST({ password: newPass }, window.location.href + "/updateInformation", "changePassModal", "Thay đổi mật khẩu thành công!");
});