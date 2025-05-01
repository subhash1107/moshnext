import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div>
      <Button className="border border-amber-100 hover:cursor-pointer"><Link href='issues/newIssue'>New Issue</Link></Button>
    </div>
  )
}

export default page