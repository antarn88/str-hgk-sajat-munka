const { readFile, writeFile } = require('fs')

const MoviesApi = (path, prop) => ({
  get () {
    return readFile(path, { encoding: 'utf-8' },
      (error, dataString) => {
        if (error) throw error
        const content = JSON.parse(dataString)[prop]
        // console.log(content)
        return content
      })
  },

  save (data) {
    writeFile(path, JSON.stringify({ [prop]: data }))
  }
})

module.exports = MoviesApi
