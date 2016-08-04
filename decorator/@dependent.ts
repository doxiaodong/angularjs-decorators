interface IDependParam {
  dependents: any[]
}

export let Dependent = (param: IDependParam): Function => {
  return (constructor: Function): void => {
    constructor.prototype['dependents'] = param.dependents
  }
}
