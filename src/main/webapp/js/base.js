/**
 * Created by SQ04 on 5/26/2016.
 */

/**
 * @fileoverview
 * Provides methods for the Calculator Angular UI  and interaction with the
 * Calculator Endpoints API.
 */

/** google global namespace for Google projects. */
var google = google || {};

/** appengine namespace for Google Developer Relations projects. */
google.appengine = google.appengine || {};

/** samples namespace for App Engine sample code. */
google.appengine.calculator = google.appengine.calculator || {};

/** hello namespace for this sample. */
google.appengine.calculator.backend = google.appengine.calculator.backend  || {};

/**
 * Prints a greeting to the greeting log.
 * param {Object} greeting Greeting to print.
 */
google.appengine.calculator.backend.print = function(greeting) {
    var element = document.createElement('div');
    element.classList.add('row');
    element.innerHTML = greeting.message;
    document.querySelector('#outputLog').appendChild(element);
};

/**
 * Gets a numbered greeting via the API.
 * @param {string} id ID of the greeting.
 */
google.appengine.calculator.backend.add = function(value1,value2) {
    gapi.client.calculator.calcAPI.add({'value1': value1,'value2':value2}).execute(
        function(resp) {
            if (!resp.code) {
               console.log(resp);// google.appengine.calculator.backend.print(resp);
            }
        });
};

/**
 * Lists greetings via the API.

google.appengine.samples.hello.listGreeting = function() {
    gapi.client.helloworld.greetings.listGreeting().execute(
        function(resp) {
            if (!resp.code) {
                resp.items = resp.items || [];
                for (var i = 0; i < resp.items.length; i++) {
                    google.appengine.samples.hello.print(resp.items[i]);
                }
            }
        });
};
*/
/**
 * Enables the button callbacks in the UI.

google.appengine.samples.hello.enableButtons = function() {
    var getGreeting = document.querySelector('#getGreeting');
    getGreeting.addEventListener('click', function(e) {
        google.appengine.samples.hello.getGreeting(
            document.querySelector('#id').value);
    });

    var listGreeting = document.querySelector('#listGreeting');
    listGreeting.addEventListener('click',
        google.appengine.samples.hello.listGreeting);

};*/
/**
 * Initializes the application.
 * @param {string} apiRoot Root of the API's path.
 */
google.appengine.calculator.backend.init = function(apiRoot) {
    // Loads the OAuth and helloworld APIs asynchronously, and triggers login
    // when they have completed.
    var apisToLoad;
    var callback = function() {
        if (--apisToLoad == 0) {
           console.log("API Loaded for Use"); //  google.appengine.samples.hello.enableButtons();
        }
    }

    apisToLoad = 1; // must match number of calls to gapi.client.load()
    gapi.client.load('calculator API', 'v1', callback, apiRoot);


};