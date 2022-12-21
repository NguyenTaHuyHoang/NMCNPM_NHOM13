function eventPOST(dataSending, url, modalName, notification) {

    $.ajax({
        type: "POST",
        url: `${url}`,
        data: dataSending,
        dataType: "JSON",
        success: function (response) {
            console.log("update thành công!");
        }
    });

    if (notification != null)
        alert(notification);
    if (modalName != null)
        $(`#${modalName}`).modal('hide');
    $('.notification').html('');
}

function validationDate(date) {
    let currentDate = new Date();

    if (date == "") return false;

    if (date.getTime() > currentDate.getTime()) return true;
    return false;
}

function updateContentOnConfirmModal(title, content, btnID) {
    $("#confirmModalLabel").html(`${title}`);
    $("#confirmModalBody").html(`${content}`);
    $('.confirm').addClass('displayNone');
    $(`#${btnID}`).removeClass("displayNone");
}