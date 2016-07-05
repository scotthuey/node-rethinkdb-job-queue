const test = require('tape')
const testError = require('./test-error')
const enums = require('../src/enums')

module.exports = function () {
  test('enums test', (t) => {
    t.plan(14)

    try {
      t.equal(enums.priorityFromValue(60), 'lowest', 'Priority from value 60 returns lowest')
      t.equal(enums.priorityFromValue(50), 'low', 'Priority from value 50 returns low')
      t.equal(enums.priorityFromValue(40), 'normal', 'Priority from value 40 returns normal')
      t.equal(enums.priorityFromValue(30), 'medium', 'Priority from value 30 returns medium')
      t.equal(enums.priorityFromValue(20), 'high', 'Priority from value 20 returns high')
      t.equal(enums.priorityFromValue(10), 'highest', 'Priority from value 10 returns highest')
      t.equal(enums.priorityFromValue(1), 'retry', 'Priority from value 1 returns retry')
      t.equal(Object.keys(enums.priority).length, 7, 'Enums priority has has correct number of keys')
      t.equal(Object.keys(enums.status).length, 23, 'Enums status has correct number of keys')
      t.equal(Object.keys(enums.reviewRun).length, 3, 'Enums queueStatus has correct number of keys')
      t.equal(Object.keys(enums.index).length, 5, 'Enums index has has correct number of keys')
      t.equal(Object.keys(enums.log).length, 3, 'Enums log has has correct number of keys')
      t.equal(Object.keys(enums.message).length, 6, 'Enums message has has correct number of keys')
      t.equal(Object.keys(enums.error).length, 10, 'Enums error has has correct number of keys')
    } catch (err) {
      testError(err, module, t)
    }
  })
}
