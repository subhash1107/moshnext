import { prisma } from "@/prisma/client";

import Pagination from "../components/Pagination";
import { Issue, Status } from "../generated/prisma";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuePage = async ({ searchParams }: Props) => {
  
  const usedParams = await searchParams;
  const { status } = usedParams;
  const isValidStatus =
    status && Object.values(Status).includes(status as Status);
  const orderBy = columnNames
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
    <Flex gap={'3'} direction={'column'}>
      <IssueActions />
      <IssueTable issues={issues} usedParams={usedParams}/>
      <Pagination
      currentPage={page}
      pageSize={pageSize}
      itemCount={issueCount}
      />
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default IssuePage;
