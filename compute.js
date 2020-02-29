const omitAttr = attr => obj => {
  const { [attr]: omit, ...rest }= obj;
  return rest;
}

const fnToName = defs => fn => {
  const named = Object.keys(defs)
    .map(name => ({
      name, str: compute(defs[name].func, {}, omitAttr(name)(defs))
    }))
    .find(f => f.str == fn );

  return (named && named.name) || fn
}

const lookupdefs = defs => name =>
  defs[name] && defs[name].func


const application = (ast, vars = {}, defs = {}) => {
  switch(ast.func.type) {
    case "function":
      return compute(ast.func.body, {...vars, [ast.func.arg]: ast.arg }, defs)
    case "app":
      return compute(ast.func, vars, defs)
    case "var":
      return application(
        {...ast, func: lookupdefs(defs)(ast.func.name) || ast.func },
        {...vars, [ast.func.arg]: ast.arg },
        defs
      )
    default:
      return `(${compute(ast.func, vars, defs)} ${compute(ast.arg, vars, defs)})`
  }
}

const compute = (ast, vars = {}, defs = {}) => {
  switch(ast.type) {
    case "withdefs":
      return compute(ast.exp, vars, ast.defs)
    case "app":
      return application(ast, vars, defs)
    case "function":
      return fnToName(defs)(
        `λ${ast.arg}.${compute(ast.body, vars, defs)}`
      )
    case "var":
      return compute(
        lookupdefs(defs)(ast.name) || vars[ast.name] || ast.name,
        omitAttr(ast.name)(vars),
        defs
      )
    default:
      return ast
  }
}

module.exports = compute;
