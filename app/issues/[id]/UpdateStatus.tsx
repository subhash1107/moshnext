'use client'
import { Issue, Status } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

const UpdateStatus = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value?: Status }[] = [
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Closed", value: "CLOSED" },
  ];

  const changeStatus = (stats: Status) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        status: stats,
      })
      .then(() => {
        toast.success("Status Updated Successfully");
      })
      .catch(() => {
        toast.error("Some Error occured while updating status");
      });
  };
  return (
    <Select.Root defaultValue={issue.status} onValueChange={changeStatus}>
      <Select.Trigger placeholder="Issue Status" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((stats, index) => (
            <Select.Item key={index} value={stats.value!}>
              {stats.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default UpdateStatus;
