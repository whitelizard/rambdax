[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/rambdax.svg)](https://circleci.com/gh/selfrefactor/rambdax)
[![codecov](https://codecov.io/gh/selfrefactor/rambdax/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/rambdax)

# Rambdax

Extended version of Rambda(utility library) - [Documentation](https://selfrefactor.github.io/rambdax/#/)

## Simple example

```
const R = require("rambdax")

const result = R.compose(
  R.filter(val => val>2),
  R.flatten,
)([ [1], [2], [3], 4])
console.log(result) // => [3, 4]
```

## How to use it

Simple `yarn add rambdax` is sufficient

> ES5 compatible version - `yarn add rambdax#0.8.0`

## Differences between Rambda and Ramdax

Rambdax passthrough all [Rambda](https://github.com/selfrefactor/rambda) methods and introduce some new functions.

The idea of **Rambdax** is to extend **Rambda** without worring for **Ramda** compatibility.

- `Rambdax` replaces `Rambda`'s `is` with very different method. Check the API below for further details.

## Typescript

You will need at least version `3.0.0` for `Rambdax` versions after `0.12.0`.

## API

Methods between `allFalse` and `when` belong to **Rambdax**, while methods between `add` and `without` are inherited from **Rambda**.

---
#### allFalse

> allFalse(...inputs: any[]): boolean

It returns `true` if all passed elements return `false` when passed to `Boolean`.

```
R.allFalse(null, undefined, '')
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allFalse.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.allFalse(null%2C%20undefined%2C%20'')%0A%2F%2F%3D%3E%20true">Try in REPL</a>

---
#### allTrue

> allTrue(...inputs: any[]): boolean

It returns `true` if all passed elements return `true` when passed to `Boolean`.

```
const x = 2
R.allTrue([1,2], x > 1, {})
//=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/allTrue.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20const%20x%20%3D%202%0AR.allTrue(%5B1%2C2%5D%2C%20x%20%3E%201%2C%20%7B%7D)%0A%2F%2F%3D%3E%20true">Try in REPL</a>

---
#### change

> change(origin: object, path: string, changeData: any): object

It helps changing object's properties if there are below 3 levels deep.

Explanation:

`path` provide way to specify which object's sub-branch you want to manipulate. Pass empty string if you target the whole `origin` object.

`changeData` can be a direct value. If it is a object, then this object is used to edit or add new properties to the selected sub-branch. 

```
const simpleResult = change(
  { a: 1, b: { c: 2 } },
  'b.c',
  3
)
const expectedSimpleResult = {
  a: 1,
  b: { c: 3 }
}
// simpleResult === expectedSimpleResult

const origin = {
  a   : 0,
  foo : {
    bar : 1,
    bax : { nested : 2 },
  },
}
const changeData = {
  bar: 2,
  bay: 3,
  bax: { baq: 9 }
}
const result = change(
  origin,
  'foo',
  changeData
)

const expectedResult = {
  a   : 0,
  foo : {
    bar : 2,
    bay : 3,
    bax : {
      nested : 2,
      baq: 9
    },
  },
}
// result === expectedResult
```

---
#### compact

> compact(arr: any[]): any[]

It removes the empty values from an array.

```
const arr = [
  1,
  null,
  undefined,
  false,
  "",
  " ",
  "foo",
  {},
  [],
  [1],
  /\s/g
]

const result = R.compact(arr)
const expectedResult = [1, false, " ", "foo", [1]]
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/compact.js)

<a href="https://rambda.now.sh?const%20arr%20%3D%20%5B%0A%20%201%2C%0A%20%20null%2C%0A%20%20undefined%2C%0A%20%20false%2C%0A%20%20%22%22%2C%0A%20%20%22%20%22%2C%0A%20%20%22foo%22%2C%0A%20%20%7B%7D%2C%0A%20%20%5B%5D%2C%0A%20%20%5B1%5D%2C%0A%20%20%2F%5Cs%2Fg%0A%5D%0A%0Aconst%20result%20%3D%20R.compact(arr)%0Aconst%20expectedResult%20%3D%20%5B1%2C%20false%2C%20%22%20%22%2C%20%22foo%22%2C%20%5B1%5D%5D%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### composeAsync

> composeAsync(...fns: Array<Function|Async>)(startValue: any): Promise

Asyncronous version of `R.compose`.

Note that you should wrap the block with this function with `try/catch` in order to handle possible errors.

Also functions that returns `Promise` will be handled as regular function not asynchronous. Such example is `const foo = input => new Promise(...)`.

```
const fn = async x => {
  await R.delay(500)
  return x+1
}
const fnSecond = async x => fn(x)

const result = R.composeAsync(
  fn,
  fnSecond
)(0)
// `result` resolves to `2`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/composeAsync.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(500)%0A%20%20return%20x%2B1%0A%7D%0Aconst%20fnSecond%20%3D%20async%20x%20%3D%3E%20fn(x)%0A%0Aconst%20result%20%3D%20R.composeAsync(%0A%20%20fn%2C%0A%20%20fnSecond%0A)(0)%0A%2F%2F%20%60result%60%20resolves%20to%20%602%60">Try in REPL</a>

---
#### debounce

> debounce(fn: Function, ms: number): any

Creates a debounced function that delays invoking `fn` until after wait milliseconds `ms` have elapsed since the last time the debounced function was invoked. (description is taken from `Lodash` docs)

```
let counter = 0
const inc = () => {
  counter++
}
const debouncedInc = R.debounce(inc, 900)

const result = async function(){
  debouncedInc()
  await R.delay(500)
  debouncedInc()
  await R.delay(800)
  console.log(counter) //=> 0

  await R.delay(1000)
  console.log(counter) //=> 1

  return counter
}
// `result` resolves to `1`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/debounce.js)

<a href="https://rambda.now.sh?let%20counter%20%3D%200%0Aconst%20inc%20%3D%20()%20%3D%3E%20%7B%0A%20%20counter%2B%2B%0A%7D%0Aconst%20debouncedInc%20%3D%20R.debounce(inc%2C%20900)%0A%0Aconst%20result%20%3D%20async%20function()%7B%0A%20%20debouncedInc()%0A%20%20await%20R.delay(500)%0A%20%20debouncedInc()%0A%20%20await%20R.delay(800)%0A%20%20console.log(counter)%20%2F%2F%3D%3E%200%0A%0A%20%20await%20R.delay(1000)%0A%20%20console.log(counter)%20%2F%2F%3D%3E%201%0A%0A%20%20return%20counter%0A%7D%0A%2F%2F%20%60result%60%20resolves%20to%20%601%60">Try in REPL</a>

---
#### defaultWhen

> defaultWhen(fn: Function, fallback: T, input: any): T

It returns `fallback`, if `input` returns `false` when applied to `fn`.

It returns `input` in the other case.

```
const fn = x => x > 2
const fallback = 10
const result = R.defaultWhen(fn, fallback, 1)
// `result` is `10`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/defaultWhen.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20x%20%3D%3E%20x%20%3E%202%0Aconst%20fallback%20%3D%2010%0Aconst%20result%20%3D%20R.defaultWhen(fn%2C%20fallback%2C%201)%0A%2F%2F%20%60result%60%20is%20%6010%60">Try in REPL</a>

---
#### delay

> delay(ms: number): Promise

`setTimeout` as a promise that resolves to `R.DELAY` variable.

The value of `R.DELAY` is `'RAMBDAX_DELAY'`.

```
const result = R.delay(1000)
// `result` resolves to `'RAMBDAX_DELAY'`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/delay.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.delay(1000)%0A%2F%2F%20%60result%60%20resolves%20to%20%60'RAMBDAX_DELAY'%60">Try in REPL</a>

---
#### evolve

> evolve (rules: Object, input: Object): Object

Properties of `input` object are transformed according to `rules` object that contains functions as values.

If property `prop` of `rules` is a function and also a property of `input`, then `input[prop]` will be equal to the result of `rules[prop](input[prop])`.

`rules[prop]` can be also a object that contains functions, as you can see in the example below:

```
const input = {
  firstName : '  Tomato ',
  data      : {
    elapsed   : 100,
    remaining : 1400,
  },
  id : 123,
}
const rules = {
  firstName : R.trim,
  lastName  : R.trim, //Will not get invoked.
  data      : {
    elapsed   : R.add(1),
    remaining : R.add(-1),
  },
}

const result = R.evolve(rules, input)

const expectedResult = {
  firstName: 'Tomato',
  data: {
    elapsed: 101,
    remaining: 1399,
  },
  id: 123,
}
console.log(result === expectedResult)
// true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/evolve.js)

<a href="https://rambda.now.sh?const%20input%20%3D%20%7B%0A%20%20firstName%20%3A%20'%20%20Tomato%20'%2C%0A%20%20data%20%20%20%20%20%20%3A%20%7B%0A%20%20%20%20elapsed%20%20%20%3A%20100%2C%0A%20%20%20%20remaining%20%3A%201400%2C%0A%20%20%7D%2C%0A%20%20id%20%3A%20123%2C%0A%7D%0Aconst%20rules%20%3D%20%7B%0A%20%20firstName%20%3A%20R.trim%2C%0A%20%20lastName%20%20%3A%20R.trim%2C%20%2F%2FWill%20not%20get%20invoked.%0A%20%20data%20%20%20%20%20%20%3A%20%7B%0A%20%20%20%20elapsed%20%20%20%3A%20R.add(1)%2C%0A%20%20%20%20remaining%20%3A%20R.add(-1)%2C%0A%20%20%7D%2C%0A%7D%0A%0Aconst%20result%20%3D%20R.evolve(rules%2C%20input)%0A%0Aconst%20expectedResult%20%3D%20%7B%0A%20%20firstName%3A%20'Tomato'%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20elapsed%3A%20101%2C%0A%20%20%20%20remaining%3A%201399%2C%0A%20%20%7D%2C%0A%20%20id%3A%20123%2C%0A%7D%0Aconsole.log(result%20%3D%3D%3D%20expectedResult)%0A%2F%2F%20true">Try in REPL</a>

---
#### findInObject

> findInObject(fn: Function, obj: object): object

It will return object with properties `prop` and `value` if predicate function returns `true` for a pair of property and value within `obj`.

If predicate cannot be satisfied, it returns `{fallback: true}`.

```
const fn = (x, key) => x > 1 && key.length > 1
const obj = {
  a   : 1,
  b   : 2,
  foo : 3,
}

const result = findInObject(fn, obj)
// => { prop  : 'foo',value : 3}
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/findInObject.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20(x%2C%20key)%20%3D%3E%20x%20%3E%201%20%26%26%20key.length%20%3E%201%0Aconst%20obj%20%3D%20%7B%0A%20%20a%20%20%20%3A%201%2C%0A%20%20b%20%20%20%3A%202%2C%0A%20%20foo%20%3A%203%2C%0A%7D%0A%0Aconst%20result%20%3D%20findInObject(fn%2C%20obj)%0A%2F%2F%20%3D%3E%20%7B%20prop%20%20%3A%20'foo'%2Cvalue%20%3A%203%7D">Try in REPL</a>

---
#### greater

> greater(x: number, y: number): boolean

It return true if the second argument is greater than the first argument.

Note that this is opposite direction compared to Rambda's `gt` method, because it makes more sense in `R.compose` context.

```
R.greater(1,2) // => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/greater.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.greater(1%2C2)%20%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### inject

> inject(injection: string, marker: string, str: string): string

```
const result = R.inject(
  ' INJECTION',
  'MARKER',
  'foo bar MARKER baz'
)

const expectedResult = 'foo bar MARKER INJECTION baz'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/inject.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.inject(%0A%20%20'%20INJECTION'%2C%0A%20%20'MARKER'%2C%0A%20%20'foo%20bar%20MARKER%20baz'%0A)%0A%0Aconst%20expectedResult%20%3D%20'foo%20bar%20MARKER%20INJECTION%20baz'">Try in REPL</a>

---
#### is

> is(...inputs: any[]): (schemas: any[]) => boolean

It checks if `inputs` are following `schemas` specifications.

It uses underneath [R.isValid](#isvalid)

If validation fails, it returns `false`.

```
const result = R.is(1,['foo','bar'])('number',['string'])
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/is.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.is(1%2C%5B'foo'%2C'bar'%5D)('number'%2C%5B'string'%5D)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### isAttach

> isAttach(): boolean

It attaches `is` method to object-like variables. This `is` method acts like `R.is`.

It returns `true` when it is called initially and it returns `false` for sequential calls.

```
R.isAttach()
const foo = [1,2,3]

const result = foo.is(['number'])
// => true
```

---
#### isNil

> isNil(x: any): boolean

It returns `true` is `x` is either `null` or `undefined`.

```
R.isNil(null)  // => true
R.isNil(1)  // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/isNil.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.isNil(null)%20%20%2F%2F%20%3D%3E%20true%0AR.isNil(1)%20%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### isPromise

> isPromise(x: any): boolean

It returns true if `x` is either async function or unresolved promise.

```
R.isPromise(R.delay)
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isPromise.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.isPromise(R.delay)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### isType

> isType(xType: string, x: any): boolean

It returns true if `x` matches the type returned from `R.type`.

```
R.isType('Async',async () => {})
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isType.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.isType('Async'%2Casync%20()%20%3D%3E%20%7B%7D)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### isValid

> isValid({ input: object: schema: object }): boolean

It checks if `input` is following `schema` specifications.

If validation fails, it returns `false`.

Please [check the detailed explanation](https://github.com/selfrefactor/rambdax/blob/master/files/isValid.md) as it is hard to write a short description of this method.

```
const result = R.isValid({
  input:{ a: ['foo','bar'] },
  schema: {a: ['string'] }
})  
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/isValid.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.isValid(%7B%0A%20%20input%3A%7B%20a%3A%20%5B'foo'%2C'bar'%5D%20%7D%2C%0A%20%20schema%3A%20%7Ba%3A%20%5B'string'%5D%20%7D%0A%7D)%20%20%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### less

> less(x: number, y: number): boolean

It return true if the second argument is less than the first argument.

Note that this is opposite direction compared to Rambda's `lt` method, because it makes more sense in `R.compose` context.

```
R.less(2,1) // => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/less.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.less(2%2C1)%20%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### mapAsync

> mapAsync(fn: Async|Promise, arr: Array): Promise

Sequential asynchronous mapping with `fn` over members of `arr`.

```
async function fn(x){
  await R.delay(1000)

  return x+1
}

const result = R.composeAsync(
  R.mapAsync(fn),
  R.map(x => x*2)
)( [1, 2, 3] )

// `result` resolves after 3 seconds to `[3, 5, 7]`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mapAsync.js)

<a href="https://rambda.now.sh?async%20function%20fn(x)%7B%0A%20%20await%20R.delay(1000)%0A%0A%20%20return%20x%2B1%0A%7D%0A%0Aconst%20result%20%3D%20R.composeAsync(%0A%20%20R.mapAsync(fn)%2C%0A%20%20R.map(x%20%3D%3E%20x*2)%0A)(%20%5B1%2C%202%2C%203%5D%20)%0A%0A%2F%2F%20%60result%60%20resolves%20after%203%20seconds%20to%20%60%5B3%2C%205%2C%207%5D%60">Try in REPL</a>

---
#### mapFastAsync

> mapFastAsync(fn: Async|Promise, arr: Array): Promise

Parrallel asynchronous mapping with `fn` over members of `arr`.

```
async function fn(x){
  await R.delay(1000)

  return x+1
}

const result = R.composeAsync(
  R.mapAsync(fn),
  R.map(x => x*2)
)( [1, 2, 3] )

// `result` resolves after 1 second to `[3, 5, 7]`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mapFastAsync.js)

<a href="https://rambda.now.sh?async%20function%20fn(x)%7B%0A%20%20await%20R.delay(1000)%0A%0A%20%20return%20x%2B1%0A%7D%0A%0Aconst%20result%20%3D%20R.composeAsync(%0A%20%20R.mapAsync(fn)%2C%0A%20%20R.map(x%20%3D%3E%20x*2)%0A)(%20%5B1%2C%202%2C%203%5D%20)%0A%0A%2F%2F%20%60result%60%20resolves%20after%201%20second%20to%20%60%5B3%2C%205%2C%207%5D%60">Try in REPL</a>

---
#### memoize

> memoize(fn: Function|Promise): any

When `fn` is called for a second time with the same input, then the cache result is returned instead of calling `fn`.

```
let counter = 0
const fn = (a,b) =>{
  counter++
  
  return a+b
}
const memoized = R.memoize(fn)
memoized(1,2)
memoized(1,2)
console.log(counter) //=> 1
```

---
#### mergeAll

> mergeAll(input: Object[]): Object

It merges all objects of `input` array sequentially and returns the result.

```
const arr = [
  {a:1},
  {b:2},
  {c:3}
]
const expectedResult = {
  a:1,
  b:2,
  c:3
}
const result = R.mergeAll(arr)
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/mergeAll.js)

<a href="https://rambda.now.sh?const%20arr%20%3D%20%5B%0A%20%20%7Ba%3A1%7D%2C%0A%20%20%7Bb%3A2%7D%2C%0A%20%20%7Bc%3A3%7D%0A%5D%0Aconst%20expectedResult%20%3D%20%7B%0A%20%20a%3A1%2C%0A%20%20b%3A2%2C%0A%20%20c%3A3%0A%7D%0Aconst%20result%20%3D%20R.mergeAll(arr)%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### multiline

> multiline(input: string, glue?: string): string

It transforms multiline strings to single line.

```
const result = R.multiline(`
  foo
  bar
  baz
`)

const expectedResult = 'foo bar baz'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/multiline.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.multiline(%60%0A%20%20foo%0A%20%20bar%0A%20%20baz%0A%60)%0A%0Aconst%20expectedResult%20%3D%20'foo%20bar%20baz'%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### ok

> ok(...inputs: any[]): (schemas: any[]) => true | Error

It checks if `inputs` are following `schemas` specifications.

It uses underneath [R.isValid](#isvalid).

If validation fails, it throws. If you don't want that, then you can use `R.is`.  It is the same as `R.ok` method, but it returns `false` upon failed validation.

```
const result = R.ok(
  1, [ 'foo', 'bar' ]
)('number', [ 'string' ])
// => true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/ok.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.ok(%0A%20%201%2C%20%5B%20'foo'%2C%20'bar'%20%5D%0A)('number'%2C%20%5B%20'string'%20%5D)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### okInit

> okInit(schemas: object): undefined

It allows `R.ok` and `R.is` to be initialized with set of schemas.
It can be used multiple times, each time adding rules to the set.

```
R.okInit({
  foo : {
    a : 'number',
    b : 'string',
  },
  bar : {
    c : [ 'number' ],
    d : [ 'string' ],
  },
})

const result = ok({
  a : 1,
  b : 'baz',
})('foo')
// result === true
```

---
#### omitBy

> omitBy(fn: function, input: Object): Object

It returns only those properties of `input` that return `false` when passed to `fn`.

```
const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const fn = (prop, val) => val < 3
const expectedResult = {
  c: 3,
  d: 4,
}
const result = R.omitBy(fn, input)
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/omitBy.js)

<a href="https://rambda.now.sh?const%20input%20%3D%20%7B%0A%20%20a%3A%201%2C%0A%20%20b%3A%202%2C%0A%20%20c%3A%203%2C%0A%20%20d%3A%204%2C%0A%7D%0Aconst%20fn%20%3D%20(prop%2C%20val)%20%3D%3E%20val%20%3C%203%0Aconst%20expectedResult%20%3D%20%7B%0A%20%20c%3A%203%2C%0A%20%20d%3A%204%2C%0A%7D%0Aconst%20result%20%3D%20R.omitBy(fn%2C%20input)%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### once

> once(fn: Function): Function

It returns a function, which invokes only once`fn`.

```
const addOneOnce = R.once((a, b, c) => a + b + c)

console.log(addOneOnce(10, 20, 30)) //=> 60
console.log(addOneOnce(1, 2, 3)) //=> 60
```

---
#### pickBy

> pickBy(fn: Function, input: Object): Object

It returns only those properties of `input` that return `true` when passed to `fn`.

```
const input = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
const fn = (prop,val) => val > 3 || prop === 'a'
const expectedResult = {
  a: 1,
  d: 4,
}
const result = R.pickBy(fn, input)
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/pickBy.js)

<a href="https://rambda.now.sh?const%20input%20%3D%20%7B%0A%20%20a%3A%201%2C%0A%20%20b%3A%202%2C%0A%20%20c%3A%203%2C%0A%20%20d%3A%204%2C%0A%7D%0Aconst%20fn%20%3D%20(prop%2Cval)%20%3D%3E%20val%20%3E%203%20%7C%7C%20prop%20%3D%3D%3D%20'a'%0Aconst%20expectedResult%20%3D%20%7B%0A%20%20a%3A%201%2C%0A%20%20d%3A%204%2C%0A%7D%0Aconst%20result%20%3D%20R.pickBy(fn%2C%20input)%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### produce

> produce(conditions: Object, input: any): Promise|Object

```
const conditions = {
  foo: a => a > 10,
  bar: a => ({baz:a})
}

const result = R.produce(conditions, 7)

const expectedResult = {
  foo: false,
  bar: {baz: 7}
}
// result === expectedResult
```

`conditions` is an object with sync or async functions as values.

The values of the returned object `returnValue` are the results of those functions when `input` is passed.
The properties of the returned object are equal to `input`.

If any of the `conditions` is a `Promise`, then the returned value is a `Promise` that resolves to `returnValue`.

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/produce.js)

<a href="https://rambda.now.sh?const%20conditions%20%3D%20%7B%0A%20%20foo%3A%20a%20%3D%3E%20a%20%3E%2010%2C%0A%20%20bar%3A%20a%20%3D%3E%20(%7Bbaz%3Aa%7D)%0A%7D%0A%0Aconst%20result%20%3D%20R.produce(conditions%2C%207)%0A%0Aconst%20expectedResult%20%3D%20%7B%0A%20%20foo%3A%20false%2C%0A%20%20bar%3A%20%7Bbaz%3A%207%7D%0A%7D%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### promiseAllObject

> promiseAllObject(promises: Object): Promise

It acts as `Promise.all` for object with Promises.
It returns a promise that resolve to object.

```
const fn = ms => new Promise(resolve => {
  setTimeout(() => {
    resolve(ms)
  }, ms)
})
const promises = {
  a : fn(1),
  b : fn(2),
}

const result = R.promiseAllObject(promises)
const expectedResult = { a:1, b:2 }
// `result` resolves to `expectedResult`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/promiseAllObject.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20ms%20%3D%3E%20new%20Promise(resolve%20%3D%3E%20%7B%0A%20%20setTimeout(()%20%3D%3E%20%7B%0A%20%20%20%20resolve(ms)%0A%20%20%7D%2C%20ms)%0A%7D)%0Aconst%20promises%20%3D%20%7B%0A%20%20a%20%3A%20fn(1)%2C%0A%20%20b%20%3A%20fn(2)%2C%0A%7D%0A%0Aconst%20result%20%3D%20R.promiseAllObject(promises)%0Aconst%20expectedResult%20%3D%20%7B%20a%3A1%2C%20b%3A2%20%7D%0A%2F%2F%20%60result%60%20resolves%20to%20%60expectedResult%60">Try in REPL</a>

---
#### promiseAllSecure

> promiseAllSecure(promises: Array): Array<{type: 'RESULT'|'ERROR', payload:any}>

It acts as `Promise.all` with fault tollerance.

Occurence of error `err` in any of the `promises` adds `{type: 'ERROR', payload: err}` to the final result.
Result `result` in any of the `promises` adds `{type: 'RESULT', payload: result}` to the final result.

```
const fn = async () => {
  try {
    JSON.parse("{:a")
  }
  catch (err) {
    throw new Error(err)
  }
}

const result = R.promiseAllSecure([
  R.delay(2000),
  fn(1000)
])

const expectedResult = [
  {
    "payload": 'RAMBDAX_DELAY',
    "type": "RESULT"
  },
  {
    payload:"Unexpected token : in JSON at position 1",
    type: "ERROR"
  }
]
// `result` resolves to `expectedResult`
```

---
#### random

> random(min: number, max: number): number

It returns a random number between `min` inclusive and `max` inclusive.

---
#### rangeBy

> rangeBy(start: number, end: number, step: number): number[]

It returns array of all numbers between `start` and `end`, when the step of increase is `step`.

```
const result = R.rangeBy(0, 10, 2)
// => [0, 2, 4, 6, 8, 10])

console.log(R.rangeBy(0, 2, 0.3))
// =>[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8]
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/rangeBy.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.rangeBy(0%2C%2010%2C%202)%0A%2F%2F%20%3D%3E%20%5B0%2C%202%2C%204%2C%206%2C%208%2C%2010%5D)%0A%0Aconsole.log(R.rangeBy(0%2C%202%2C%200.3))%0A%2F%2F%20%3D%3E%5B0%2C%200.3%2C%200.6%2C%200.9%2C%201.2%2C%201.5%2C%201.8%5D">Try in REPL</a>

---
#### remove

> remove(inputs: string|RegExp[], text: string): string

It will remove all inputs from `text` sequentially.

```
const result = R.remove(
  ['foo','bar']),
  'foo bar baz foo'
)
// => 'baz foo'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/remove.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.remove(%0A%20%20%5B'foo'%2C'bar'%5D)%2C%0A%20%20'foo%20bar%20baz%20foo'%0A)%0A%2F%2F%20%3D%3E%20'baz%20foo'">Try in REPL</a>

---
#### renameProps

> renameProps(rules: Object, input: Object): Object

If property `prop` of `rules` is also a property in `input`, then rename `input` property to `rules[prop]`.

```
const rules = {
  f: "foo",
  b: "bar"
}
const input = {
  f:1,
  b:2
}
const result = R.renameProps(rules, input)
const expectedResult = {
  foo:1,
  bar:2
}
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/renameProps.js)

<a href="https://rambda.now.sh?const%20rules%20%3D%20%7B%0A%20%20f%3A%20%22foo%22%2C%0A%20%20b%3A%20%22bar%22%0A%7D%0Aconst%20input%20%3D%20%7B%0A%20%20f%3A1%2C%0A%20%20b%3A2%0A%7D%0Aconst%20result%20%3D%20R.renameProps(rules%2C%20input)%0Aconst%20expectedResult%20%3D%20%7B%0A%20%20foo%3A1%2C%0A%20%20bar%3A2%0A%7D%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### s

> s(): undefined

Taken from `https://github.com/staltz/zii`
Chain function calls using a prototype function `s`

```
// To turn it on
R.s()

// Then
const result = 'foo'
  .s(R.toUpper)
  .s(R.take(2))
  .s(R.add('bar'))

const expectedResult = 'barFO'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/promiseAllSecure.js)

<a href="https://rambda.now.sh?%2F%2F%20To%20turn%20it%20on%0AR.s()%0A%0A%2F%2F%20Then%0Aconst%20result%20%3D%20'foo'%0A%20%20.s(R.toUpper)%0A%20%20.s(R.take(2))%0A%20%20.s(R.add('bar'))%0A%0Aconst%20expectedResult%20%3D%20'barFO'%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### shuffle

> shuffle(arr: T[]): T[]

It returns randomized copy of array.

---
#### switcher

Edited fork of [Switchem](https://github.com/planttheidea/switchem) library.

It is best explained with the following example:

```
const valueToMatch = {foo: 1}

const result = R.switcher(valueToMatch)
  .is('baz', 'is baz')
  .is( x => typeof x === 'boolean', 'is boolean')
  .is({foo: 1}, 'Property foo is 1')
  .default('is bar')

console.log(result) // => 'Property foo is 1'
```

As you can see `valueToMatch` is matched sequentially against various `is` conditions.
If none of them is appliable, then `default` value is returned as result.

Note that `default` must be the last condition and it is mandatory.

Rambda's `equals` is used as part of the comparison process.

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/switcher.js)

<a href="https://rambda.now.sh?const%20valueToMatch%20%3D%20%7Bfoo%3A%201%7D%0A%0Aconst%20result%20%3D%20R.switcher(valueToMatch)%0A%20%20.is('baz'%2C%20'is%20baz')%0A%20%20.is(%20x%20%3D%3E%20typeof%20x%20%3D%3D%3D%20'boolean'%2C%20'is%20boolean')%0A%20%20.is(%7Bfoo%3A%201%7D%2C%20'Property%20foo%20is%201')%0A%20%20.default('is%20bar')%0A%0Aconsole.log(result)%20%2F%2F%20%3D%3E%20'Property%20foo%20is%201'">Try in REPL</a>

---
#### tapAsync

> tapAsync(fn: Function|Async|Promise, inputArgument: T): T

It is `R.tap` that accept promise-like `fn` argument.

```
const fn = async x => {
  await R.delay(1000)
  console.log(x)
}

const result = R.tapAsync(fn, "foo")
// the console logs `foo`
// `result` is equal to 'foo'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/tapAsync.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20async%20x%20%3D%3E%20%7B%0A%20%20await%20R.delay(1000)%0A%20%20console.log(x)%0A%7D%0A%0Aconst%20result%20%3D%20R.tapAsync(fn%2C%20%22foo%22)%0A%2F%2F%20the%20console%20logs%20%60foo%60%0A%2F%2F%20%60result%60%20is%20equal%20to%20'foo'">Try in REPL</a>

---
#### template

> template(input: string, templateInput: object): string

It generages a new string from `input` by replacing all `{{foo}}` occurances with values provided by `templateInput.

```
const input = 'foo is {{bar}} even {{a}} more'
const templateInput = {"bar":"BAR", a: 1}

const result = template(input,templateInput)
const expectedResult = 'foo is BAR even 1 more'
// result === expectedResult
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/template.js)

<a href="https://rambda.now.sh?const%20input%20%3D%20'foo%20is%20%7B%7Bbar%7D%7D%20even%20%7B%7Ba%7D%7D%20more'%0Aconst%20templateInput%20%3D%20%7B%22bar%22%3A%22BAR%22%2C%20a%3A%201%7D%0A%0Aconst%20result%20%3D%20template(input%2CtemplateInput)%0Aconst%20expectedResult%20%3D%20'foo%20is%20BAR%20even%201%20more'%0A%2F%2F%20result%20%3D%3D%3D%20expectedResult">Try in REPL</a>

---
#### throttle

> throttle(fn: Function, period: number): Function

It creates a throttled function that invokes `fn` maximum once for a `period` of milliseconds.

```
let counter = 0
const inc = () => {
  counter++
}

const throttledInc = R.throttle(inc, 800)

const result = async () => {
  throttledInc()
  await R.delay(500)
  throttledInc()

  return counter
}
// `result` resolves to `1`
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/throttle.js)

<a href="https://rambda.now.sh?let%20counter%20%3D%200%0Aconst%20inc%20%3D%20()%20%3D%3E%20%7B%0A%20%20counter%2B%2B%0A%7D%0A%0Aconst%20throttledInc%20%3D%20R.throttle(inc%2C%20800)%0A%0Aconst%20result%20%3D%20async%20()%20%3D%3E%20%7B%0A%20%20throttledInc()%0A%20%20await%20R.delay(500)%0A%20%20throttledInc()%0A%0A%20%20return%20counter%0A%7D%0A%2F%2F%20%60result%60%20resolves%20to%20%601%60">Try in REPL</a>

---
#### where

> where(conditions: object, input: object): boolean

Each property `prop` in `conditions` is a function.

This function is called with `input(prop)`. If all such function calls return `true`, then the final result is also `true`.

```
const condition = R.where({
  a : aProp => typeof aProp === "string",
  b : bProp => bProp === 4
})

const result = condition({
  a : "foo",
  b : 4,
  c : 11,
}) //=> true
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/where.js)

<a href="https://rambda.now.sh?const%20condition%20%3D%20R.where(%7B%0A%20%20a%20%3A%20aProp%20%3D%3E%20typeof%20aProp%20%3D%3D%3D%20%22string%22%2C%0A%20%20b%20%3A%20bProp%20%3D%3E%20bProp%20%3D%3D%3D%204%0A%7D)%0A%0Aconst%20result%20%3D%20condition(%7B%0A%20%20a%20%3A%20%22foo%22%2C%0A%20%20b%20%3A%204%2C%0A%20%20c%20%3A%2011%2C%0A%7D)%20%2F%2F%3D%3E%20true">Try in REPL</a>

---
#### when

> when(rule: Function|boolean, fn: Function): Function

```
const truncate = R.when(
  x => x.length > 5,
  R.compose(x => `${x}...`, R.take(5))
)

const result = truncate('12345678')
// => '12345...'
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/when.js)

<a href="https://rambda.now.sh?const%20truncate%20%3D%20R.when(%0A%20%20x%20%3D%3E%20x.length%20%3E%205%2C%0A%20%20R.compose(x%20%3D%3E%20%60%24%7Bx%7D...%60%2C%20R.take(5))%0A)%0A%0Aconst%20result%20%3D%20truncate('12345678')%0A%2F%2F%20%3D%3E%20'12345...'">Try in REPL</a>

---
#### whenAsync

> whenAsync<T>(rule: condition: Async | Function | boolean, whenFn: Async | Function): Promise<T>

```
const fn = await R.whenAsync(
  async x => {
    await R.delay(x*100)
    return x > 2
  },
  async x => {
    await R.delay(x*100)
    return x * 2
  }
)

const result = fn(5) // => 10
```

[Source](https://github.com/selfrefactor/rambdax/tree/master/src/whenAsync.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20await%20R.whenAsync(%0A%20%20async%20x%20%3D%3E%20%7B%0A%20%20%20%20await%20R.delay(x*100)%0A%20%20%20%20return%20x%20%3E%202%0A%20%20%7D%2C%0A%20%20async%20x%20%3D%3E%20%7B%0A%20%20%20%20await%20R.delay(x*100)%0A%20%20%20%20return%20x%20*%202%0A%20%20%7D%0A)%0A%0Aconst%20result%20%3D%20fn(5)%20%2F%2F%20%3D%3E%2010">Try in REPL</a>

---
#### add

> add(a: number, b: number): number

```
R.add(2, 3) // =>  5
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/add.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.add(2%2C%203)%20%2F%2F%20%3D%3E%20%205">Try in REPL</a>

---
#### addIndex

> addIndex(fn: Function): Function

```
const mapWithIndex = R.addIndex(R.map)
const result = mapWithIndex(
  (val, index) => `${val} - ${index}`,
  ['A', 'B', 'C']
) // => ['A - 0', 'B - 1', 'C - 2']
```

---
#### adjust

> adjust(replaceFn: Function, i: number, arr: T[]): T[]

It replaces `i` index in `arr` with the result of `replaceFn(arr[i])`.

```
R.adjust(
  a => a + 1,
  0,
  [0, 100]
) // => [1, 100]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/adjust.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.adjust(%0A%20%20a%20%3D%3E%20a%20%2B%201%2C%0A%20%200%2C%0A%20%20%5B0%2C%20100%5D%0A)%20%2F%2F%20%3D%3E%20%5B1%2C%20100%5D">Try in REPL</a>

---
#### all

> all(fn: Function, arr: T[]): boolean

It returns `true`, if all members of array `arr` returns `true`, when applied as argument to function `fn`.

```
const arr = [ 0, 1, 2, 3, 4 ]
const fn = x => x > -1

const result = R.all(fn, arr)
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/all.js)

<a href="https://rambda.now.sh?const%20arr%20%3D%20%5B%200%2C%201%2C%202%2C%203%2C%204%20%5D%0Aconst%20fn%20%3D%20x%20%3D%3E%20x%20%3E%20-1%0A%0Aconst%20result%20%3D%20R.all(fn%2C%20arr)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### allPass

> allPass(rules: Function[], input: any): boolean

It returns `true`, if all functions of `rules` return `true`, when `input` is their argument.

```
const input = {
  a : 1,
  b : 2,
}
const rules = [
  x => x.a === 1,
  x => x.b === 2,
]
const result = R.allPass(rules, input) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/allPass.js)

<a href="https://rambda.now.sh?const%20input%20%3D%20%7B%0A%20%20a%20%3A%201%2C%0A%20%20b%20%3A%202%2C%0A%7D%0Aconst%20rules%20%3D%20%5B%0A%20%20x%20%3D%3E%20x.a%20%3D%3D%3D%201%2C%0A%20%20x%20%3D%3E%20x.b%20%3D%3D%3D%202%2C%0A%5D%0Aconst%20result%20%3D%20R.allPass(rules%2C%20input)%20%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### always

> always(x: any): Function

It returns function that always returns `x`.
```
const fn = R.always(7)

console.log(fn())// => 7
```

---
#### any

> any(condition: Function, arr: T[]): boolean

It returns `true`, if at least one member of `arr` returns true, when passed to the `condition` function.

```
R.any(a => a * a > 8)([1, 2, 3])
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/any.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.any(a%20%3D%3E%20a%20*%20a%20%3E%208)(%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### anyPass

> anyPass(conditions: Function[]): Function

```
const isBig = a => a > 20
const isOdd = a => a % 2 === 1

const result = R.anyPass(
  [isBig, isOdd]
)(11)
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/anyPass.js)

<a href="https://rambda.now.sh?const%20isBig%20%3D%20a%20%3D%3E%20a%20%3E%2020%0Aconst%20isOdd%20%3D%20a%20%3D%3E%20a%20%25%202%20%3D%3D%3D%201%0A%0Aconst%20result%20%3D%20R.anyPass(%0A%20%20%5BisBig%2C%20isOdd%5D%0A)(11)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### append

> append(valueToAppend: T, arr: T[]): T[]

```
R.append(
  'foo',
  ['bar', 'baz']
) // => ['bar', 'baz', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/append.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.append(%0A%20%20'foo'%2C%0A%20%20%5B'bar'%2C%20'baz'%5D%0A)%20%2F%2F%20%3D%3E%20%5B'bar'%2C%20'baz'%2C%20'foo'%5D">Try in REPL</a>

---
#### both

> both(firstCondition: Function, secondCondition: Function, input: any): boolean

It returns `true`, if both function `firstCondition` and function `secondCondition` return `true`, when `input` is their argument.

```
const fn = R.both(
  a => a > 10,
  a => a < 20
)
console.log(fn(15)) //=> true
console.log(fn(30)) //=> false
```

---
#### compose

> compose(fn1: Function, ... , fnN: Function): any

It performs right-to-left function composition.

```
const result = R.compose(
  R.map(x => x * 2),
  R.filter(x => x > 2)
)([1, 2, 3, 4])

// => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/compose.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.compose(%0A%20%20R.map(x%20%3D%3E%20x%20*%202)%2C%0A%20%20R.filter(x%20%3D%3E%20x%20%3E%202)%0A)(%5B1%2C%202%2C%203%2C%204%5D)%0A%0A%2F%2F%20%3D%3E%20%5B6%2C%208%5D">Try in REPL</a>

---
#### complement

> complement(fn: Function): Function

It returns `complemented` function that accept `input` as argument.

The return value of `complemented` is the negative boolean value of `fn(input)`.

```
const fn = R.complement(x => !x)

const result = fn(false) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/complement.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20R.complement(x%20%3D%3E%20!x)%0A%0Aconst%20result%20%3D%20fn(false)%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### concat

> concat(x: T[]|string, y: T[]|string): T[]|string

It returns a new string or array, which is the result of merging `x` and `y`.

```
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo')('bar') // => 'foobar'
```

---
#### contains

> contains(valueToFind: T, arr: T[]): boolean

It returns `true`, if `valueToFind` is part of `arr`.

```
R.contains(2, [1, 2]) // => true
R.contains(3, [1, 2]) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/contains.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.contains(2%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%20true%0AR.contains(3%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### curry

> curry(fn: Function): Function

It returns curried version of `fn`.

```
const addFourNumbers = (a, b, c, d) => a + b + c + d
const curriedAddFourNumbers = R.curry(addFourNumbers)
const f = curriedAddFourNumbers(1, 2)
const g = f(3)
const result = g(4) // => 10
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/curry.js)

<a href="https://rambda.now.sh?const%20addFourNumbers%20%3D%20(a%2C%20b%2C%20c%2C%20d)%20%3D%3E%20a%20%2B%20b%20%2B%20c%20%2B%20d%0Aconst%20curriedAddFourNumbers%20%3D%20R.curry(addFourNumbers)%0Aconst%20f%20%3D%20curriedAddFourNumbers(1%2C%202)%0Aconst%20g%20%3D%20f(3)%0Aconst%20result%20%3D%20g(4)%20%2F%2F%20%3D%3E%2010">Try in REPL</a>

---
#### dec

> dec(x: number): number

It decrements a number.
```
R.dec(2) // => 1
```

---
#### defaultTo

> defaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` is `undefined`, `null` or `NaN`.

It returns `inputArgument` in any other case.

```
R.defaultTo('foo', undefined) // => 'foo'
R.defaultTo('foo', 'bar') // => 'bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/defaultTo.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.defaultTo('foo'%2C%20undefined)%20%2F%2F%20%3D%3E%20'foo'%0AR.defaultTo('foo'%2C%20'bar')%20%2F%2F%20%3D%3E%20'bar'">Try in REPL</a>

---
#### divide

```
R.divide(71, 100) // => 0.71
```

---
#### drop

> drop(howManyToDrop: number, arrOrStr: T[]|string): T[]|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the left.

```
R.drop(1, ['foo', 'bar', 'baz']) // => ['bar', 'baz']
R.drop(1, 'foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/drop.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.drop(1%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'bar'%2C%20'baz'%5D%0AR.drop(1%2C%20'foo')%20%20%2F%2F%20%3D%3E%20'oo'">Try in REPL</a>

---
#### dropLast

> dropLast(howManyToDrop: number, arrOrStr: T[]|String): T[]|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the right.

```
R.dropLast(1, ['foo', 'bar', 'baz']) // => ['foo', 'bar']
R.dropLast(1, 'foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/dropLast.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.dropLast(1%2C%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%5D%0AR.dropLast(1%2C%20'foo')%20%20%2F%2F%20%3D%3E%20'fo'">Try in REPL</a>

---
#### endsWith

> endsWith(x: string, str: string): boolean

```
R.endsWith(
  'bar',
  'foo-bar'
) // => true

R.endsWith(
  'foo',
  'foo-bar'
) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/endsWith.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.endsWith(%0A%20%20'bar'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20true%0A%0AR.endsWith(%0A%20%20'foo'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### either

> endsWith(firstCondition: Function, secondCondition: Function): Function

```
R.either(
  a => a > 10,
  a => a % 2 === 0
)(15) //=> true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/either.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.either(%0A%20%20a%20%3D%3E%20a%20%3E%2010%2C%0A%20%20a%20%3D%3E%20a%20%25%202%20%3D%3D%3D%200%0A)(15)%20%2F%2F%3D%3E%20true">Try in REPL</a>

---
#### equals

> equals(a: any, b: any): boolean

It returns equality match between `a` and `b`.

It doesn't handle cyclical data structures.

```
R.equals(
  [1, {a:2}, [{b:3}]],
  [1, {a:2}, [{b:3}]]
) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/equals.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.equals(%0A%20%20%5B1%2C%20%7Ba%3A2%7D%2C%20%5B%7Bb%3A3%7D%5D%5D%2C%0A%20%20%5B1%2C%20%7Ba%3A2%7D%2C%20%5B%7Bb%3A3%7D%5D%5D%0A)%20%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### F

`R.F() // => false`

---
#### filter

> filter(filterFn: Function, x: Array|Object): Array|Object

It filters `x` iterable over boolean returning `filterFn`.

```
const filterFn = a => a % 2 === 0

const result = R.filter(filterFn, [1, 2, 3, 4])
// => [2, 4]
```

The method works with objects as well.

Note that unlike Ramda's `filter`, here object keys are passed as second argument to `filterFn`.

```
const result = R.filter((val, prop)=>{
  return prop === 'a' || val === 2
}, {a: 1, b: 2, c: 3})

// => {a: 1, b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/filter.js)

<a href="https://rambda.now.sh?const%20filterFn%20%3D%20a%20%3D%3E%20a%20%25%202%20%3D%3D%3D%200%0A%0Aconst%20result%20%3D%20R.filter(filterFn%2C%20%5B1%2C%202%2C%203%2C%204%5D)%0A%2F%2F%20%3D%3E%20%5B2%2C%204%5D">Try in REPL</a>

---
#### find

> find(findFn: Function, arr: T[]): T|undefined

It returns `undefined` or the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === 'Number'
const arr = [{foo: 'bar'}, {foo: 1}]

const result = R.find(findFn, arr) 
// => {foo: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/find.js)

<a href="https://rambda.now.sh?const%20findFn%20%3D%20a%20%3D%3E%20R.type(a.foo)%20%3D%3D%3D%20'Number'%0Aconst%20arr%20%3D%20%5B%7Bfoo%3A%20'bar'%7D%2C%20%7Bfoo%3A%201%7D%5D%0A%0Aconst%20result%20%3D%20R.find(findFn%2C%20arr)%20%0A%2F%2F%20%3D%3E%20%7Bfoo%3A%201%7D">Try in REPL</a>

---
#### findIndex

> findIndex(findFn: Function, arr: T[]): number

It returns `-1` or the index of the first element of `arr` satisfying `findFn`.

```
const findFn = a => R.type(a.foo) === 'Number'
const arr = [{foo: 'bar'}, {foo: 1}]

const result = R.findIndex(findFn, arr)
// => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/findIndex.js)

<a href="https://rambda.now.sh?const%20findFn%20%3D%20a%20%3D%3E%20R.type(a.foo)%20%3D%3D%3D%20'Number'%0Aconst%20arr%20%3D%20%5B%7Bfoo%3A%20'bar'%7D%2C%20%7Bfoo%3A%201%7D%5D%0A%0Aconst%20result%20%3D%20R.findIndex(findFn%2C%20arr)%0A%2F%2F%20%3D%3E%201">Try in REPL</a>

---
#### flatten

> flatten(arr: any[]): any[]

```
R.flatten([ 1, [ 2, [ 3 ] ] ])
// => [ 1, 2, 3 ]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/flatten.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.flatten(%5B%201%2C%20%5B%202%2C%20%5B%203%20%5D%20%5D%20%5D)%0A%2F%2F%20%3D%3E%20%5B%201%2C%202%2C%203%20%5D">Try in REPL</a>

---
#### flip

> flip(fn: Function): Function

It returns function which calls `fn` with exchanged first and second argument.

```
const subtractFlip = R.flip(R.subtract)

const result = subtractFlip(1,7)
// => 6
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/flip.js)

<a href="https://rambda.now.sh?const%20subtractFlip%20%3D%20R.flip(R.subtract)%0A%0Aconst%20result%20%3D%20subtractFlip(1%2C7)%0A%2F%2F%20%3D%3E%206">Try in REPL</a>

---
#### forEach

> forEach(fn: Function, arr: Array): Array

It applies function `fn` over all members of array `arr` and returns `arr`.

```
const sideEffect = {}
const result = R.forEach(
  x => sideEffect[`foo${x}`] = x
)([1, 2])

console.log(sideEffect) //=> {foo1 : 1, foo2 : 2}
console.log(result) //=> [1, 2]
```

Note, that unlike `Ramda`'s **forEach**, Rambda's one doesn't dispatch to `forEach` method of `arr` if `arr` has such method.

[Source](https://github.com/selfrefactor/rambda/tree/master/src/forEach.js)

<a href="https://rambda.now.sh?const%20sideEffect%20%3D%20%7B%7D%0Aconst%20result%20%3D%20R.forEach(%0A%20%20x%20%3D%3E%20sideEffect%5B%60foo%24%7Bx%7D%60%5D%20%3D%20x%0A)(%5B1%2C%202%5D)%0A%0Aconsole.log(sideEffect)%20%2F%2F%3D%3E%20%7Bfoo1%20%3A%201%2C%20foo2%20%3A%202%7D%0Aconsole.log(result)%20%2F%2F%3D%3E%20%5B1%2C%202%5D">Try in REPL</a>

---
#### has

> has(prop: string, obj: Object): boolean

- It returns `true` if `obj` has property `prop`.

```
R.has('a', {a: 1}) // => true
R.has('b', {a: 1}) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/has.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.has('a'%2C%20%7Ba%3A%201%7D)%20%2F%2F%20%3D%3E%20true%0AR.has('b'%2C%20%7Ba%3A%201%7D)%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### head

> head(arrOrStr: T[]|string): T|string

It returns the first element of `arrOrStr`.

```
R.head([1, 2, 3]) // => 1
R.head('foo') // => 'f'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/head.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.head(%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%201%0AR.head('foo')%20%2F%2F%20%3D%3E%20'f'">Try in REPL</a>

---
#### identity

> identity(x: T): T

It just passes back the supplied arguments.

```
R.identity(7) // => 7
```

---
#### ifElse

> ifElse(condition: Function|boolean, ifFn: Function, elseFn: Function): Function

It returns function, which expect `input` as argument and returns `finalResult`.

When this function is called, a value `answer` is generated as a result of `condition(input)`.

If `answer` is `true`, then `finalResult` is equal to `ifFn(input)`.
If `answer` is `false`, then `finalResult` is equal to `elseFn(input)`.

```
const fn = R.ifElse(
 x => x > 10,
 x => x*2,
 x => x*10
)

const result = fn(8)
// => 80
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/ifElse.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20R.ifElse(%0A%20x%20%3D%3E%20x%20%3E%2010%2C%0A%20x%20%3D%3E%20x*2%2C%0A%20x%20%3D%3E%20x*10%0A)%0A%0Aconst%20result%20%3D%20fn(8)%0A%2F%2F%20%3D%3E%2080">Try in REPL</a>

---
#### inc

> inc(x: number): number

It increments a number.
```
R.inc(1) // => 2
```

---
#### includes

> includes(x: any, arrOrStr: T[]|string): boolean

```
R.includes(1, [1, 2]) // => true
R.includes('oo', 'foo') // => true
R.includes('z', 'foo') // => false
```

!! Note that this method is not part of `Ramda` API.

[Source](https://github.com/selfrefactor/rambda/tree/master/src/includes.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.includes(1%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%20true%0AR.includes('oo'%2C%20'foo')%20%2F%2F%20%3D%3E%20true%0AR.includes('z'%2C%20'foo')%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### indexOf

> indexOf(valueToFind: any, arr: T[]): number

It returns `-1` or the index of the first element of `arr` equal of `valueToFind`.

```
R.indexOf(1, [1, 2]) // => 0
R.indexOf(0, [1, 2]) // => -1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/indexOf.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.indexOf(1%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%200%0AR.indexOf(0%2C%20%5B1%2C%202%5D)%20%2F%2F%20%3D%3E%20-1">Try in REPL</a>

---
#### init

> init(arrOrStr: T[]|string): T[]|string

- It returns all but the last element of `arrOrStr`.

```
R.init([1, 2, 3])  // => [1, 2]
R.init('foo')  // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/init.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.init(%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D%0AR.init('foo')%20%20%2F%2F%20%3D%3E%20'fo'">Try in REPL</a>

---
#### join

> join(separator: string, arr: T[]): string

```
R.join('-', [1, 2, 3])  // => '1-2-3'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/join.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.join('-'%2C%20%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20'1-2-3'">Try in REPL</a>

---
#### last

> last(arrOrStr: T[]|string): T|string

- It returns the last element of `arrOrStr`.

```
R.last(['foo', 'bar', 'baz']) // => 'baz'
R.last('foo') // => 'o'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/last.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.last(%5B'foo'%2C%20'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20'baz'%0AR.last('foo')%20%2F%2F%20%3D%3E%20'o'">Try in REPL</a>

---
#### lastIndexOf

> lastIndexOf(x: any, arr: T[]): number

It returns the last index of `x` in array `arr`.

`R.equals` is used to determine equality between `x` and members of `arr`.

Value `-1` is returned if no `x` is found in `arr`.

```
R.lastIndexOf(1, [1, 2, 3, 1, 2]) // => 3
R.lastIndexOf(10, [1, 2, 3, 1, 2]) // => -1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/lastIndexOf.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.lastIndexOf(1%2C%20%5B1%2C%202%2C%203%2C%201%2C%202%5D)%20%2F%2F%20%3D%3E%203%0AR.lastIndexOf(10%2C%20%5B1%2C%202%2C%203%2C%201%2C%202%5D)%20%2F%2F%20%3D%3E%20-1">Try in REPL</a>

---
#### length

> length(arrOrStr: Array|String): Number

```
R.length([1, 2, 3]) // => 3
```

---
#### map

> map(mapFn: Function, x: Array|Object): Array|Object

It returns the result of looping through iterable `x` with `mapFn`.

The method works with objects as well.

Note that unlike Ramda's `map`, here object keys are passed as second argument to `mapFn`.

```
const mapFn = x => x * 2
const resultWithArray = R.map(mapFn, [1, 2, 3])
// => [2, 4, 6]

const result = R.map((val, prop)=>{
  return `${val}-${prop}`
}, {a: 1, b: 2})
// => {a: 'a-1', b: 'b-2'}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/map.js)

<a href="https://rambda.now.sh?const%20mapFn%20%3D%20x%20%3D%3E%20x%20*%202%0Aconst%20resultWithArray%20%3D%20R.map(mapFn%2C%20%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%3D%3E%20%5B2%2C%204%2C%206%5D%0A%0Aconst%20result%20%3D%20R.map((val%2C%20prop)%3D%3E%7B%0A%20%20return%20%60%24%7Bval%7D-%24%7Bprop%7D%60%0A%7D%2C%20%7Ba%3A%201%2C%20b%3A%202%7D)%0A%2F%2F%20%3D%3E%20%7Ba%3A%20'a-1'%2C%20b%3A%20'b-2'%7D">Try in REPL</a>

---
#### match

> match(regExpression: Regex, str: string): string[]

```
R.match(/([a-z]a)/g, 'bananas') // => ['ba', 'na', 'na']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/match.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.match(%2F(%5Ba-z%5Da)%2Fg%2C%20'bananas')%20%2F%2F%20%3D%3E%20%5B'ba'%2C%20'na'%2C%20'na'%5D">Try in REPL</a>

---
#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/merge.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.merge(%7B%20'foo'%3A%200%2C%20'bar'%3A%201%20%7D%2C%20%7B%20'foo'%3A%207%20%7D)%0A%2F%2F%20%3D%3E%20%7B%20'foo'%3A%207%2C%20'bar'%3A%201%20%7D">Try in REPL</a>

---
#### modulo

> modulo(a: number, b: number):numberNumber

It returns the remainder of operation `a/b`.

```
R.module(14, 3) // => 2
```

---
#### multiply

> multiply(a: number, b: number): number

It returns the result of operation `a*b`.

```
R.multiply(4, 3) // => 12
```

---
#### not

> not(x: any): boolean

It returns inverted boolean version of input `x`.

```
R.not(true) //=> false
R.not(false) //=> true
R.not(0) //=> true
R.not(1) //=> false
```

---
#### omit

> omit(propsToOmit: string[]|string, obj: Object): Object

It returns a partial copy of an `obj` with omitting `propsToOmit`

```
R.omit('a,c,d', {a: 1, b: 2, c: 3}) // => {b: 2}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/omit.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.omit('a%2Cc%2Cd'%2C%20%7Ba%3A%201%2C%20b%3A%202%2C%20c%3A%203%7D)%20%2F%2F%20%3D%3E%20%7Bb%3A%202%7D">Try in REPL</a>

---
#### path

> path(pathToSearch: string[]|string, obj: Object): any

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

```
R.path('a.b', {a: {b: 1}}) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/path.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.path('a.b'%2C%20%7Ba%3A%20%7Bb%3A%201%7D%7D)%20%2F%2F%20%3D%3E%201">Try in REPL</a>

---
#### pathOr

> pathOr(defaultValue: any, pathToSearch: string[]|string, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` is `undefined`, `null` or `NaN`, then `defaultValue` will be returned.

`pathFound` is returned in any other case.

```
R.pathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'b'], {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'c'], {a: {b: 2}}) // => 1
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pathOr.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.pathOr(1%2C%20'a.b'%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%202%0AR.pathOr(1%2C%20%5B'a'%2C%20'b'%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%202%0AR.pathOr(1%2C%20%5B'a'%2C%20'c'%5D%2C%20%7Ba%3A%20%7Bb%3A%202%7D%7D)%20%2F%2F%20%3D%3E%201">Try in REPL</a>

---
#### partialCurry

> partialCurry(fn: Function|Async, a: Object, b: Object): Function|Promise

When called with function `fn` and first set of input `a`, it will return a function.

This function will wait to be called with second set of input `b` and it will invoke `fn` with the merged object of `a` over `b`.

`fn` can be asynchronous function. In that case a `Promise` holding the result of `fn` is returned.

See the example below:

```
const fn = ({a, b, c}) => {
  return (a * b) + c
}
const curried = R.partialCurry(fn, {a: 2})
const result = curried({b: 3, c: 10})
// => 16
```

- Note that `partialCurry` is method specific for **Rambda** and the method is not part of **Ramda**'s API

- You can read my argumentation for creating *partialCurry* [here](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

[Source](https://github.com/selfrefactor/rambda/tree/master/src/partialCurry.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20(%7Ba%2C%20b%2C%20c%7D)%20%3D%3E%20%7B%0A%20%20return%20(a%20*%20b)%20%2B%20c%0A%7D%0Aconst%20curried%20%3D%20R.partialCurry(fn%2C%20%7Ba%3A%202%7D)%0Aconst%20result%20%3D%20curried(%7Bb%3A%203%2C%20c%3A%2010%7D)%0A%2F%2F%20%3D%3E%2016">Try in REPL</a>

---
#### pick

> pick(propsToPick: string[], obj: Object): Object

It returns a partial copy of an `obj` containing only `propsToPick` properties.

```
R.pick(['a', 'c'], {a: 1, b: 2}) // => {a: 1}
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pick.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.pick(%5B'a'%2C%20'c'%5D%2C%20%7Ba%3A%201%2C%20b%3A%202%7D)%20%2F%2F%20%3D%3E%20%7Ba%3A%201%7D">Try in REPL</a>

---
#### pipe

> pipe(fn1: Function, ... , fnN: Function): any

It performs left-to-right function composition.

```
const result = R.pipe(
  R.filter(val => val > 2),
  R.map(a => a * 2)
)([1, 2, 3, 4])

// => [6, 8]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pipe.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.pipe(%0A%20%20R.filter(val%20%3D%3E%20val%20%3E%202)%2C%0A%20%20R.map(a%20%3D%3E%20a%20*%202)%0A)(%5B1%2C%202%2C%203%2C%204%5D)%0A%0A%2F%2F%20%3D%3E%20%5B6%2C%208%5D">Try in REPL</a>

---
#### pluck

> pluck(property: string, arr: Object[]): any[]

It returns list of the values of `property` taken from the objects in array of objects `arr`.

```
R.pluck('a')([{a: 1}, {a: 2}, {b: 3}]) // => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/pluck.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.pluck('a')(%5B%7Ba%3A%201%7D%2C%20%7Ba%3A%202%7D%2C%20%7Bb%3A%203%7D%5D)%20%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try in REPL</a>

---
#### prepend

> prepend(x: T, arr: T[]): T[]

It adds `x` to the start of the array `arr`.

```
R.prepend('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/prepend.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.prepend('foo'%2C%20%5B'bar'%2C%20'baz'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%2C%20'baz'%5D">Try in REPL</a>

---
#### prop

> prop(propToFind: string, obj: Object): any

It returns `undefined` or the value of property `propToFind` in `obj`

```
R.prop('x', {x: 100}) // => 100
R.prop('x', {a: 1}) // => undefined
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/prop.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.prop('x'%2C%20%7Bx%3A%20100%7D)%20%2F%2F%20%3D%3E%20100%0AR.prop('x'%2C%20%7Ba%3A%201%7D)%20%2F%2F%20%3D%3E%20undefined">Try in REPL</a>

---
#### propEq

> propEq(propToFind: string, valueToMatch: any, obj: Object): boolean

It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`.

```
const propToFind = 'foo'
const valueToMatch = 0

const result = R.propEq(propToFind, valueToMatch)({foo: 0})
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/propEq.js)

<a href="https://rambda.now.sh?const%20propToFind%20%3D%20'foo'%0Aconst%20valueToMatch%20%3D%200%0A%0Aconst%20result%20%3D%20R.propEq(propToFind%2C%20valueToMatch)(%7Bfoo%3A%200%7D)%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### range

> range(start: number, end: number): number[]

It returns a array of numbers from `start`(inclusive) to `end`(exclusive).

```
R.range(0, 3)   // => [0, 1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/range.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.range(0%2C%203)%20%20%20%2F%2F%20%3D%3E%20%5B0%2C%201%2C%202%5D">Try in REPL</a>

---
#### reduce

> reduce(iteratorFn: Function, accumulator: any, array: T[]): any

```
const iteratorFn = (acc, val) => acc + val
const result = R.reduce(iteratorFn, 1, [1, 2, 3])
// => 7
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reduce.js)

<a href="https://rambda.now.sh?const%20iteratorFn%20%3D%20(acc%2C%20val)%20%3D%3E%20acc%20%2B%20val%0Aconst%20result%20%3D%20R.reduce(iteratorFn%2C%201%2C%20%5B1%2C%202%2C%203%5D)%0A%2F%2F%20%3D%3E%207">Try in REPL</a>

---
#### reject

> reject(fn: Function, arr: T[]): T[]

It has the opposite effect of `R.filter`.

It will return those members of `arr` that return `false` when applied to function `fn`.

```
const fn = x => x % 2 === 1

const result = R.reject(fn, [1, 2, 3, 4]) 
// => [2, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reject.js)

<a href="https://rambda.now.sh?const%20fn%20%3D%20x%20%3D%3E%20x%20%25%202%20%3D%3D%3D%201%0A%0Aconst%20result%20%3D%20R.reject(fn%2C%20%5B1%2C%202%2C%203%2C%204%5D)%20%0A%2F%2F%20%3D%3E%20%5B2%2C%204%5D">Try in REPL</a>

---
#### repeat

> repeat(valueToRepeat: T, num: number): T[]

```
R.repeat('foo', 2) // => ['foo', 'foo']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/repeat.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.repeat('foo'%2C%202)%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'foo'%5D">Try in REPL</a>

---
#### replace

> replace(strOrRegex: string|Regex, replacer: string, str: string): string

It replaces `strOrRegex` found in `str` with `replacer`.

```
R.replace('foo', 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/, 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/g, 'bar', 'foo foo') // => 'bar bar'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/replace.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.replace('foo'%2C%20'bar'%2C%20'foo%20foo')%20%2F%2F%20%3D%3E%20'bar%20foo'%0AR.replace(%2Ffoo%2F%2C%20'bar'%2C%20'foo%20foo')%20%2F%2F%20%3D%3E%20'bar%20foo'%0AR.replace(%2Ffoo%2Fg%2C%20'bar'%2C%20'foo%20foo')%20%2F%2F%20%3D%3E%20'bar%20bar'">Try in REPL</a>

---
#### reverse

reverse(str: T[]): T[]

```
const arr = [1, 2]

const result = R.reverse(arr)
// => [2, 1]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/reverse.js)

<a href="https://rambda.now.sh?const%20arr%20%3D%20%5B1%2C%202%5D%0A%0Aconst%20result%20%3D%20R.reverse(arr)%0A%2F%2F%20%3D%3E%20%5B2%2C%201%5D">Try in REPL</a>

---
#### sort

takeLast(num: number, arrOrStr: T[]|string): T[]|String

It returns copy of `arr` sorted by `sortFn`.

Note that `sortFn` must return a number type.

```
const sortFn = (a, b) => a - b

const result = R.sort(sortFn, [3, 1, 2]) 
// => [1, 2, 3]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/sort.js)

<a href="https://rambda.now.sh?const%20sortFn%20%3D%20(a%2C%20b)%20%3D%3E%20a%20-%20b%0A%0Aconst%20result%20%3D%20R.sort(sortFn%2C%20%5B3%2C%201%2C%202%5D)%20%0A%2F%2F%20%3D%3E%20%5B1%2C%202%2C%203%5D">Try in REPL</a>

---
#### sortBy

> sortBy(sortFn: Function, arr: T[]): T[]

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return value for comparison

```
const sortFn = obj => obj.foo

const result = R.sortBy(sortFn, [
  {foo: 1},
  {foo: 0}
])

const expectedResult = [ {foo: 0}, {foo: 1} ]
console.log(result === expectedResult) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/sortBy.js)

<a href="https://rambda.now.sh?const%20sortFn%20%3D%20obj%20%3D%3E%20obj.foo%0A%0Aconst%20result%20%3D%20R.sortBy(sortFn%2C%20%5B%0A%20%20%7Bfoo%3A%201%7D%2C%0A%20%20%7Bfoo%3A%200%7D%0A%5D)%0A%0Aconst%20expectedResult%20%3D%20%5B%20%7Bfoo%3A%200%7D%2C%20%7Bfoo%3A%201%7D%20%5D%0Aconsole.log(result%20%3D%3D%3D%20expectedResult)%20%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### split

> split(separator: string, str: string): string[]

```
R.split('-', 'a-b-c') // => ['a', 'b', 'c']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/split.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.split('-'%2C%20'a-b-c')%20%2F%2F%20%3D%3E%20%5B'a'%2C%20'b'%2C%20'c'%5D">Try in REPL</a>

---
#### splitEvery

> splitEvery(sliceLength: number, arrOrString: T[]|string): T[T[]]|string[]

- It splits `arrOrStr` into slices of `sliceLength`.

```
R.splitEvery(2, [1, 2, 3]) // => [[1, 2], [3]]
R.splitEvery(3, 'foobar') // => ['foo', 'bar']
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/splitEvery.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.splitEvery(2%2C%20%5B1%2C%202%2C%203%5D)%20%2F%2F%20%3D%3E%20%5B%5B1%2C%202%5D%2C%20%5B3%5D%5D%0AR.splitEvery(3%2C%20'foobar')%20%2F%2F%20%3D%3E%20%5B'foo'%2C%20'bar'%5D">Try in REPL</a>

---
#### startsWith

> startsWith(x: string, str: string): boolean

```
R.startsWith(
  'foo',
  'foo-bar'
) // => true

R.startsWith(
  'bar',
  'foo-bar'
) // => false
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/startsWith.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.startsWith(%0A%20%20'foo'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20true%0A%0AR.startsWith(%0A%20%20'bar'%2C%0A%20%20'foo-bar'%0A)%20%2F%2F%20%3D%3E%20false">Try in REPL</a>

---
#### subtract

> subtract(a: number, b: number): number

```
R.subtract(3, 1) // => 2
```

---
#### T

`R.T() // => true`

---
#### tail

> tail(arrOrStr: T[]|string): T[]|string

- It returns all but the first element of `arrOrStr`

```
R.tail([1, 2, 3])  // => [2, 3]
R.tail('foo')  // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/tail.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.tail(%5B1%2C%202%2C%203%5D)%20%20%2F%2F%20%3D%3E%20%5B2%2C%203%5D%0AR.tail('foo')%20%20%2F%2F%20%3D%3E%20'oo'">Try in REPL</a>

---
#### take

> take(num: number, arrOrStr: T[]|string): T[]|string

- It returns the first `num` elements of `arrOrStr`.

```
R.take(1, ['foo', 'bar']) // => ['foo']
R.take(2, ['foo']) // => 'fo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/take.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.take(1%2C%20%5B'foo'%2C%20'bar'%5D)%20%2F%2F%20%3D%3E%20%5B'foo'%5D%0AR.take(2%2C%20%5B'foo'%5D)%20%2F%2F%20%3D%3E%20'fo'">Try in REPL</a>

---
#### takeLast

> takeLast(num: number, arrOrStr: T[]|string): T[]|string

- It returns the last `num` elements of `arrOrStr`.

```
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, ['foo']) // => 'oo'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/takeLast.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.takeLast(1%2C%20%5B'foo'%2C%20'bar'%5D)%20%2F%2F%20%3D%3E%20%5B'bar'%5D%0AR.takeLast(2%2C%20%5B'foo'%5D)%20%2F%2F%20%3D%3E%20'oo'">Try in REPL</a>

---
#### test

> test(regExpression: Regex, str: string): boolean

- Determines whether `str` matches `regExpression`

```
R.test(/^f/, 'foo') 
// => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/test.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.test(%2F%5Ef%2F%2C%20'foo')%20%0A%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### times

> times(fn: Function, n: number): T[]

It returns the result of applying function `fn` over members of range array.
The range array includes numbers between `0` and `n`(exclusive).

```
R.times(R.identity, 5)
//=> [0, 1, 2, 3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/times.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.times(R.identity%2C%205)%0A%2F%2F%3D%3E%20%5B0%2C%201%2C%202%2C%203%2C%204%5D">Try in REPL</a>

---
#### toLower

> toLower(str: string): string

```
R.toLower('FOO') // => 'foo'
```

---
#### toString

> toString(x: any): string

```
R.toString([1, 2]) // => '1,2'
```

---
#### toUpper

> toUpper(str: string): string

```
R.toUpper('foo') // => 'FOO'
```

---
#### trim

> trim(str: string): string

```
R.trim('  foo  ') // => 'foo'
```

---
#### type

> type(a: any): string

```
R.type(() => {}) // => 'Function'
R.type(async () => {}) // => 'Async'
R.type([]) // => 'Array'
R.type({}) // => 'Object'
R.type('foo') // => 'String'
R.type(1) // => 'Number'
R.type(true) // => 'Boolean'
R.type(null) // => 'Null'
R.type(/[A-z]/) // => 'RegExp'

const delay = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve()
  }, ms)
})
R.type(delay) // => 'Promise'
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/type.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.type(()%20%3D%3E%20%7B%7D)%20%2F%2F%20%3D%3E%20'Function'%0AR.type(async%20()%20%3D%3E%20%7B%7D)%20%2F%2F%20%3D%3E%20'Async'%0AR.type(%5B%5D)%20%2F%2F%20%3D%3E%20'Array'%0AR.type(%7B%7D)%20%2F%2F%20%3D%3E%20'Object'%0AR.type('foo')%20%2F%2F%20%3D%3E%20'String'%0AR.type(1)%20%2F%2F%20%3D%3E%20'Number'%0AR.type(true)%20%2F%2F%20%3D%3E%20'Boolean'%0AR.type(null)%20%2F%2F%20%3D%3E%20'Null'%0AR.type(%2F%5BA-z%5D%2F)%20%2F%2F%20%3D%3E%20'RegExp'%0A%0Aconst%20delay%20%3D%20ms%20%3D%3E%20new%20Promise(resolve%20%3D%3E%20%7B%0A%20%20setTimeout(function%20()%20%7B%0A%20%20%20%20resolve()%0A%20%20%7D%2C%20ms)%0A%7D)%0AR.type(delay)%20%2F%2F%20%3D%3E%20'Promise'">Try in REPL</a>

---
#### uniq

> uniq(arr: T[]): T[]

It returns a new array containing only one copy of each element in `arr`.

```
R.uniq([1, 1, 2, 1])
// => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/uniq.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.uniq(%5B1%2C%201%2C%202%2C%201%5D)%0A%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try in REPL</a>

---
#### uniqWith

> uniqWith(fn: Function, arr: T[]): T[]

It returns a new array containing only one copy of each element in `arr` according to boolean returning function `fn`.

```
const arr = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
  {id: 3, title:'foo'},
  {id: 4, title:'bar'},
]

const expectedResult = [
  {id: 0, title:'foo'},
  {id: 1, title:'bar'},
  {id: 2, title:'baz'},
]

const fn = (x,y) => x.title === y.title

const result = R.uniqWith(fn, arr)

console.log(result === expectedResult) // => true
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/uniqWith.js)

<a href="https://rambda.now.sh?const%20arr%20%3D%20%5B%0A%20%20%7Bid%3A%200%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%201%2C%20title%3A'bar'%7D%2C%0A%20%20%7Bid%3A%202%2C%20title%3A'baz'%7D%2C%0A%20%20%7Bid%3A%203%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%204%2C%20title%3A'bar'%7D%2C%0A%5D%0A%0Aconst%20expectedResult%20%3D%20%5B%0A%20%20%7Bid%3A%200%2C%20title%3A'foo'%7D%2C%0A%20%20%7Bid%3A%201%2C%20title%3A'bar'%7D%2C%0A%20%20%7Bid%3A%202%2C%20title%3A'baz'%7D%2C%0A%5D%0A%0Aconst%20fn%20%3D%20(x%2Cy)%20%3D%3E%20x.title%20%3D%3D%3D%20y.title%0A%0Aconst%20result%20%3D%20R.uniqWith(fn%2C%20arr)%0A%0Aconsole.log(result%20%3D%3D%3D%20expectedResult)%20%2F%2F%20%3D%3E%20true">Try in REPL</a>

---
#### update

> update(i: number, replaceValue: T, arr: T[]): T[]

It returns a new copy of the `arr` with the element at `i` index
replaced with `replaceValue`.

```
R.update(0, 'foo', ['bar', 'baz'])
// => ['foo', baz]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/update.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.update(0%2C%20'foo'%2C%20%5B'bar'%2C%20'baz'%5D)%0A%2F%2F%20%3D%3E%20%5B'foo'%2C%20baz%5D">Try in REPL</a>

---
#### values

> values(obj: Object): Array

It returns array with of all values in `obj`.

```
R.values({a: 1, b: 2})
// => [1, 2]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/values.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.values(%7Ba%3A%201%2C%20b%3A%202%7D)%0A%2F%2F%20%3D%3E%20%5B1%2C%202%5D">Try in REPL</a>

---
#### without

> without(a: T[], b: T[]): T[]

It will return a new array based on `b` array.

This array contains all members of `b` array, that doesn't exist in `a` array.

Method `R.equals` is used to determine the existance of `b` members in `a` array.

```
R.without([1, 2], [1, 2, 3, 4])
// => [3, 4]
```

[Source](https://github.com/selfrefactor/rambda/tree/master/src/without.js)

<a href="https://rambda.now.sh?const%20result%20%3D%20R.without(%5B1%2C%202%5D%2C%20%5B1%2C%202%2C%203%2C%204%5D)%0A%2F%2F%20%3D%3E%20%5B3%2C%204%5D">Try in REPL</a>

