'use client'
import React from "react";
import dynamic from "next/dynamic";
import IssueLoadingSkeleton from "./loading";

const IssueForm = dynamic(() => import("../_components/IssueForm"),{
  ssr:false,
  loading:()=><IssueLoadingSkeleton/>
});

const NewIssueForm = () => {
  return <IssueForm />;
};

export default NewIssueForm;
