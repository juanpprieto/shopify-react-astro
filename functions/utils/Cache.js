// app/Cache.js
const cache = new Map()

module.exports = {
  has(key) {
    return cache.has(key)
  },

  set(key, value) {
    return cache.set(key, [value, Date.now()])
  },

  get(key) {
    return cache.get(key)[0]
  },

  delete(key) {
    return cache.delete(key)
  },

  clear() {
    return cache.clear()
  },
}