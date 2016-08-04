// 未测试

import Module from './module'
import {
  CreateFactoryArray,
  NormalizeConstructor
} from './utils'

export let Provider = (name: string): Function => {
  return (target: any, decoratedPropertyName?: string): void => {

    let constructorFn = NormalizeConstructor(target)
    let factoryArray = CreateFactoryArray(constructorFn)

    Module.provider(name, factoryArray)
  }
}
