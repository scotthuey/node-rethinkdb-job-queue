const logger = require('./logger')(module)
const uuid = require('node-uuid')
const moment = require('moment')
const enums = require('./enums')
const jobOptions = require('./job-options')
const jobAddLog = require('./job-addlog')

class Job {

  constructor (q, data, options) {
    logger('constructor')
    logger('queue id', q.id)
    logger('data', data)
    logger('options', options)
    this.q = q

    // If creating a job from the database, pass the job data as the options.
    // Eg. new Job(queue, null, data)
    if (options && options.id) {
      logger('Creating job from database object')
      Object.assign(this, options)
      this.priority = enums.priorityFromValue(this.priority)
    } else {
      logger('Creating new job from defaults and options')
      options = jobOptions(options)
      this.id = uuid.v4()
      this.data = data || {}
      this.priority = options.priority
      this.timeout = options.timeout
      this.retryDelay = options.retryDelay
      this.retryMax = options.retryMax
      this.progress = 0
      this.retryCount = 0
      this.status = enums.jobStatus.created
      this.log = []
      this.dateCreated = moment().toDate()
      this.dateStarted
      this.dateCompleted
      this.dateTimeout
      this.dateFailed
      this.workerId
    }
  }

  get cleanCopy () {
    logger('cleanCopy')
    const jobCopy = Object.assign({}, this)
    jobCopy.priority = enums.priority[jobCopy.priority]
    delete jobCopy.q
    return jobCopy
  }

  createLog (message, type = enums.log.information, status = this.status) {
    return {
      date: moment().toDate(),
      queueId: this.q.id,
      type: type,
      status: status,
      message: message
    }
  }

  addLog (log) {
    logger('addLog')
    return jobAddLog(this, log)
  }
}

module.exports = Job
