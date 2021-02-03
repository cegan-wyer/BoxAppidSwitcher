let changeAppid = document.getElementById('changeAppid');
let appid = document.getElementById('appid');

changeAppid.onclick = function(element) {
    let id = appid.value;
    console.log("Changing ids in current window to:" +id);
    chrome.tabs.query({'currentWindow': true}, function(tabs){
    // Replaces all instances of 5 digits in URL's containing the
    // phrase "nanolos"
    // Ignores any URLs containing set keywords or the new appid
        for (var i = 0; i < tabs.length; i++) {
			// Iterate through each tab and get the URL
            let currentTab = tabs[i];
            var tabURL = currentTab.url.toString();
			
			// Check if URL is an XDOX refresh URL
			// If so, change back to the standard URL format
			if(tabURL.includes("DocumentId")){
				tabURL = "https://docs.nanolos.com/xdoc/ui/xapps/viewer.aspx?AppLink=ContainerViewer&ContainerKey=12345&AppEmbed=0&ProjectId=1000"
			}
            
			// Confirm the URL is valid and the input is a 5-6 digit number
            if(isValidURL(tabURL) && /^\d{5,6}$/.test(id)){
                console.log("Changing: "+tabURL);
                // Use regex to replace the appid in the URL
                newURL = tabURL.replace(/\b\d{5,6}\b/g, id);
                console.log("New URL: "+newURL)
				
				// Update the URL of the current tab
                chrome.tabs.update(currentTab.id, {url: newURL});
            }
        };
        
    });
};

// Ignore any non-numerical keypresses
// (but sill allow backspace/delete keypresses)
appid.onkeypress = function(evt) {
    evt = evt || window.event;
    var charCode = evt.which || evt.keyCode;
    var charStr = String.fromCharCode(charCode);
    if(/[^\d]/.test(charStr)){
        return false;
    }
}
// Trigger click event on "Enter" keypress
appid.addEventListener("keypress", function(event) {
    if (event.keyCode == 13)
        changeAppid.click();
});

// Check URL for excluded terms and matching appid
// TODO: use regex match instead of multiple &&'s and test
function isValidURL(url){
    let id = appid.value;
    console.log("checking url: "+url);
    return url.toLowerCase().search("nanolos") != -1
            && url.toLowerCase().search("search") == -1
            && url.toLowerCase().search("queue") == -1
            && url.toLowerCase().search("pipeline") == -1
            && !containsAppid(url, id);
}

// Checks if URL contains a given appid
function containsAppid(url, appid){
    var regx = new RegExp("\\b"+appid+"\\b", "g");
    console.log("Does URL already contain appid? "+url.search(regx) >= 0);
    return url.search(regx) >= 0;
}
