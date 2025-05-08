import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const DeleteIssueButton = ({IssueId}:{IssueId:number}) => {
  return (
    <Button color='red'>
        <TrashIcon/>
        <Link href={`issues/${IssueId}/delete`}>Delete Issue</Link>
    </Button>
  )
}

export default DeleteIssueButton