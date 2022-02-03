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

   if (!window.location.href.match(/^https:\/\/docs.google.com\/document\/u\/0\/$/)) {
       return;
   }

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

// So new document url starts like https://docs.google.com/document/u/0/
// then changes to something else so we don't want to addEvent for new documents.
// Otherwise key press outside of document will focus doc name text box,
// which is fine except after naming document, you can't exit focus the doc name text box.
// So we match that url exactly. But returning to doc list via clicking top left doc button
// is slightly different url, before changing to https://docs.google.com/document/u/0/.
// The slightly different url is https:\/\/docs.google.com\/document\/u\/0\/\?usp=docs_alc
// and our code here is executed only for first url not the changed url, in both cases.
// The easiest way to solve this is to return early when current location.href is not
// https://docs.google.com/document/u/0/.
// The behavior is different in webextension where webextension code is executed after
// the changed url so we didn't have to consider these cases.
if (window.location.href.match(/^https:\/\/docs.google.com\/document\/u\/0\//)) {
    addEvent(document, "keypress", focusSearchOnKeyPress);
}