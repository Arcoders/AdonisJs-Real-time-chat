/* eslint-disable */

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3333'
            }
        }
    }
}
