import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

export default function LeadGenROICalculator() {
  const [inputs, setInputs] = useState({
    serviceFeeA: 2000,
    installFeeB: 1000,
    adSpendDaily: 25,
    leadCost: 20,
    leadsPerDeal: 80,
    dealValue: 15000,
  })

  const [results, setResults] = useState(null)

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) })
  }

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const labels = {
    serviceFeeA: "Monthly Retainer (Old Way - Lower Profits)",
    installFeeB: "One-Time Setup Fee (New Way - Higher Profits)",
    adSpendDaily: "Daily Ad Budget",
    leadCost: "Average Cost per Lead",
    leadsPerDeal: "Leads Needed to Win a Listing",
    dealValue: "GCI per Listing ($)"
  }

  const calculate = () => {
    const months = 12
    const adSpendMonthly = inputs.adSpendDaily * 30
    const adSpendYearly = adSpendMonthly * months

    // Option A
    const serviceFeeA = inputs.serviceFeeA * months
    const totalCostA = serviceFeeA + adSpendYearly
    const leadsA = adSpendYearly / inputs.leadCost
    const costPerLeadA = inputs.leadCost
    const dealsA = leadsA / inputs.leadsPerDeal
    const gciA = dealsA * inputs.dealValue
    const netRoiA = gciA - totalCostA

    // Option B
    const totalCostB = inputs.installFeeB + adSpendYearly
    const leadsB = adSpendYearly / inputs.leadCost
    const costPerLeadB = inputs.leadCost
    const dealsB = leadsB / inputs.leadsPerDeal
    const gciB = dealsB * inputs.dealValue
    const netRoiB = gciB - totalCostB

    const roiBoost = ((netRoiB / totalCostB) / (netRoiA / totalCostA) - 1) * 100

    setResults({
      A: { totalCost: totalCostA, costPerLead: costPerLeadA, deals: dealsA, gci: gciA, roi: netRoiA },
      B: { totalCost: totalCostB, costPerLead: costPerLeadB, deals: dealsB, gci: gciB, roi: netRoiB },
      boost: roiBoost
    })
  }

  return (
    <div className="bg-black min-h-screen py-10 text-white px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Lead Gen ROI Calculator</h1>

      <Card className="max-w-4xl mx-auto bg-gray-900">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
          {Object.entries(labels).map(([key, label]) => (
            <div key={key}>
              <Label>{label}</Label>
              <Input
                type="number"
                name={key}
                value={inputs[key]}
                onChange={handleChange}
                className="text-black"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="text-center mt-6">
        <Button onClick={calculate}>Calculate</Button>
      </div>

      {results && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 max-w-4xl mx-auto">
            <Card className="bg-red-900">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Option A</h2>
                <ul className="space-y-1">
                  <li>💰 <strong>Total Cost:</strong> ${formatNumber(results.A.totalCost)}</li>
                  <li>📊 <strong>Cost per Lead:</strong> ${formatNumber(results.A.costPerLead)}</li>
                  <li>📋 <strong>Deals Closed:</strong> {formatNumber(results.A.deals)}</li>
                  <li>🏆 <strong>Estimated GCI:</strong> ${formatNumber(results.A.gci)}</li>
                  <li>📈 <strong>Net ROI:</strong> ${formatNumber(results.A.roi)}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-900">
              <CardContent>
                <h2 className="text-xl font-semibold mb-4">Option B</h2>
                <ul className="space-y-1">
                  <li>💰 <strong>Total Cost:</strong> ${formatNumber(results.B.totalCost)}</li>
                  <li>📊 <strong>Cost per Lead:</strong> ${formatNumber(results.B.costPerLead)}</li>
                  <li>📋 <strong>Deals Closed:</strong> {formatNumber(results.B.deals)}</li>
                  <li>🏆 <strong>Estimated GCI:</strong> ${formatNumber(results.B.gci)}</li>
                  <li>📈 <strong>Net ROI:</strong> ${formatNumber(results.B.roi)}</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center text-green-400 text-lg mt-6">
            🚨 ROI Boost: <strong>{formatNumber(results.boost)}% higher with the New Way!</strong>
          </div>

          <div className="mt-12 max-w-3xl mx-auto bg-zinc-900 border border-green-700 p-6 rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-2">✅ Used by top agents at Century 21, Ray White, and Stone Real Estate</h2>
            <p className="text-zinc-300 mb-4">You're looking at the system responsible for $52k GCI from $455 ad spend — and it's yours for a one-time fee.</p>
            <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3 mt-4 rounded-xl">
              🔒 Get My Setup →
            </Button>
            <p className="text-xs text-zinc-500 mt-2">One-time cost. Yours to keep. No monthly BS.</p>
          </div>
        </>
      )}
    </div>
  )
}
