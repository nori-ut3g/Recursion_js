function capitalizeDecorator(f) {
    return function(arg) {
        return f(arg.slice(0,1).toUpperCase() + arg.slice(1));
    }
}
function lowercaseResultDecorator(f) {
    return function(arg) {
        return f(arg.toLowerCase());
    }
}
function printInfoDecorator(f) {
    return function(arg1) {
        console.log(arg1)
        console.log(f(arg1))
        return f
    }
}

let argsExample = "test TEST"

let func1 = capitalizeDecorator(arg=>(arg));
let func2 = lowercaseResultDecorator(arg=>(arg));
let func3 = printInfoDecorator(func1);
func3(argsExample)
// console.log(func2(argsExample))