function getValue(x, d) {
  if (x === undefined || x === null) {
    return d
  } else {
    return x
  }
}

export function getIn(m, path) {
  if (path.length === 0) {
    return m
  } else {
    return getIn(m[path[0]], path.slice(1))
  }
}

export function assocIn(m, path, x) {
  if (path.length === 0) {
    return x
  } else {
    const value = getValue(m[path[0]], {})
    const down = assocIn(value, path.slice(1), x)
    return {
      ...m,
      [path[0]]: down,
    }
  }
}

export function mergeIn(m, path, d) {
  if (path.length === 0) {
    return {
      ...m,
      ...d,
    }
  } else {
    const value = getValue(m[path[0]], {})
    const down = mergeIn(value, path.slice(1), d)
    return {
      ...m,
      [path[0]]: down,
    }
  }
}

export function updateIn(m, path, f) {
  if (path.length === 0) {
    return f(m)
  } else {
    const value = getValue(m[path[0]], {})
    const down = updateIn(value, path.slice(1), f)
    return {
      ...m,
      [path[0]]: down,
    }
  }
}

function test() {
  console.log('state test')
  const gold = {
    green: {level: 1},
    yellow: {
      magenta: {
        quan: 88888
      },
      level: 5
    },
  }

  console.log(getIn(gold, ['green', 'level']))
  console.log(assocIn(gold, ['yellow', 'orange', 'purple'], 111))
  console.log(mergeIn(gold, ['yellow', 'magenta'], {also: 'wwwwwwwwwwwwww'}))
  console.log(updateIn(gold, ['yellow', 'magenta', 'quan'], function(x) {return x + 5}))
}
