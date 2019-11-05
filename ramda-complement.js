var dir="/Users/logan/dev/typedef-gen/";
const R = require(dir + 'node_modules/ramda')
  // n is zero based, with 0 being "A".
  function argName(n) {
    return String.fromCodePoint(65 + n)
  }
  
  function argList(n) {
    return R.range(0, n).map(argName)
  }
  
  function argListString(n) {
    return argList(n).join(', ')
  }

function complementGenerator(arity) {
  return R.range(0, arity).map((a) => {
    const args = argListString(a)
    // Zero args means no comma to separate from Fn.
    const argSeparator = a > 0 ? ',' : ''
    return `\

declare function complement<${args}${argSeparator} Fn: (${args}) => boolean>(
  f: Fn
): Fn;`
  }).join('\n')
}

console.log('// The following code is generated from')
console.log('// https://github.com/LoganBarnett/typedef-gen due to Flow not being able to')
console.log('// preserve the input function\'s form as a return type.')
console.log('//')
console.log('// Begin generated complement declaration.')
console.log(complementGenerator(11))
console.log('// End generated complement declaration.')
