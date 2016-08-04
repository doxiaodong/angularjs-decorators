// 未测试

import Module from './module'

export let Config = (): Function => {
  return (target: any, decoratedPropertyName?: string): void => {
    let constructor = (): Function => {
      return new target().config
    }
    Module.config(constructor)
  }
}
