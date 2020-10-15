


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
                options.remove();

                var status = document.getElementById(`status-${id}`);
                ststus.innerHTML = "Approved"
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
                options.remove();

                var status = document.getElementById(`status-${id}`);
                ststus.innerHTML = "Declined"
            }
            else if (response.status == "error") {
                alert(response.message);
            }


        }


    }
    xhr.send();
}
// function toggleLike(event) {
//     const xhr = new XMLHttpRequest();
//     var id = event.target.getAttribute("data-id");
//     console.log("id is: " + id);
//     xhr.open('POST', `/main/toggleLikes/${id}`, true);
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var response = JSON.parse(this.responseText);
//             if (response.status == 'like') {
//                 var likes = parseInt(event.target.innerText);
//                 console.log('earlier ' + likes);
//                 likes++;
//                 event.target.innerHTML = `${likes}`;
//                 event.target.style.color = "red";
//                 // alert(response.message);
//                 console.log('now ' + likes);

//             }
//             if (response.status == 'unlike') {
//                 var likes = parseInt(event.target.innerText);
//                 console.log('earlier ' + likes);
//                 likes--;
//                 event.target.innerHTML = `${likes}`;
//                 event.target.style.color = "black";

//                 // alert(response.message);
//                 console.log('now ' + likes);
//             }
//             if (response.status == "error") {
//                 alert(response.message);
//             }


//         }
//     }
//     var formData = new FormData();

//     formData.append("id", id);
//     xhr.send(formData);


// }
// function addComment(event) {


//     const xhr = new XMLHttpRequest();
//     const id = event.target.getAttribute("data-id");
//     console.log(id);
//     let comment = document.getElementById("input-" + id).value;
//     let commentElement = document.getElementById("input-" + id);
//     console.log(comment);
//     xhr.open('POST', `/main/${id}&${comment}`, true);
//     xhr.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             var response = JSON.parse(this.responseText);
//             if (response.status == "success") {
//                 let comments = parseInt(document.getElementById(`comment-button-${id}`).innerHTML);
//                 comments++;
//                 document.getElementById(`comment-button-${id}`).innerHTML = comments;
//                 let div = document.createElement('div');
//                 div.classList.add('card');
//                 div.classList.add('each-comment');
//                 div.setAttribute('style', "display: flex; flex-direction: row; justify-content: start ;height: auto;margin: 5px 2px;");
//                 div.innerHTML = `<div class="profile pr-0">
//                         <img src="../../img/profile.png" class="mt-2" width="20%" height="40px" alt="...">
//                         ${response.username}
//                     </div>

//                     <div class="card-body">
//                         <p class="card-text" style="text-align: start; font-size: 1.2em;">
//                             ${response.comment}
//                         </p>
//                     </div>`;
//                 document.querySelector(`#comment-box-${id}`).append(div);

//             }
//             else {
//                 alert(response.message);
//             }

//         }
//         commentElement.value = "";
//     }
//     var formData = new FormData();
//     // let comment = document.getElementById(id).value;
//     formData.append("comment", comment);
//     xhr.send(formData);

// }

