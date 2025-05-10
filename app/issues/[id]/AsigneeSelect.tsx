"use client";

import { Skeleton } from "@/app/components";
import { Issue, User } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, {Toaster} from 'react-hot-toast'

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;
  return (
    <>
    <Select.Root
      onValueChange={(userId) => {
        axios.patch("/api/issues/" + issue.id, {
          assignedToUserId: userId === "unassigned" ? null : userId,
        })
        .then(()=>{
          toast.success("User assigned successfully!")
        })
        .catch(()=>{
          toast.error("Changes could not be saved!")
        });
      }}
      defaultValue={issue.assignedToUserId || "unassigned"}
    >
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value={"unassigned"}>Unassigned</Select.Item>
          {users?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
    <Toaster/>
    </>
  );
};

export default AsigneeSelect;
