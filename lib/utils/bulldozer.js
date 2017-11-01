// for use in schematize: takes an object 
// and returns a function that takes two args
//   a property to be added to the base
//   and callback that sets that new prop's value to
//      the value at the bottom of a potentially broken nested object
//      or null
//
//   callback example: () => rawData.prop1['prop2'].prop3.text

module.exports = (obj) => (property, callback) => {
    try {
        obj[property] = callback();
    }
    catch(err) {
        if(property === 'languages') debugger;
        obj[property] = null;
    }
};