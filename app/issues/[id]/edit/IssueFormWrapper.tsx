"use client";
import { Issue } from "@/app/generated/prisma";
import dynamic from "next/dynamic";
import IssueLoadingSkeleton from "./loading";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueLoadingSkeleton />,
});

const IssueFormWrapper = ({ issue }: { issue: Issue }) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormWrapper;
