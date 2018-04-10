
/** returns pretty much the same object, but with decorated methods */
function objectWithTimeSpreadMethods(obj, timing){
    var result = {};
    var properties = [];
    var callQueue = [];
    for (var i in obj)
        properties.push(i);

    properties.forEach(function(i) {
        if (typeof obj[i] === "function") {
            result["__" + i] = obj[i];

            result[i] = function(){
                var args = Object.keys(arguments).map(k => arguments[k]); // obj to arr
                console.log("> Calling '" + i + "' with ( " + args + " )");
                callQueue.push([obj, i, this, args]);
            }
        }
        else
            result[i] = obj[i];
    }, this);

    if(properties.length == 0)
        result = obj;

    
    setInterval(function (params) {
        if (callQueue.length < 1)
            return;

        var call = callQueue.shift();

        var obj = call[0];
        var i = call[1];
        var self = call[2];
        var args = call[3];

        obj[i].apply(self, args);

    }, timing);

    return result;
}

///// DEMONSTRATION /////

var exampleObject = {
    data:{ theAnswer:{number:42} },
    add: function(a,b) {console.log(a + b);},
    concat: function(a,b) {console.log(a + "" + b);},
    addAsync: function(a,b,callback) { return callback(a + b); },
    contextAwareAdd: function() { return console.log(this.a + this.b); }
};

// normal usage of 'exampleObject'
console.log(exampleObject.data.theAnswer.number);
exampleObject.add(1,0);
exampleObject.concat(2,0);
exampleObject.addAsync(3,0, function (result) { console.dir("result: " + result); });
var contextAwareAddResult = exampleObject.contextAwareAdd.call({a:4,b:0});

// now lets substitude the object with our logging object
exampleObject = objectWithTimeSpreadMethods(exampleObject);

console.log(" ");
console.log("###");
console.log("Let's run the same code as above, but with the logging object.");
console.log(" ");

// decorated usage of 'exampleObject' (it's similar)
console.log(exampleObject.data.theAnswer.number);
exampleObject.add(1,0);
exampleObject.concat(2,0);
exampleObject.addAsync(3,0, function (result) { console.dir("result: " + result); });
var contextAwareAddResult = exampleObject.contextAwareAdd.call({a:4,b:0});
