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


    preview.className = "open-card";


    if(selectedCard === "gold") {

        preview.innerHTML = `

        <div class="card-open-left">

            <div id="photoPreview"></div>

        </div>


        <div class="card-inside">

            <h2>Thank You!</h2>

            <p>
            Thank you for supporting Los Hijos de Maria.
            Your support keeps live music alive.
            </p>

            <p>
            We hope to see you again soon!
            </p>

        </div>

        `;

    }



    if(selectedCard === "fiesta") {

        preview.innerHTML = `

        <div class="card-open-left">

            <div id="photoPreview"></div>

        </div>


        <div class="card-inside">

            <h2>Muchas Gracias!</h2>

            <p>
            Thank you for being part of our music journey.
            We appreciate your support.
            </p>

            <p>
            See you at the next show!
            </p>

        </div>

        `;

    }



    if(selectedCard === "night") {

        preview.innerHTML = `

        <div class="card-open-left">

            <div id="photoPreview"></div>

        </div>


        <div class="card-inside">

            <h2>Thank You For Coming</h2>

            <p>
            Your support keeps live music alive.
            We can't wait to see you again.
            </p>

            <p>
            Until next time 🎵
            </p>

        </div>

        `;

    }

};



// PHOTO UPLOAD

const photoInput = document.getElementById("photos");

if(photoInput){

photoInput.addEventListener("change", function(event){

    const previewBox = document.getElementById("photoPreview");

    if(!previewBox) return;


    previewBox.innerHTML = "";


    Array.from(event.target.files).forEach(file => {


        const reader = new FileReader();


        reader.onload = function(e){

            const img = document.createElement("img");

            img.src = e.target.result;

            previewBox.appendChild(img);

        };


        reader.readAsDataURL(file);


    });


});

}


};
