const Promise = require('bluebird')
const testQueue = require('./test-queue')
const testMockQueue = require('./test-mock-queue')
const dbAssertDatabase = require('./db-assert-database.spec')
const dbAssertTable = require('./db-assert-table.spec')
const dbAssertIndex = require('./db-assert-index.spec')
const dbAssert = require('./db-assert.spec')
const enums = require('./enums.spec')
const jobOptions = require('./job-options.spec')
const job = require('./job.spec')
const dbJobAddLog = require('./db-job-addlog.spec')
const dbChanges = require('./db-changes.spec')
const dbQueueAddJob = require('./db-queue-addjob.spec')
const dbJobCompleted = require('./db-job-completed.spec')
const dbJobFailed = require('./db-job-failed.spec')
const dbReview = require('./db-review.spec')
const dbQueueStatusSummary = require('./db-queue-statussummary.spec')

return dbAssertDatabase().then(() => {
}).then(() => {
  return dbAssertTable()
}).then(() => {
  return dbAssertIndex()
}).then(() => {
  return dbAssert()
}).then(() => {
  return Promise.all([
    enums(),
    jobOptions(),
    job(),
    dbJobAddLog(),
    dbChanges(),
    dbQueueAddJob(),
    dbJobCompleted(),
    dbJobFailed()
  ])
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
}).then(() => {
  return dbReview()
}).then(() => {
  return dbQueueStatusSummary()
}).then(() => {
  // Note: must stop or delete queues for node to exit gracefully.
  testQueue().stop(1)
  testMockQueue().r.getPoolMaster().drain()
  return true
})