import { Card, CardContent, CardHeader } from '@/app/_components/ui/card'
import { DollarSignIcon, ScaleIcon } from 'lucide-react'
import React from 'react'
import CardChart from './radial-progress'

const Cards = () => {
  return (
    <div className="flex items-center gap-6">
      <Card className="w-full ">
        <CardHeader className="bg-green-500 m-4 bg-opacity-10 w-max rounded-full p-2">
          <DollarSignIcon className="text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-sm">R$45,90</span>
              <span className="text-gray-400 text-xs">Earnings</span>
            </div>
            <CardChart percentage={63} barColor="green-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="bg-red-500 m-4 bg-opacity-10 w-max rounded-full p-2">
          <DollarSignIcon className="text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-sm">R$458,95</span>
              <span className="text-gray-400 text-xs">Expenses</span>
            </div>
            <CardChart percentage={37} barColor="red-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="w-full ">
        <CardHeader className="bg-blue-500 m-4 bg-opacity-10 w-max rounded-full p-2">
          <ScaleIcon className="text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-bold text-sm">R$205,76</span>
              <span className="text-gray-400 text-xs">Balance</span>
            </div>
            <CardChart percentage={26} barColor="blue-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Cards
