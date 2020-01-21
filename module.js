const { resolve } = require('path')

export default function(moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, 'v-pattern-input.template.js'),
    fileName: 'v-pattern-input'
  })
}

module.exports.meta = require('../package.json')