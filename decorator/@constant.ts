// 未测试

import Module from './module'

export let Constant = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {
    let constructor = (): any => {
      return new target().constant
    }
    Module.constant(name, constructor)
  }
}
