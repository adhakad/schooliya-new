'use strict';
const cron = require('node-cron');
const { checkAndUpdateExpiredPlans } = require('./modules/services/cron-plan-service');

// प्रत्येक दिन मध्यरात्री क्रोन जॉब को चलाएँ
cron.schedule('* * * * *', () => {
  console.log('Running daily check for expired plans...');
  checkAndUpdateExpiredPlans();
});