import React from "react";
import { Status } from "../generated/prisma";
import { Badge } from "@radix-ui/themes";

const IssueStatusBadge = ({ status }: { status: Status }) => {
  const statusMap: Record<
    Status,
    { label: string; color: "red" | "violet" | "green" }
  > = {
    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "violet" },
    CLOSED: { label: "Closed", color: "green" },
  };
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default IssueStatusBadge;
