const logger = require('./logger')(module)
const enums = require('./enums')
const dbChanges = require('./db-changes')

module.exports = function (q, job) {
  if (!job) { return [] }
  let jobs = Array.isArray(job) ? job : [job]
  logger('addJob', jobs.length)
  for (let valid of jobs) {
    if (!valid.id) {
      return Promise.reject(enums.error.jobInvalid)
    }
    if (valid.status !== enums.jobStatus.created) {
      return Promise.reject(enums.error.jobAlreadyAdded)
    }
  }
  jobs = jobs.map((jobPrep) => {
    jobPrep.status = enums.jobStatus.waiting
    return jobPrep.cleanCopy
  })
  return q.r.db(q.db).table(q.name)
  .insert(jobs, {returnChanges: true}).run()
  .then((saveResult) => {
    return dbChanges.toJob(q, saveResult)
  })
}
