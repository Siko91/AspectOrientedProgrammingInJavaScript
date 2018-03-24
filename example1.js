/** wraps a standart callback (err, data) to add log statements around it */
function callbackWithLog(callback) {
    var result = function (err, data) {
        if (!err) {
            console.log("--> Success! result: " + data);
            callback(undefined, data);
        } else {
            console.log("--> Something went wrong.");
            console.log("--> " + err);
            callback(err);
        }
    };
    result.toString = function(){ return "function callbackWithLog(err,data){/**...*/}"; };
    return result;
}

///// DEMONSTRATION /////

function exampleFunction(data, callback){
    var willSucceed = Math.random()+0.5 >= 1;
    if (willSucceed) {
        callback(undefined, data);
    } else {
        callback("Error: " + data, undefined);
    }
}

for (var i = 0; i < 5; i++)
    exampleFunction("FooBar", callbackWithLog(function (err,data) {
        console.log("no need to log. Just consume the results");
        console.log("...")
    }));