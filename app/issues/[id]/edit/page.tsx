import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormWrapper from "./IssueFormWrapper";

interface Props {
  params: { id: string };
}
const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  return <IssueFormWrapper issue={issue} />;
};

export async function generateMetadata({params}:Props){
 const issue = await prisma.issue.findUnique({where:{id:parseInt(params.id)}})
 if(!issue){
  return{
    title:'Issue not found'
  }
 } 

 return{
  title:`${issue.title} edit`,
  description:issue.description.slice(0,160)
 }
}

export default EditIssuePage;
