import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";
import AsigneeSelect from "./AsigneeSelect";
import { cache } from "react";
interface Props {
  params: Promise< {id: string} >;
}
const fetchIssue = cache((issueId:number)=> prisma.issue.findUnique({where:{id:issueId}}))
const IssueDetailPage = async ({ params }: Props) => {
  const {id} = await params
  if (isNaN(parseInt(id))) notFound();
  const session = await getServerSession(authOption);
  const issue = await fetchIssue(parseInt(id))

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap="4" direction="column">
            <AsigneeSelect issue={issue}/>
            <EditIssueButton IssueId={issue.id} />
            <DeleteIssueButton IssueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({params}:Props){
  const {id} = await params
 const issue = await fetchIssue(parseInt(id))
 if(!issue){
  return{
    title:'Issue not found '
  }
 } 

 return{
  title:issue.title,
  description:issue.description.slice(0,160)
 }
}

export default IssueDetailPage;
