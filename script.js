window.onload = function() {


// LOGIN

window.login = function() {

    const password = document.getElementById("password").value;
    const popup = document.getElementById("loginPopup");
    const error = document.getElementById("error");


    if(password === "MexiMerican5") {

        popup.style.display = "none";

    } else {

        error.innerHTML = "Wrong passkey";

    }

};



// CARD SELECTOR

let selectedCard = "gold";

window.selectCard = function(card) {

    selectedCard = card;

    const preview = document.getElementById("emailPreview");

    preview.className = "card " + card;

    preview.innerHTML = "";

};



// OPEN CARD

window.openCard = function() {

    const preview = document.getElementById("emailPreview");

    preview.className = "open-card " + selectedCard;


    let title = "";
    let message = "";


    if(selectedCard === "gold") {
        title = "Thank You!";
        message = "Thank you for supporting Los Hijos de Maria. Your support keeps live music alive.";
    }


    if(selectedCard === "fiesta") {
        title = "Muchas Gracias!";
        message = "Thank you for being part of our music journey. We appreciate your support.";
    }


    if(selectedCard === "night") {
        title = "Thank You For Coming";
        message = "Your support keeps live music alive. We can't wait to see you again.";
    }


    preview.innerHTML = `

    <div class="card-open-left">

        <div id="photoPreview"></div>

    </div>


    <div class="card-inside">

        <h2>${title}</h2>

        <p>${message}</p>

        <p>
        We hope to see you again soon!
        </p>

    </div>

    `;


    updatePhotos();

};



// PHOTO UPLOAD

let uploadedPhotos = [];


const photoInput = document.getElementById("photos");


if(photoInput){


photoInput.addEventListener("change", function(event){


    Array.from(event.target.files).forEach(file => {


        if(uploadedPhotos.length >= 9){
            return;
        }


        const reader = new FileReader();


        reader.onload = function(e){


            uploadedPhotos.push(e.target.result);

            updatePhotos();


        };


        reader.readAsDataURL(file);


    });


});


}



function updatePhotos(){


    const previewBox = document.getElementById("photoPreview");


    if(!previewBox) return;


    previewBox.innerHTML = "";


    uploadedPhotos.forEach((photo,index)=>{


        const container = document.createElement("div");

        container.className = "photo-item";


        const img = document.createElement("img");

        img.src = photo;


        const remove = document.createElement("button");

        remove.innerHTML = "×";

        remove.className = "remove-photo";


        remove.onclick = function(event){

            event.stopPropagation();

            uploadedPhotos.splice(index,1);

            updatePhotos();

        };


        container.appendChild(img);

        container.appendChild(remove);


        previewBox.appendChild(container);


    });


}


};
