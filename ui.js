// Add a callback when HTML is loaded.
document.addEventListener('DOMContentLoaded', domLoadedCallback, false);

// This is a callback method once HTML is loaded. 
function domLoadedCallback() {

    // Get already saved value of header JSON & set it in UI text area.
    chrome.storage.sync.get('headerJson', function(items) {
        if (typeof items.headerJson != "undefined") {
            document.getElementById("header_input").value = items.headerJson;
        }
    });

    // Get already saved value of enable checkbox & check/uncheck UI checkbox with savd value.
    chrome.storage.sync.get('headerInjectionEnable', function(items) {
        if (typeof items.headerInjectionEnable != "undefined") {
            document.getElementById("enable").checked = items.headerInjectionEnable;
        }
    });

    // Add a call back for save button 
    document.getElementById('save').addEventListener('click', function() {
        buttonClickAction();
    });
}

/**
 * Action on save. Store value of enable checkbox & header JSON in chrome storage.
 */
function buttonClickAction() {
    chrome.storage.sync.set({
        'headerJson': document.getElementById('header_input').value
    }, function() {});
    chrome.storage.sync.set({
        'headerInjectionEnable': document.getElementById("enable").checked
    }, function() {});
    window.close();
}