'use strict';
const cron = require('node-cron');
const { checkAndUpdateExpiredPlans } = require('./modules/services/cron-plan-service');

cron.schedule('* * * * *', () => {
  checkAndUpdateExpiredPlans();
});