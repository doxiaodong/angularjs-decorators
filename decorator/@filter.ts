import Module from './module'

export let Filter = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {
    let constructor = (): Function => {
      return new target().filter
    }
    Module.filter(name, constructor)
  }
}
