test('object creation using literal syntax', () => {
  // js is object based, we really dont need a class to create an object in js.
  // properties and methods in a js object are not fixed unlike in strongly typed languages
  // like C++/Java/TypeScript etc
  // The most simple way to create an object in js is to use literal syntax
  const empty = {} //empty object
  expect(empty).toBeDefined()

  // a simple object
  const cricket = {
    numberOfPlayers: 11, // key can be any valid js variable.
    type: 'outdoor',
    country: 'England',
    playedSince: 1881,
    'is In Olympics': false, // A string that has spaces or hyphen must be supplied as string literal.,
    10: 'Ten!', // number keys will be coersed to a string, the key will be '10'
  }

  // accessing obj properties
  expect(cricket.numberOfPlayers).toBe(11)
  expect(cricket['numberOfPlayers']).toBe(11) // [] operator, that takes an expression which evaluates to string
  const aKey = 'number' + 'Of' + 'Players'
  expect(cricket[aKey]).toBe(11) // aKey is a string expression
  expect(cricket[10]).toBe('Ten!') // number gets coersed to a string. Array are objects where keys are indices.

  // ❌ trying to access non existent keys will return undefined
  expect(cricket.nonExistent).toBeUndefined()

  //➕ Setting a value to a non existent property will end up introducing that property into object.
  expect(cricket.worldCupWinners).toBeUndefined()
  cricket.worldCupWinners = ['India', 'West Indies']
  expect(cricket.worldCupWinners).toBeDefined()
  expect(cricket.worldCupWinners).toEqual(['India', 'West Indies'])

  // A complex object
  const javaScriptHistory = {
    inventor: 'Brandon Eich', // key is simple js variable name
    standards: ['es1', 'es2', 'es3', 'es5', 'es6', 'es2017'],
    year: 1991,
    details: {
      // value can be an object/array/primitive/function
      type: 'object based prototypal',
      ['supports fp']: true, // key can be an expression that resolves to a string, if expression involved need to use []
      usages: ['frontend-web', 'node js', 'mobile-react-native'],
    },
    description: function () {
      // value is a function, a function that is a member of an object is known as method
      return `inventor: ${this.inventor}` //method can access other prop of of objects using a special arg passed to it called this.
    },
  }
  // accessing nested properties, using dot operator
  expect(javaScriptHistory.details.usages).toEqual([
    'frontend-web',
    'node js',
    'mobile-react-native',
  ])
  // trying to access a property on an undefined object is going to throw an exception
  expect(javaScriptHistory.nonExistent).toBeUndefined()
  // 🐞 try to access a prop from nonExistent will throw an exception
  expect(() => javaScriptHistory.nonExistent.name).toThrowError()
  // accessing props safely using nil coelsing operator (?.) Prefer using this on data you suspect to miss some keys in it (ex: fetched from a network)
  expect(javaScriptHistory.nonExistent?.name?.lastName).toBeUndefined()
  expect(javaScriptHistory.details?.usages?.[0]).toBe('frontend-web')
  // nil coelsing can be used with [] operator too.
  expect(javaScriptHistory.details?.usages?.[0]?.[0]).toBe('f')

  // We can set properties as well
  expect(javaScriptHistory.year).toBe(1991)
  javaScriptHistory.year = 1992
  expect(javaScriptHistory.year).toBe(1992)

  // If the key is a string expression, use []
  // if key is non existent, it will be added!
  javaScriptHistory['Key Companies'] = 'Microsoft, Mozilla, NetScape'
  expect(javaScriptHistory['Key Companies']).toEqual(
    'Microsoft, Mozilla, NetScape',
  )
})

test('Creating objects with new', () => {
  let o = new Object() // Create an empty object: same as {}.
  expect(o).toEqual({})

  let a = new Array() // Creates an empty array
  expect(a).toEqual([])

  let d = new Date() // Current date
  expect(d).toBeDefined()
})

test('object creation using Object.create', () => {
  // JavaScript is prototypal
  // an object can inherit from another object.
  // Every object has a prototype object linked to it except a special object called Object.prototype. You can access it
  // using Object.getPrototypeOf()
  let a = {name: 'Tom', age: 10}
  expect(Object.getPrototypeOf(a)).toBe(Object.prototype)
  // lets try to access toString method on a
  expect(a.toString()).toBe('[object Object]')

  // Object.create helps creating a new object with a prototype object passed to it
  let b = Object.create(a)
  expect(Object.getPrototypeOf(b)).toBe(a)

  // Own property and inherited property
  b.company = 'CodeCraft'
  // company is own property of b, where as  name is inherited
  expect(Object.hasOwn(b, 'company')).toBeTruthy()
  expect(Object.hasOwn(b, 'name')).toBeFalsy()

  // so if a property is not found in an object, it will be searched in its prototype, until the property is found, or
  // we end up traversing until the root, which is Object.prototype, when it happens, you get undefined.
})
