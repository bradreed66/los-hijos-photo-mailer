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

window.selectCard = function(card) {

    const preview = document.getElementById("emailPreview");


    if(card === "gold") {

        preview.className = "open-card gold";

        preview.innerHTML = `

        <div class="card-front">

            <h1>Los Hijos de Maria</h1>
            <p>Thank You</p>

        </div>


        <div class="card-inside">

            <h2>Thank You!</h2>

            <p>
            Thank you for supporting live music.
            Your support helps keep our music alive.
            </p>

            <div id="photoPreview"></div>

            <p>
            We hope to see you again soon!
            </p>

        </div>

        `;

    }


    if(card === "fiesta") {

        preview.className = "open-card fiesta";

        preview.innerHTML = `

        <div class="card-front">

            <h1>Los Hijos de Maria</h1>
            <p>Muchas Gracias</p>

        </div>


        <div class="card-inside">

            <h2>Muchas Gracias!</h2>

            <p>
            Thank you for being part of our music journey.
            We appreciate your support.
            </p>

            <div id="photoPreview"></div>

            <p>
            See you at the next show!
            </p>

        </div>

        `;

    }


    if(card === "night") {

        preview.className = "open-card night";

        preview.innerHTML = `

        <div class="card-front">

            <h1>Los Hijos de Maria</h1>
            <p>After The Show</p>

        </div>


        <div class="card-inside">

            <h2>Thank You For Coming</h2>

            <p>
            Your support keeps live music alive.
            We can't wait to see you again.
            </p>

            <div id="photoPreview"></div>

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
