const assert = require('assert')
const moacUtils = require('../dist/index.js')
const BN = require('bn.js')
const eip1014Testdata = require('./testdata/eip1014Examples.json')

describe('zeros function', function () {
  it('should produce lots of 0s', function () {
    const z60 = moacUtils.zeros(30)
    const zs60 = '000000000000000000000000000000000000000000000000000000000000'
    assert.equal(z60.toString('hex'), zs60)
  })
})

describe('zero address', function () {
  it('should generate a zero address', function () {
    const zeroAddress = moacUtils.zeroAddress()
    assert.equal(zeroAddress, '0x0000000000000000000000000000000000000000')
  })
})

describe('is zero address', function () {
  it('should return true when a zero address is passed', function () {
    const isZeroAddress = moacUtils.isZeroAddress('0x0000000000000000000000000000000000000000')
    assert.equal(isZeroAddress, true)
  })

  it('should return false when the address is not equal to zero', function () {
    const nonZeroAddress = '0x2f015c60e0be116b1f0cd534704db9c92118fb6a'
    assert.equal(moacUtils.isZeroAddress(nonZeroAddress), false)
  })
})

describe('keccak', function () {
  it('should produce a hash', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28'
    const hash = moacUtils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak256', function () {
  it('should produce a hash (keccak(a, 256) alias)', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28'
    const hash = moacUtils.keccak256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak without hexprefix', function () {
  it('should produce a hash', function () {
    const msg = '3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '22ae1937ff93ec72c4d46ff3e854661e3363440acd6f6e4adf8f1a8978382251'
    const hash = moacUtils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak-512', function () {
  it('should produce a hash', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '36fdacd0339307068e9ed191773a6f11f6f9f99016bd50f87fd529ab7c87e1385f2b7ef1ac257cc78a12dcb3e5804254c6a7b404a6484966b831eadc721c3d24'
    const hash = moacUtils.keccak(msg, 512)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('sha256', function () {
  it('should produce a sha256', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '58bbda5e10bc11a32d808e40f9da2161a64f00b5557762a161626afe19137445'
    const hash = moacUtils.sha256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('ripemd160', function () {
  it('should produce a RIPMED160', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '4bb0246cbfdfddbe605a374f1187204c896fabfd'
    const hash = moacUtils.ripemd160(msg)
    assert.equal(hash.toString('hex'), r)
  })

  it('should produce a padded RIPMED160', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '0000000000000000000000004bb0246cbfdfddbe605a374f1187204c896fabfd'
    const hash = moacUtils.ripemd160(msg, true)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('rlphash', function () {
  it('should produce a keccak-256 hash of the rlp data', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '33f491f24abdbdbf175e812b94e7ede338d1c7f01efb68574acd279a15a39cbe'
    const hash = moacUtils.rlphash(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('unpad', function () {
  it('should unpad a string', function () {
    const str = '0000000006600'
    const r = moacUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('unpad a hex string', function () {
  it('should unpad a string', function () {
    const str = '0x0000000006600'
    const r = moacUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('pad', function () {
  it('should left pad a Buffer', function () {
    const buf = Buffer.from([9, 9])
    const padded = moacUtils.setLength(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
  it('should left truncate a Buffer', function () {
    const buf = Buffer.from([9, 0, 9])
    const padded = moacUtils.setLength(buf, 2)
    assert.equal(padded.toString('hex'), '0009')
  })
  it('should left pad a Buffer - alias', function () {
    const buf = Buffer.from([9, 9])
    const padded = moacUtils.setLengthLeft(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
})

describe('rpad', function () {
  it('should right pad a Buffer', function () {
    const buf = Buffer.from([9, 9])
    const padded = moacUtils.setLength(buf, 3, true)
    assert.equal(padded.toString('hex'), '090900')
  })
  it('should right truncate a Buffer', function () {
    const buf = Buffer.from([9, 0, 9])
    const padded = moacUtils.setLength(buf, 2, true)
    assert.equal(padded.toString('hex'), '0900')
  })
  it('should right pad a Buffer - alias', function () {
    const buf = Buffer.from([9, 9])
    const padded = moacUtils.setLengthRight(buf, 3)
    assert.equal(padded.toString('hex'), '090900')
  })
})

describe('bufferToHex', function () {
  it('should convert a buffer to hex', function () {
    const buf = Buffer.from('5b9ac8', 'hex')
    const hex = moacUtils.bufferToHex(buf)
    assert.equal(hex, '0x5b9ac8')
  })
  it('empty buffer', function () {
    const buf = Buffer.alloc(0)
    const hex = moacUtils.bufferToHex(buf)
    assert.strictEqual(hex, '0x')
  })
})

describe('intToHex', function () {
  it('should convert a int to hex', function () {
    const i = 6003400
    const hex = moacUtils.intToHex(i)
    assert.equal(hex, '0x5b9ac8')
  })
})

describe('intToBuffer', function () {
  it('should convert a int to a buffer', function () {
    const i = 6003400
    const buf = moacUtils.intToBuffer(i)
    assert.equal(buf.toString('hex'), '5b9ac8')
  })
})

describe('bufferToInt', function () {
  it('should convert a int to hex', function () {
    const buf = Buffer.from('5b9ac8', 'hex')
    const i = moacUtils.bufferToInt(buf)
    assert.equal(i, 6003400)
    assert.equal(moacUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
  it('should convert empty input to 0', function () {
    assert.equal(moacUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
})

describe('fromSigned', function () {
  it('should convert an unsigned (negative) buffer to a singed number', function () {
    const neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    const buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 255

    assert.equal(moacUtils.fromSigned(buf), neg)
  })
  it('should convert an unsigned (positive) buffer to a singed number', function () {
    const neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    const buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 1

    assert.equal(moacUtils.fromSigned(buf), neg)
  })
})

describe('toUnsigned', function () {
  it('should convert a signed (negative) number to unsigned', function () {
    const neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    const hex = 'ff00000000000000000000000000000000000000000000000000000000000000'
    const num = new BN(neg)

    assert.equal(moacUtils.toUnsigned(num).toString('hex'), hex)
  })

  it('should convert a signed (positive) number to unsigned', function () {
    const neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    const hex = '0100000000000000000000000000000000000000000000000000000000000000'
    const num = new BN(neg)

    assert.equal(moacUtils.toUnsigned(num).toString('hex'), hex)
  })
})

describe('isValidPrivate', function () {
  const SECP256K1_N = new moacUtils.BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16)
  it('should fail on short input', function () {
    const tmp = '0011223344'
    assert.equal(moacUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on too big input', function () {
    const tmp = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(moacUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (zero)', function () {
    const tmp = '0000000000000000000000000000000000000000000000000000000000000000'
    assert.equal(moacUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (== N)', function () {
    const tmp = SECP256K1_N.toString(16)
    assert.equal(moacUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (>= N)', function () {
    const tmp = SECP256K1_N.addn(1).toString(16)
    assert.equal(moacUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should work otherwise (< N)', function () {
    const tmp = SECP256K1_N.subn(1).toString(16)
    assert.equal(moacUtils.isValidPrivate(Buffer.from(tmp, 'hex')), true)
  })
})

describe('isValidPublic', function () {
  it('should fail on too short input', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae744', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey), false)
  })
  it('should fail on too big input', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d00', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey), false)
  })
  it('should fail on SEC1 key', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey), false)
  })
  it('shouldn\'t fail on SEC1 key with sanitize enabled', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey, true), true)
  })
  it('should fail with an invalid SEC1 public key', function () {
    const pubKey = Buffer.from('023a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey, true), false)
  })
  it('should work with compressed keys with sanitize enabled', function () {
    const pubKey = Buffer.from('033a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey, true), true)
  })
  it('should work with sanitize enabled', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey, true), true)
  })
  it('should work otherwise', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(moacUtils.isValidPublic(pubKey), true)
  })
})

describe('importPublic', function () {
  const pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
  it('should work with an Moac public key', function () {
    const tmp = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(moacUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
  it('should work with uncompressed SEC1 keys', function () {
    const tmp = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(moacUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
  it('should work with compressed SEC1 keys', function () {
    const tmp = '033a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a'
    assert.equal(moacUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
})

describe('publicToAddress', function () {
  it('should produce an address given a public key', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    const r = moacUtils.publicToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
  it('should produce an address given a SEC1 public key', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    const r = moacUtils.publicToAddress(pubKey, true)
    assert.equal(r.toString('hex'), address)
  })
  it('shouldn\'t produce an address given an invalid SEC1 public key', function () {
    const pubKey = Buffer.from('023a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.throws(function () {
      moacUtils.publicToAddress(pubKey, true)
    })
  })
  it('shouldn\'t produce an address given an invalid public key', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae744', 'hex')
    assert.throws(function () {
      moacUtils.publicToAddress(pubKey)
    })
  })
})

describe('publicToAddress 0x', function () {
  it('should produce an address given a public key', function () {
    const pubKey = '0x3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    const r = moacUtils.publicToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
})

describe('privateToPublic', function () {
  it('should produce a public key given a private key', function () {
    const pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    const privateKey = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95])
    const r = moacUtils.privateToPublic(privateKey).toString('hex')
    assert.equal(r.toString('hex'), pubKey)
  })
  it('shouldn\'t produce a public key given an invalid private key', function () {
    const privateKey1 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95, 42])
    const privateKey2 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28])
    assert.throws(function () {
      moacUtils.privateToPublic(privateKey1)
    })
    assert.throws(function () {
      moacUtils.privateToPublic(privateKey2)
    })
  })
})

describe('privateToAddress', function () {
  it('should produce an address given a private key', function () {
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    // Our private key
    const privateKey = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95])
    const r = moacUtils.privateToAddress(privateKey).toString('hex')
    assert.equal(r.toString('hex'), address)
  })
})

describe('generateAddress', function () {
  it('should produce an address given a public key', function () {
    const add = moacUtils.generateAddress('990ccf8a0de58091c028d6ff76bb235ee67c1c39', 14).toString('hex')
    assert.equal(add.toString('hex'), '936a4295d8d74e310c0c95f0a63e53737b998d12')
  })
})

describe('generateAddress with hex prefix', function () {
  it('should produce an address given a public key', function () {
    const add = moacUtils.generateAddress('0x990ccf8a0de58091c028d6ff76bb235ee67c1c39', 14).toString('hex')
    assert.equal(add.toString('hex'), 'd658a4b8247c14868f3c512fa5cbb6e458e4a989')
  })
})

describe('generateAddress with nonce 0 (special case)', function () {
  it('should produce an address given a public key', function () {
    const add = moacUtils.generateAddress('0x990ccf8a0de58091c028d6ff76bb235ee67c1c39', 0).toString('hex')
    assert.equal(add.toString('hex'), 'bfa69ba91385206bfdd2d8b9c1a5d6c10097a85b')
  })
})

describe('generateAddress2: EIP-1014 testdata examples', function () {
  for (let i = 0; i <= 6; i++) {
    let e = eip1014Testdata[i]
    it(`${e['comment']}: should generate the addresses provided`, function () {
      let result = moacUtils.generateAddress2(e['address'], e['salt'], e['initCode'])
      assert.equal('0x' + result.toString('hex'), e['result'])
    })
  }
})

describe('hex prefix', function () {
  const string = 'd658a4b8247c14868f3c512fa5cbb6e458e4a989'
  it('should add', function () {
    assert.equal(moacUtils.addHexPrefix(string), '0x' + string)
  })
  it('should return on non-string input', function () {
    assert.equal(moacUtils.addHexPrefix(1), 1)
  })
})

describe('isPrecompiled', function () {
  it('should return true', function () {
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000001'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000002'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000003'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000004'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000005'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000006'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000007'), true)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000008'), true)
    assert.equal(moacUtils.isPrecompiled(Buffer.from('0000000000000000000000000000000000000001', 'hex')), true)
  })
  it('should return false', function () {
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000000'), false)
    assert.equal(moacUtils.isPrecompiled('0000000000000000000000000000000000000009'), false)
    assert.equal(moacUtils.isPrecompiled('1000000000000000000000000000000000000000'), false)
    assert.equal(moacUtils.isPrecompiled(Buffer.from('0000000000000000000000000000000000000000', 'hex')), false)
  })
})

describe('toBuffer', function () {
  it('should work', function () {
    // Buffer
    assert.deepEqual(moacUtils.toBuffer(Buffer.allocUnsafe(0)), Buffer.allocUnsafe(0))
    // Array
    assert.deepEqual(moacUtils.toBuffer([]), Buffer.allocUnsafe(0))
    // String
    assert.deepEqual(moacUtils.toBuffer('11'), Buffer.from([49, 49]))
    assert.deepEqual(moacUtils.toBuffer('0x11'), Buffer.from([17]))
    assert.deepEqual(moacUtils.toBuffer('1234').toString('hex'), '31323334')
    assert.deepEqual(moacUtils.toBuffer('0x1234').toString('hex'), '1234')
    // Number
    assert.deepEqual(moacUtils.toBuffer(1), Buffer.from([1]))
    // null
    assert.deepEqual(moacUtils.toBuffer(null), Buffer.allocUnsafe(0))
    // undefined
    assert.deepEqual(moacUtils.toBuffer(), Buffer.allocUnsafe(0))
    // 'toBN'
    assert.deepEqual(moacUtils.toBuffer(new BN(1)), Buffer.from([1]))
    // 'toArray'
    assert.deepEqual(moacUtils.toBuffer({ toArray: function () { return [ 1 ] } }), Buffer.from([1]))
  })
  it('should fail', function () {
    assert.throws(function () {
      moacUtils.toBuffer({ test: 1 })
    })
  })
})

describe('baToJSON', function () {
  it('should turn a array of buffers into a pure json object', function () {
    const ba = [Buffer.from([0]), Buffer.from([1]), [Buffer.from([2])]]
    assert.deepEqual(moacUtils.baToJSON(ba), ['0x00', '0x01', ['0x02']])
  })
  it('should turn a buffers into string', function () {
    assert.deepEqual(moacUtils.baToJSON(Buffer.from([0])), '0x00')
  })
})

const echash = Buffer.from('82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28', 'hex')
const ecprivkey = Buffer.from('3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', 'hex')
const chainId = 101 // testnet

describe('ecsign', function () {
  it('should produce a signature', function () {
    const sig = moacUtils.ecsign(echash, ecprivkey)
    assert.deepEqual(sig.r, Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex'))
    assert.deepEqual(sig.s, Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex'))
    assert.equal(sig.v, 27)
  })

  it('should produce a signature for testnet', function () {
    const sig = moacUtils.ecsign(echash, ecprivkey, chainId)
    // console.log(Buffer(sig.r,"hex").toString())
    // console.log(moacUtils.bufferToHex(sig.r))
    // console.log(moacUtils.bufferToHex(sig.s))

    assert.deepEqual(sig.r, Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex'))
    assert.deepEqual(sig.s, Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex'))
    assert.equal(sig.v, 237)
  })
})

describe('ecrecover', function () {
  it('should recover a public key', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 27
    const pubkey = moacUtils.ecrecover(echash, v, r, s)
    assert.deepEqual(pubkey, moacUtils.privateToPublic(ecprivkey))
  })
  it('should recover a public key (chainId = 101)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 237
    const pubkey = moacUtils.ecrecover(echash, v, r, s, chainId)
    assert.deepEqual(pubkey, moacUtils.privateToPublic(ecprivkey))
  })
  it('should fail on an invalid signature (v = 21)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      moacUtils.ecrecover(echash, 21, r, s)
    })
  })
  it('should fail on an invalid signature (v = 29)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      moacUtils.ecrecover(echash, 29, r, s)
    })
  })
  it('should fail on an invalid signature (swapped points)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      moacUtils.ecrecover(echash, 27, s, r)
    })
  })
})

describe('hashPersonalMessage', function () {
  it('should produce a deterministic hash', function () {
    const h = moacUtils.hashPersonalMessage(Buffer.from('Hello world'))
    console.log(moacUtils.bufferToHex(h))
    assert.deepEqual(h, Buffer.from('ecc248d33efb753bbe517865fbd4486ee97503daac71a872f0855eab92be1b0d', 'hex'))
  })
})

describe('isValidSignature', function () {
  it('should fail on an invalid signature (shorter r))', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1ab', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(moacUtils.isValidSignature(27, r, s), false)
  })
  it('should fail on an invalid signature (shorter s))', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca', 'hex')
    assert.equal(moacUtils.isValidSignature(27, r, s), false)
  })
  it('should fail on an invalid signature (v = 21)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(moacUtils.isValidSignature(21, r, s), false)
  })
  it('should fail on an invalid signature (v = 29)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(moacUtils.isValidSignature(29, r, s), false)
  })
  it('should work otherwise', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 27
    assert.equal(moacUtils.isValidSignature(v, r, s), true)
  })
  it('should work otherwise(chainId=101)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 237
    assert.equal(moacUtils.isValidSignature(v, r, s, false, chainId), true)
  })
  // FIXME: add homestead test
})

const checksumAddresses = [
  // All caps
  '0x52908400098527886E0F7030069857D2E4169EE7',
  '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
  // All Lower
  '0xde709f2102306220921060314715629080e2fb77',
  '0x27b1fdb04752bbc536007a920d24acb045561c26',
  // Normal
  '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
  '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
  '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
  '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'
]

describe('.toChecksumAddress()', function () {
  it('should work', function () {
    for (let i = 0; i < checksumAddresses.length; i++) {
      let tmp = checksumAddresses[i]
      assert.equal(moacUtils.toChecksumAddress(tmp.toLowerCase()), tmp)
    }
  })
})

describe('.isValidChecksumAddress()', function () {
  it('should return true', function () {
    for (let i = 0; i < checksumAddresses.length; i++) {
      assert.equal(moacUtils.isValidChecksumAddress(checksumAddresses[i]), true)
    }
  })
  it('should validate', function () {
    assert.equal(moacUtils.isValidChecksumAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
  })
})

describe('.isValidAddress()', function () {
  it('should return true', function () {
    assert.equal(moacUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a'), true)
    assert.equal(moacUtils.isValidAddress('0x52908400098527886E0F7030069857D2E4169EE7'), true)
  })
  it('should return false', function () {
    assert.equal(moacUtils.isValidAddress('2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
    assert.equal(moacUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6'), false)
    assert.equal(moacUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6aa'), false)
    assert.equal(moacUtils.isValidAddress('0X52908400098527886E0F7030069857D2E4169EE7'), false)
    assert.equal(moacUtils.isValidAddress('x2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
  })
})

describe('message sig', function () {
  const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
  const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')

  it('should return hex strings that the RPC can use', function () {
    assert.equal(moacUtils.toRpcSig(27, r, s), '0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca661b')
    assert.deepEqual(moacUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca661b'), {
      v: 27,
      r: r,
      s: s
    })
    assert.deepEqual(moacUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca6600'), {
      v: 27,
      r: r,
      s: s
    })
  })

  it('should throw on invalid length', function () {
    assert.throws(function () {
      moacUtils.fromRpcSig('')
    })
    assert.throws(function () {
      moacUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca660042')
    })
  })

  it('pad short r and s values', function () {
    assert.equal(moacUtils.toRpcSig(27, r.slice(20), s.slice(20)), '0x00000000000000000000000000000000000000004a1579cf389ef88b20a1abe90000000000000000000000000000000000000000326fa689f228040429e3ca661b')
  })

  it('should throw on invalid v value', function () {
    assert.throws(function () {
      moacUtils.toRpcSig(1, r, s)
    })
  })
})
