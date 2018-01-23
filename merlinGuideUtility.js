/*
Michael Vetter
1/23/2018

Utility to detect when a page has loaded.

To use, call the function callWhenReadyToGo with a callback function

This script will call callWhenReadyToGo with the callback someCallback.  Comment out this call if you wish to call it from your own script.
*/

var currentXHR = window.XMLHttpRequest;
var lastReady = new Date().getTime();
var callbackFunctionName;
var listenerCount = 0;

var MAX_WAIT = 3000;  //Maximum time to wait for all ajax calls to return.
var TIMEOUT = 200;    //how often to check if all listeners came back

function callWhenReadyToGo(callback)
{
    //store the function to be called once the page has loaded
    callbackFunctionName = callback;
    
    window.XMLHttpRequest = newXHR;
}

callWhenReadyToGo(someCallback);

//set a timer
window.setTimeout(checkTimeSinceLastAjaxUpdate, TIMEOUT);

function someCallback() {
    alert('my callback; page now loaded!'); 
}

//This function will attach a listener to each AJAX request
function newXHR() {
    
    var updatedXHR = new currentXHR();

    //keep track of ajax calls
    listenerCount++;

    updatedXHR.addEventListener("readystatechange", function () {
        if (updatedXHR.readyState == 4 && updatedXHR.status == 200) {

            //reset lastReady each time an Ajax call comes back
            lastReady = new Date().getTime();
            
            listenerCount--;
        }
    }, false);
    
    return updatedXHR;
}

//a timer is used to check the listener count; When it is 0, call the callback function.
//we don't do this in the event handler above for two reason:
//  1) all the listeners may not have been added and we might have 0 listerers before all the listeners have been set up
//  2) If an ajax call doesn't come back, we need a timeout to declare the page is loaded.
function checkTimeSinceLastAjaxUpdate() {
    var timeSinceLastAjaxReturn = new Date().getTime() - lastReady;

    if (listenerCount > 0 && timeSinceLastAjaxReturn < MAX_WAIT) {
        //listeners are still present and we haven't reached our timeout
        window.setTimeout(checkTimeSinceLastAjaxUpdate, TIMEOUT);
    }
    else {
        //no more listener, call the callback
        callbackFunctionName();
    }
}
