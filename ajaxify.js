/*
 This is a basic AJAX utility to quickly make server calls
 Author: K.C.Ashish Kumar
 website: https://kcak11.com
 License: https://mit-license.kcak11.com
*/

(function(w) {
    var API = w.$api;
    if (!API) {
        API = w.$api = {};
    } else {
        return;
    }
    API.call = function(config) {
        if (!config || !config.method || !config.url) {
            throw new Error("Incorrect Configuration - Cannot invoke the call.");
        }
        var xhr = new XMLHttpRequest();
        xhr.open(config.method, config.url, true);
        xhr.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    typeof config.success === "function" && config.success(this.responseText);
                } else {
                    typeof config.failure === "function" && config.failure(this.responseText);
                }
            }
        };
        xhr.onerror = function(err) {
            typeof config.failure === "function" && config.failure(err);
        };
        if (config.headers) {
            Object.getOwnPropertyNames(config.headers).forEach(function(header) {
                xhr.setRequestHeader(header, config.headers[header]);
            });
        }
        var data = config.payload || null;
        if (data && typeof data !== "string") {
            try {
                data = JSON.stringify(data);
            } catch (exjs) {
              //cannot parse JSON
            }
        }
        //For requests with FormData pass the payload.header with "Content-type":"application/x-www-form-urlencoded"
        //For requests with JSONData pass the payload.header with "Content-type":"application/json"
        xhr.send(data);
    };
}(window));
