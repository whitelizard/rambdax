import { when } from './when'
import { compose, take } from 'rambda'

test('', () => {
  const truncate = when(
    x => x.length > 5,
    compose(x => `${ x }...`, take(5))
  )

  expect(truncate('1234')).toEqual('1234')
  expect(truncate('12345678')).toEqual('12345...')
})

test('use boolean', () => {
  const truncateTrue = when(
    true,
    compose(x => `${ x }...`, take(5))
  )

  const truncateFalse = when(
    false,
    compose(x => `${ x }...`, take(5))
  )

  expect(truncateFalse('1234')).toEqual('1234')
  expect(truncateTrue('12345678')).toEqual('12345...')
})

