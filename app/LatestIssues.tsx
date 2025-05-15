import { prisma } from "@/prisma/client";
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });
  return (
    <Card>
      <Heading size={"4"} mb={'5'}>Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {latestIssues.map((issues) => (
            <Table.Row key={issues.id}>
              <Table.Cell>
                <Flex justify={'between'}>
                  <Flex direction={"column"} gap={"2"} align={"start"}>
                    <Link href={`/issues/${issues.id}`}>{issues.title}</Link>
                    <IssueStatusBadge status={issues.status} />
                  </Flex>
                  {issues.assignedToUser && (
                    <Avatar fallback="?" radius="full" size={'2'} src={issues.assignedToUser.image!} />
                  )}
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
