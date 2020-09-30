import rulesService from '../service/RulesService';
import {programEnrolment} from '../RuleExecutor';

const decisionRules = (req, res, next) => {
  rulesService.findRulesById(req.body, res, next) 
    .then(async function (data) {
        const rulevalidated = await programEnrolment(JSON.parse(JSON.stringify(data))[0].rules,req.body);
        res.status(200)
            .json({
                status: 'success',
                data: rulevalidated
            });
    })
      .catch(function (err) {
        return next(err);
      });
}

const visitScheduleRules = async (req, res, next) => {
  try {
    const rulevalidated = await programEnrolment(req.body.rule.code, req.body);
    res.status(200)
      .json({
        status: 'success',
        visitSchedules: rulevalidated
      });
  } catch (err) {
    return next(err);
  }
}

const checkListRules = (req, res, next) => {
  rulesService.findRulesById(req.body, res, next) 
    .then(async function (data) {
        const rulevalidated = await programEnrolment(JSON.parse(JSON.stringify(data))[0].rules,req.body);
        res.status(200)
            .json({
                status: 'success',
                visitSchedules: rulevalidated
            });
    })
      .catch(function (err) {
        return next(err);
      });
}

module.exports = {
    decisionRules: decisionRules,
    visitScheduleRules : visitScheduleRules,
    checkListRules :checkListRules
};