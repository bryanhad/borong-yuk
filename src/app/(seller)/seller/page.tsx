import { db } from '@/lib/db'
import React from 'react'

async function getSalesData() {
  const data = await db.order.aggregate({
    where: {}
  })
}

function DashboardPage() {
  return (
    <div>DashboardPage</div>
  )
}

export default DashboardPage