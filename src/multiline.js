export function multiline(input, glue) {

  return input.split('\n')
    .filter(x => x.trim().length > 0)
    .map(x => x.trim())
    .join(glue ? glue : ' ')
}
