var customHeaders;
var headerInjectionEnable;

/*
* Add listener for onBeforeSendHeaders events which provides access to headers.
*/
chrome.webRequest.onBeforeSendHeaders.addListener(function(info) {

		// Get already saved value of 'Enable' checkbox.
        chrome.storage.sync.get('headerInjectionEnable', function(items) {
            if (typeof items.headerInjectionEnable != "undefined") {
                headerInjectionEnable = items.headerInjectionEnable;
            }
        });

		// If 'Enable' checkbox is checked, then only add header.
        if (headerInjectionEnable) {
			
			// Get already saved value of header JSON.
            chrome.storage.sync.get('headerJson', function(items) {
                if (typeof items.headerJson != "undefined") {
                    customHeaders = JSON.parse(items.headerJson);
                }
            });

            if (customHeaders) {
				// Iterate over headers from JSON. If its new, then add header. 
				// If header is existing, then update value.
                for (var i = 0; i < customHeaders.length; i++) {
                    var headerObj = customHeaders[i];
                    var existing = false;

                    info.requestHeaders.forEach(function(header, i) {
                        console.log("header - " + headerObj.name.toLowerCase());
                        if (header.name.toLowerCase() == headerObj.name.toLowerCase()) {
                            header.value = headerObj.value;
                            existing = true;
                        }
                    });

                    if (!existing) {
                        info.requestHeaders.push({
                            name: headerObj.name,
                            value: headerObj.value
                        });
                    }
                }
            }
        }

		// Return updated header list.
        return {
            requestHeaders: info.requestHeaders
        };
    },
	// Do this for all URLs
    {
        urls: ["<all_urls>"]
    },
    ["blocking", "requestHeaders"]
);