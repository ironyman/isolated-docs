const electron = require('electron');
// function search(){
//     const input = document.querySelector('input[name="q"]');
//     input.value = "test";
// }

// setTimeout(function(){ alert("Hello");search(); }, 3000);


function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}

function focusSearchOnKeyPress(e) {
    e = e || window.event;

    // It's the first one. Trust me, I'm an engineer.
    let searchBox = document.querySelectorAll('input')[0];

    if (searchBox === undefined) {
        console.error("Could not find search input box.");
        return;
    }

    searchBox.focus();
}

//const window = require('electron').BrowserWindow;
//let focusedWindow    = window.getFocusedWindow();
//let url = focusedWindow.webContents.getURL();

if (window.location.href.match(/^https:\/\/docs.google.com\/document\/u\/0\//)) {
    addEvent(document, "keypress", focusSearchOnKeyPress);
}