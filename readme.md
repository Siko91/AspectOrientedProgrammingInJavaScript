# Examples of Aspect Oriented Programming in JavaScript

> These examples are in no way definitive or complete. They simply demonstrate the concept with while using a naive approach. Somebody profficient with prototyping could probably give much better examples... I can't do that at the moment.


Examples:

 - example1.js : 
    - wrapping a standart callback function ( ```function(err,data){}``` ) to handle logging 
    - (easy to use and easy to implement)

 - example2.js : 
    - wrapping an object to handle logging when any of it's methods are called;
    - (super easy to use but **not as easy** to implement)

 - example3.js : 
    - wrapping an object to handle timing of when it's methods are called. (2 methods shouldnt be called too close in time to each other)
    - (super easy to use but **not as easy** to implement)
