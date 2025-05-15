import { prisma } from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { Link, IssueStatusBadge } from "@/app/components";
import NextLink from "next/link";
import React from "react";
import IssueActions from "./IssueActions";
import { Issue, Status } from "../generated/prisma";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from "../components/Pagination";

interface Props {
  searchParams: Promise<{
    status?: Status;
    orderBy?: keyof Issue;
    page?: string;
  }>;
}

const IssuePage = async ({ searchParams }: Props) => {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issues", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    {
      label: "Created At",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];
  const usedParams = await searchParams;
  const { status } = usedParams;
  const isValidStatus =
    status && Object.values(Status).includes(status as Status);
  const orderBy = columns
    .map((column) => column.value)
    .includes(usedParams.orderBy as keyof Issue)
    ? { [usedParams.orderBy as keyof Issue]: "asc" }
    : undefined;

  const where = isValidStatus ? { status: status } : undefined;
  const page = parseInt(usedParams.page || "1");
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({where})

  return (
    <div className="">
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((columns, index) => (
              <Table.ColumnHeaderCell key={index} className={columns.className}>
                <NextLink
                  href={{
                    query: { ...usedParams, orderBy: columns.value },
                  }}
                >
                  {columns.label}
                </NextLink>
                {columns.value == usedParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Pagination
      currentPage={page}
      pageSize={pageSize}
      itemCount={issueCount}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
