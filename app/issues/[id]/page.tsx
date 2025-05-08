import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
interface Props {
  params: { id: string };
}
const IssueDetailPage = async ({ params }: Props) => {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue}/>
      </Box>
      <Box>
        <Flex gap='4' direction='column'>
      <EditIssueButton IssueId={issue.id}/>
      <DeleteIssueButton IssueId={issue.id}/>
      </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
