import { validate } from './validate'

const schema = {
  a : {
    b : 'string',
    c : x => x > 1,
    d : 'string',
  },
  b : 'string',
}

test('no curry', () => {
  const input = {
    a : {
      b : 'str',
      c : 3,
      d : 'str',
    },
    b : 'foo',
  }

  const positiveResult = validate(
    input,
    schema
  )
  expect(positiveResult).toBeTruthy()
})

test('with curry', () => {
  const invalidInput = {
    a : {
      b : 'str',
      c : 3,
      d : 'str',
    },
    b : 5,
  }

  const negativeResult = validate(
    invalidInput
  )(schema)
  expect(negativeResult).toBeFalsy()
})

test('create validation function', () => {
  const input = {
    a : [ 1, 2 ],
    b : 'foo',
  }
  const invalidInput = {
    a : [ 1, '1' ],
    b : 'foo',
  }
  const Schema = {
    a : [ 'number' ],
    b : 'string',
  }

  const validationFn = x => validate(x, Schema)

  expect(validationFn(input)).toBeTruthy()
  expect(validationFn(invalidInput)).toBeFalsy()
})
