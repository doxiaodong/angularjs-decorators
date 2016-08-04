// 未测试

import Module from './module'

export let Value = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {
    let constructor = (): any => {
      return new target().value
    }
    Module.value(name, constructor)
  }
}
