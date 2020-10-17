


function approveReq(event) {
    const xhr = new XMLHttpRequest();
    var id = event.target.getAttribute("data-id");
    console.log(id);

    xhr.open('GET', `/main/app/${id}`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.ststus == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 'success') {
                var options = document.getElementById(`options-${id}`);


                options.style.display = "none";

                var status = document.getElementById(`status-${id}`);

                status.innerHTML = "Approved"
            }
            else if (response.status == "error") {
                alert(response.message);
            }


        }


    }
    xhr.send();
}
function declineReq(event) {
    const xhr = new XMLHttpRequest();
    var id = event.target.getAttribute("data-id");
    console.log(id);
    xhr.open('GET', `/main/dec/${id}`, true);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.ststus == 200) {
            var response = JSON.parse(this.responseText);
            if (response.status == 'success') {
                var options = document.getElementById(`options-${id}`);
                options.style.display = "none";

                var status = document.getElementById(`status-${id}`);
                status.innerHTML = "Declined"
            }
            else if (response.status == "error") {
                alert(response.message);
            }


        }


    }
    xhr.send();
}

