"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { IndianRupee, TrendingUp, Calendar, Building } from "lucide-react"

export function CostBreakdown() {
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-t-green-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-green-600" />
            <span>Per-Village Cost Breakdown</span>
            <Badge variant="secondary">Payyanur Reference Model</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Based on actual Payyanur ward (439 citizens) - Single village unit deployment
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Cost Components */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                Cost Components
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Component</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Cost (₹)</TableHead>
                    <TableHead>Frequency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">AI Development</TableCell>
                    <TableCell>WatsonX fine-tuning, custom LLM integration</TableCell>
                    <TableCell className="text-right">35,000</TableCell>
                    <TableCell>One-time</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Edge Gateway</TableCell>
                    <TableCell>Raspberry Pi, solar backup, SD card</TableCell>
                    <TableCell className="text-right">9,000</TableCell>
                    <TableCell>One-time</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IVR/SMS Setup</TableCell>
                    <TableCell>Local number + Twilio/Asterisk + call credits</TableCell>
                    <TableCell className="text-right">2,500</TableCell>
                    <TableCell>Monthly</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Cloud Infrastructure</TableCell>
                    <TableCell>Server hosting, database, monitoring</TableCell>
                    <TableCell className="text-right">1,500</TableCell>
                    <TableCell>Monthly</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Local Training</TableCell>
                    <TableCell>Community workshops, panchayat training</TableCell>
                    <TableCell className="text-right">5,000</TableCell>
                    <TableCell>One-time</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Maintenance</TableCell>
                    <TableCell>Remote updates, troubleshooting</TableCell>
                    <TableCell className="text-right">1,000</TableCell>
                    <TableCell>Monthly</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Data Integration</TableCell>
                    <TableCell>API setup with government portals</TableCell>
                    <TableCell className="text-right">3,000</TableCell>
                    <TableCell>One-time</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {/* Financial Summary */}
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Financial Summary
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>One-time (₹)</TableHead>
                    <TableHead>Annual (₹)</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Setup Cost</TableCell>
                    <TableCell>52,000</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>Per village</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Operating Cost</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>60,000</TableCell>
                    <TableCell>Maintenance + IVR</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Revenue</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>3,00,000</TableCell>
                    <TableCell>B2G + CSR + SaaS</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Profit Margin</TableCell>
                    <TableCell>—</TableCell>
                    <TableCell>62%</TableCell>
                    <TableCell>Sustainable</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Deployment Scale Economics</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deployment Scale</TableHead>
                      <TableHead>Cost per Village (Year 1)</TableHead>
                      <TableHead>Expected Revenue</TableHead>
                      <TableHead>Net Profit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1 village (pilot)</TableCell>
                      <TableCell>₹1.12 lakh</TableCell>
                      <TableCell>₹3 lakh</TableCell>
                      <TableCell>₹1.88 lakh</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>10 villages (district-level)</TableCell>
                      <TableCell>₹90,000</TableCell>
                      <TableCell>₹2.8 lakh</TableCell>
                      <TableCell>₹1.9 lakh</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>100 villages (state pilot)</TableCell>
                      <TableCell>₹65,000</TableCell>
                      <TableCell>₹2.6 lakh</TableCell>
                      <TableCell>₹1.95 lakh</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>1,000 villages (multi-state rollout)</TableCell>
                      <TableCell>₹50,000</TableCell>
                      <TableCell>₹2.4 lakh</TableCell>
                      <TableCell>₹1.9 lakh</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Yearly Projection */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              5-Year Financial Projection
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Revenue (₹)</TableHead>
                  <TableHead>Cost (₹)</TableHead>
                  <TableHead>Net Profit (₹)</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Year 1</TableCell>
                  <TableCell>3,00,000</TableCell>
                  <TableCell>1,12,000</TableCell>
                  <TableCell>1,88,000</TableCell>
                  <TableCell>Pilot + setup</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Year 2</TableCell>
                  <TableCell>3,00,000</TableCell>
                  <TableCell>60,000</TableCell>
                  <TableCell>2,40,000</TableCell>
                  <TableCell>No setup cost</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Year 3</TableCell>
                  <TableCell>3,30,000</TableCell>
                  <TableCell>65,000</TableCell>
                  <TableCell>2,65,000</TableCell>
                  <TableCell>CSR renewal + scale</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Year 4</TableCell>
                  <TableCell>3,60,000</TableCell>
                  <TableCell>70,000</TableCell>
                  <TableCell>2,90,000</TableCell>
                  <TableCell>Multi-village network</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Year 5</TableCell>
                  <TableCell>4,00,000</TableCell>
                  <TableCell>75,000</TableCell>
                  <TableCell>3,25,000</TableCell>
                  <TableCell>State-level contracts</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Key Metrics */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">₹3,00,000</div>
                <div className="text-sm text-muted-foreground">Total Annual Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">₹1,12,000</div>
                <div className="text-sm text-muted-foreground">Total Annual Cost</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">₹1,88,000</div>
                <div className="text-sm text-muted-foreground">Net Profit per Village (Year 1)</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">~62%</div>
                <div className="text-sm text-muted-foreground">Net Profit Margin</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}