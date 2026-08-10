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



// SEND EMAIL

const sendButton = document.querySelector(".send");

if(sendButton){

    sendButton.addEventListener("click", async function(){

        const customerName =
            document.getElementById("customerName").value.trim();

        const customerEmail =
            document.getElementById("customerEmail").value.trim();


        if(!customerName){

            alert("Please enter the customer's name.");

            return;

        }


        if(!customerEmail){

            alert("Please enter the customer's email.");

            return;

        }


        if(uploadedPhotos.length === 0){

            alert("Please upload at least one photo.");

            return;

        }


        let title = "";
        let message = "";


        if(selectedCard === "gold"){

            title = "Thank You!";

            message =
                "Thank you for supporting Los Hijos de Maria. Your support keeps live music alive.";

        }


        if(selectedCard === "fiesta"){

            title = "Muchas Gracias!";

            message =
                "Thank you for being part of our music journey. We appreciate your support.";

        }


        if(selectedCard === "night"){

            title = "Thank You For Coming";

            message =
                "Your support keeps live music alive. We can't wait to see you again.";

        }


        sendButton.disabled = true;

        sendButton.innerText = "PREPARING PHOTOS...";


        try{

            const emailPhotos = [];


            for(let i = 0; i < uploadedPhotos.length; i++){

                const photoData = uploadedPhotos[i];

                const image = new Image();

                image.src = photoData;


                await new Promise((resolve, reject) => {

                    image.onload = resolve;

                    image.onerror = reject;

                });


                const maxSize = 800;

                let width = image.width;

                let height = image.height;


                if(width > maxSize || height > maxSize){

                    if(width > height){

                        height =
                            Math.round(height * (maxSize / width));

                        width = maxSize;

                    }else{

                        width =
                            Math.round(width * (maxSize / height));

                        height = maxSize;

                    }

                }


                const canvas =
                    document.createElement("canvas");

                canvas.width = width;

                canvas.height = height;


                const context =
                    canvas.getContext("2d");


                context.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );


                const compressedPhoto =
                    canvas.toDataURL(
                        "image/jpeg",
                        0.82
                    );


                emailPhotos.push({

                    content:
                        compressedPhoto.split(",")[1],

                    data:
                        compressedPhoto,

                    name:
                        `photo-${i + 1}.jpg`

                });

            }


            sendButton.innerText = "SENDING...";


            const response = await fetch(
                "https://los-hijos-email.lilbraddy27.workers.dev/",
                {

                    method: "POST",

                    headers: {

                        "Content-Type": "application/json"

                    },

                    body: JSON.stringify({

                        customerName:
                            customerName,

                        customerEmail:
                            customerEmail,

                        selectedCard:
                            selectedCard,

                        title:
                            title,

                        message:
                            message,

                        photos:
                            emailPhotos

                    })

                }

            );


            const result =
                await response.json();


            if(!response.ok || !result.success){

                console.error(
                    "BREVO ERROR:",
                    result
                );

                throw new Error(
                    result.error?.message ||
                    result.error ||
                    "Email could not be sent."
                );

            }


            alert(
                "Email sent successfully to " +
                customerEmail +
                "!"
            );


        }catch(error){

            console.error(error);

            alert(
                "Email failed: " +
                error.message
            );


        }finally{

            sendButton.disabled = false;

            sendButton.innerText = "SEND EMAIL";

        }

    });

}

};
