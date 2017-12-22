const path = require('path')
module.exports = function (err, callingModule, t) {
  const moduleName = path.basename(callingModule.id, '.js')
  let errorTitle
  let errorMessage
  if (!err) {
    errorTitle = errorMessage = `Error missing: ${moduleName}`
  } else if (typeof err === 'string') {
    errorTitle = errorMessage = `${err}: ${moduleName}`
  } else {
    errorTitle = err.message
    errorMessage = `
    Module: ${moduleName}
    Name: ${err.name}
    Message: ${err.message}
    ${err.stack}\n
    `
  }

  console.error(errorMessage)
  console.error(err)
  t.fail(errorTitle)
  return errorMessage
}
