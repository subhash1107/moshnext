import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex justify={"between"}>
      <IssueStatusFilter/>
      <Button className="border border-amber-100 hover:cursor-pointer">
        <Link href="issues/newIssue">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueActions;
