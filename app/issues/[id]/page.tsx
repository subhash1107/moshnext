import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from 'react-markdown'
import delay from 'delay'
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  await delay(2000)

  if (!issue) notFound();
  return (
    <div>
      <Heading as='h2'>{issue.title}</Heading>
      <Flex gapX='4' my='2'>
      <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose">
      <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
      <p>{issue.updatedAt.toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
