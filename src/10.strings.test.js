// strings are value types. Each character is represented using utf-16 encoding in JS
// watch this to understand what is utf, utf-8, utf-16, and all: https://www.youtube.com/watch?v=uTJoJtNYcaQ
// Also this: https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/
// Character are glyphes that are shown in screen for user.
// however computer needs a binary representation to store / transfer them.

// Long ago, ASCII format was invented and got widely adapted.
// But that was just 7 bit in size, so only could accommodate 128 characters.
// https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html
// Then they extended this to 8 bit and the chars in range 128-255 are known as extended ascii
// But this set of just 255 chars were not at all enough as more languages needed support, and thus
// a proper standard to codify all characters needed across world was very much needed.
// And thus Unicode was born. Luckily unicode is backward compatible with ASCII. All ASCII chars
// are valid unicode codepoints.
// The first Unicode version 1.0 was published in October 1991 and had 7,161 characters.
// The latest version 1=5.0 (published in September 2023) provides codes for 144,697+ characters.
// Each character has a unique number assigned to it, and is known as code point.
// Unicode code points are in range 0x0000 to 0x10FFFF (so max 11,14,111 chars can be supported)

function getSurrogatePair(astralCodePoint) {
  let highSurrogate = Math.floor((astralCodePoint - 0x10000) / 0x400) + 0xd800
  let lowSurrogate = ((astralCodePoint - 0x10000) % 0x400) + 0xdc00
  return [highSurrogate, lowSurrogate]
}

function getAstralCodePoint(highSurrogate, lowSurrogate) {
  return (highSurrogate - 0xd800) * 0x400 + lowSurrogate - 0xdc00 + 0x10000
}

test('string representation utf-16, surrogate pairs', () => {
  // Javascript uses unicode 16 encoding to represent it strings.
  // remember utf-8, utf-16, utf-32 are different way of expressing the code points in range 0x0000 to 0x10FFFF
  // JS has an API to know both utf-16 char code and also unicode code point
  // from 0 to FFFF both char code (utf-16) and code point are same
  // utf-16 has a limitation where it can not represents code ponints beyond pow(2,16)-1, i.e 65535
  // to overcome this, utf-16 uses something called surrogate pairs to express the code points beyond this range.

  // for any char between 0 to 0xFFFF, both char code and code point are same.
  // This range is known as BMP (basic multi lingual plane)
  for (let i = 0; i < 65536; i++) {
    const charUsingUnicodePoint = String.fromCodePoint(i)
    const charUsingUtf16 = String.fromCharCode(i)
    expect(charUsingUnicodePoint).toBe(charUsingUtf16)
  }

  // utf-16 as is will fail beyond 65536, trying to use it as is not going to work
  // Any plane after BMP is known as ASTRAL.
  // for (let i = 65536; i < 0x10ffff; i++) {
  //   let charUsingUnicodePoint = String.fromCodePoint(i)
  //   let charUsingUtf16 = String.fromCharCode(i)
  //   expect(charUsingUnicodePoint).not.toBe(charUsingUtf16)
  // }

  // So they invented something called surrogate pairs to denote any code point beyond 65536 in utf-16
  // the idea is to use two utf-16 code to denote the unicode code point.

  // For example, the grinning face 😀 is from Astral plane of unicode > 65536, a single utf-16 can not represent this
  // High-surrogate code unit takes values from range 0xD800 to 0xDBFF. Low-surrogate code unit takes values from range 0xDC00 to 0xDFFF.
  let grin = String.fromCharCode(0xd83d, 0xde00) // 0xD83d is high surrogate, 0xde00 is low surrogate
  expect(grin).toBe('😀')
  expect(grin.length).toBe(2) // no surprise, since length computes the number of utf-16 charcodes needed. here it is 2.

  expect(grin.codePointAt(0)).toBe(getAstralCodePoint(0xd83d, 0xde00))

  // javascript allows us to specify surrogates too in the string literal
  grin = '\ud83d\ude00' // \u can represent on 4 hex digits.
  expect(grin).toBe('😀')

  // javascript has \u{}  notation that can create the literal using directly the unicode value.
  grin = `\u{1F600}` // Takes care of internally converting into appropriate surrogate pairs.
  expect(grin).toBe('😀')

  let cafe1 = 'cafe\u0301'
  let cafe2 = 'cafe\u{0301}'
  expect(cafe1).toBe(cafe2)
  expect(cafe1).toBe('café')
})

test('combining marks', () => {
  //Combining mark is a character that applies to the precedent base character to create a new grapheme
})
