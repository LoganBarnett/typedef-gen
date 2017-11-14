const R = require('ramda')
// n is zero based, with 0 being "A".
function argName(n) {
  return String.fromCodePoint(65 + n)
}

function argList(skip, n) {
  return R.range(skip, n).map(argName)
}

function argListString(skip, n) {
  return argList(skip, n).join(', ')
}

function permutationsForArity(arity) {
  return R.range(0, arity).map((perm) => {
    const n = arity - perm
    return `\
(<${argListString(0, arity)}, R>(
  (...r: [${argListString(0, arity)}]) => R,
  args: [${argListString(0, n)}],
) => ((${argListString(n, arity)}) => R))`
  }).reverse()
}

function ramdaPartial(arity) {
  return R.flatten(
    R.range(0, arity).map(n => permutationsForArity(n)),
  ).join(' &\n')
}

console.log(ramdaPartial(10))
