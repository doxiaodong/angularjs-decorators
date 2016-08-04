import Module from './module'

export let Component = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {
    let constructorObj = new target()
    Module.component(name, constructorObj)
  }
}
