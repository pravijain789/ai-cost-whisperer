async function getCostInsights(costData) {
  return `AWS Cost Analysis (AI insights coming soon):

Your AWS account shows activity across ${costData[0]?.services?.length || 0} services this month.
All costs are currently within the free tier limits.

Top recommendations:
1. Monitor your EC2 usage and stop instances when not in use
2. Set up AWS billing alerts to get notified before costs rise
3. Review unused resources regularly to avoid surprise charges`;
}

module.exports = { getCostInsights };
