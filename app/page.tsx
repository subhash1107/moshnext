import { prisma } from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssues from "./LatestIssues";

export default async function Home() {
  const open = prisma.issue.count({where:{status:'OPEN'}})
  const inProgress = prisma.issue.count({where:{status:'IN_PROGRESS'}})
  const closed = prisma.issue.count({where:{status:'CLOSED'}})
  return (
    <IssueSummary open={open} closed={closed} inProgress={inProgress}/>
  )
}
