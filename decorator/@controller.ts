import Module from './module'

export let Controller = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {
    Module.controller(name, target)
  }
}
