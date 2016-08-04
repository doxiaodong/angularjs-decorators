/**
 * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
 * we need to pull out the array of dependencies and add it as an $inject property of the
 * actual constructor function.
 * @param input
 * @returns {*}
 * @private
 */
export function NormalizeConstructor(input) {
  let constructorFn

  if (input.constructor === Array) {
    //
    let injected = input.slice(0, input.length - 1)
    constructorFn = input[input.length - 1]
    constructorFn.$inject = injected
  } else {
    constructorFn = input
  }

  return constructorFn
}

/**
 * Convert a constructor function into a factory function which returns a new instance of that
 * constructor, with the correct dependencies automatically injected as arguments.
 *
 * In order to inject the dependencies, they must be attached to the constructor function with the
 * `$inject` property annotation.
 *
 * @param constructorFn
 * @returns {Array.<T>}
 * @private
 */
export function CreateFactoryArray(constructorFn) {
  // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
  let args = constructorFn.$inject || []
  let factoryArray = args.slice() // create a copy of the array
  // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
  // dependency, and the final item is the factory function itself.
  factoryArray.push(function () {
    for (let len = arguments.length, key = 0; key < len; key++) {
      args = Array(len)
      args[key] = arguments[key]
    }

    // return new constructorFn(...args);
    let instance = new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))()

    for (let key in instance) {
      if (true) { // 为了语法检查
        instance[key] = instance[key]
      }
    }
    return instance
  })

  return factoryArray
}

export function CloneFunction(original) {
  return function() {
    return original.apply(this, arguments)
  }
}

/**
 * Override an object's method with a new one specified by `callback`.
 * @param object
 * @param methodName
 * @param callback
 */
export function Override(object, methodName, callback) {
  object[methodName] = callback(object[methodName])
}
