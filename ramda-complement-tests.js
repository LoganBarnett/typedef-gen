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
       // n is zero based, with 0 being "A".
       function argName(n) {
         return String.fromCodePoint(65 + n)
       }
       
       function complementTestHeader(arity) {
         return R.map(R.pipe(
           argName,
           R.toLower,
           a => `${a}: '${a}',`,
         ), R.range(0, arity)).join(' ')
       }
       // n is zero based, with 0 being "A".
       function argName(n) {
         return String.fromCodePoint(65 + n)
       }
       
       function complementTestCall(arity) {
         return R.map(R.pipe(
           argName,
           R.toLower,
           a => `'${a}',`,
         ), R.range(0, arity)).join(' ')
       }

       function complementTestGenerator(arity) {
         return R.addIndex(R.map)((a, i) => {
           const args = argListString(a)
           return `\
it('returns a function whose parameters match the input function (${i})', () => {
  const fn = complement((${complementTestHeader(a)}) => true)
  fn(${complementTestCall(a)})
  ${a == 0
  ? `\
// Extra arguments are discarded, so there is no negative case here.`
  : `// $ExpectError
  fn(${R.map(R.toString, R.range(0, a)).join(', ')})`}
})
`

         }, R.range(0, arity)).join('\n')
       }

console.log('// The following code is generated from')
console.log('// https://github.com/LoganBarnett/typedef-gen due to Flow not being able to')
console.log('// preserve the input function\'s form as a return type.')
console.log('//')
console.log('// Begin generated complement test cases.')
console.log(complementTestGenerator(11))
console.log('// End generated complement test cases.')
