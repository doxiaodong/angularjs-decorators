import Module from './module'

export let Service = (name: string): Function => {
  return (target: Function, decoratedPropertyName?: string): void => {
    Module.service(name, target)
  }
}
