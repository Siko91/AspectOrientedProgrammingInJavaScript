
/** returns pretty much the same object, but makes it log when it's methods are called */
function objectWithLoggingMethods(obj, recursive){
    var result = {};
    var properties = [];
    for (var i in obj)
        properties.push(i);
    
    properties.forEach(function(i) {
        if (typeof obj[i] === "function") {
            result[i] = function(){
                var args= Object.keys(arguments).map(k=>arguments[k]);
                console.log("-----------------")
                console.log("Calling function '" + i + "' with ( " + args + " )");
                var outcome = obj[i].apply(this, args);
                console.log("Finished '" + i + "'. Outcome : " + outcome);
                return outcome;
            }
        }
        else if(recursive)
            result[i] = objectWithLoggingMethods(obj[i]);
        else
            result[i] = obj[i];
    }, this);

    if(properties.length == 0)
        result = obj;

    return result;
}

///// DEMONSTRATION /////

var exampleObject = {
    data:{theAnswer:{number:42}},
    add: function(a,b) {return a + b;},
    concat: function(a,b) {return a + "" + b;},
    addAsync: function(a,b,callback) { return callback(a + b); },
    contextAwareAdd: function() { return this.a + this.b; }
};

// normal usage of 'exampleObject'
var theAnswer = exampleObject.data.theAnswer.number;
var addResult = exampleObject.add(2,2);
var concatResult = exampleObject.concat(2,2);
exampleObject.addAsync(2,2, function (result) { console.dir("result: " + result); });
var contextAwareAddResult = exampleObject.contextAwareAdd.call({a:2,b:2});

// now lets substitude the object with our logging object
exampleObject = objectWithLoggingMethods(exampleObject);

console.log(" ");
console.log("###");
console.log("Let's run the same code as above, but with the logging object.");
console.log(" ");

// decorated usage of 'exampleObject' (it's exactly the same as the normal one)
var theAnswer = exampleObject.data.theAnswer.number;
var addResult = exampleObject.add(2,2);
var concatResult = exampleObject.concat(2,2);
exampleObject.addAsync(2,2, function (result) { console.log("result: " + result); });
var contextAwareAddResult = exampleObject.contextAwareAdd.call({a:2,b:2});