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

    preview.className = "email " + card;


    if(card === "gold") {

        preview.innerHTML = `
        <h1>Los Hijos de Maria</h1>
        <h2>Thank You!</h2>
        <p>Thank you for supporting live music.</p>
        <div id="photoPreview"></div>
        <p>We hope to see you again soon!</p>
        `;

    }


    if(card === "fiesta") {

        preview.innerHTML = `
        <h1>Los Hijos de Maria</h1>
        <h2>Muchas Gracias!</h2>
        <p>Thank you for being part of our music journey.</p>
        <div id="photoPreview"></div>
        <p>See you at the next show!</p>
        `;

    }


    if(card === "night") {

        preview.innerHTML = `
        <h1>Los Hijos de Maria</h1>
        <h2>Thank You For Coming</h2>
        <p>Your support keeps live music alive.</p>
        <div id="photoPreview"></div>
        <p>Until next time 🎵</p>
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
