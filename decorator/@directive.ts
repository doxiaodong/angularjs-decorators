import Module from './module'
import {
  CloneFunction,
  CreateFactoryArray,
  NormalizeConstructor,
  Override
} from './utils'

export let Directve = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {

    let constructorFn = NormalizeConstructor(target)

    if (!constructorFn.prototype.compile) {
      // create an empty compile function if none was defined.
      constructorFn.prototype.compile = function() {
        return null
      }
    }

    let originalCompileFn = CloneFunction(constructorFn.prototype.compile)

    // Decorate the compile method to automatically return the link method (if it exists)
    // and bind it to the context of the constructor (so `this` works correctly).
    // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
    // returns `this.link` from within the compile function.
    Override(constructorFn.prototype, 'compile', function () {
      return function() {
        originalCompileFn.apply(this, arguments)

        if (constructorFn.prototype.link) {
          return constructorFn.prototype.link.bind(this)
        }
      }
    })

    let factoryArray = CreateFactoryArray(constructorFn)

    Module.directive(name, factoryArray)
  }
}
