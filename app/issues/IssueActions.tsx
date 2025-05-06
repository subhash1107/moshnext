import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button className="border border-amber-100 hover:cursor-pointer">
        <Link href="issues/newIssue">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssueActions;
