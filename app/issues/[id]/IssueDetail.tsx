import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@/app/generated/prisma'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetail = ({issue}:{issue:Issue}) => {
  return (
<>

<Heading as="h2">{issue.title}</Heading>
        <Flex gapX="4" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
</>
)
}

export default IssueDetail