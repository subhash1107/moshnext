import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const EditIssueButton = ({IssueId}:{IssueId:number}) => {
  return (
    <Button >
    <Pencil2Icon />
    <Link href={`/issues/${IssueId}/edit`}>Edit Issue</Link>
  </Button>
  )
}

export default EditIssueButton