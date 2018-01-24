'use strict'

function getEstimation (sourceScore, targetScore) {
  const exponent = (targetScore - sourceScore) / 400

  return (1 / (1 + Math.pow(10, exponent)))
}

function getKValue (score)
{
  if (score < 1000)
    return (50)
  else if (score >= 1000 && score <= 2000)
    return (25)
  else if (score >= 2000 && score <= 2400)
    return (15)
  else if (score > 2400)
    return (10)
}

module.exports = {

  calculate: function (sourceScore, targetScore, sourceResult) {
    const targetResult = (1 - sourceResult)
    const targetK = getKValue(targetScore)
    const sourceK = getKValue(sourceScore)
    const sourceEstimation = getEstimation(sourceScore, targetScore)
    const targetEstimation = getEstimation(targetScore, sourceScore)

    var newSourceScore = Math.round(sourceScore + sourceK * (sourceResult - sourceEstimation))
    var newTargetScore = Math.round(targetScore + targetK * (targetResult - targetEstimation))

    newSourceScore = (newSourceScore < 300) ? 300 : newSourceScore
    newTargetScore = (newTargetScore < 300) ? 300 : newTargetScore

    return ({ source: newSourceScore, target: newTargetScore })
  }
}
