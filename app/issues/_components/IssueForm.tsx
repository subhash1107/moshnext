"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@/app/generated/prisma";
import { issueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
// anything which is doing ssr can be done like this so it not cause any error as it is lazy loading
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => <Spinner />,
});

type IssueFormData = z.infer<typeof issueSchema>;
const IssueForm = ({issue}:{issue?:Issue}) => {
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if(issue){
        await axios.patch(`/api/issues/${issue.id}`,data)
      } else {
      await axios.post("/api/issues", data);
      }
      router.push("/issues");
      router.refresh();
    } catch (error) {
      setIsSubmitting(true);
      setError("An Unexpected Error Happened.");
    } finally {
      setIsSubmitting(false);
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-5" onSubmit={onSubmit}>
        <TextField.Root
          variant="classic"
          placeholder="Title"
          className="p-2 w-full"
          defaultValue={issue?.title}
          {...register("title")}
        />
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="describe the issue..."
              className=""
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          {issue?'Update Issue':'Submit New Issue'}{' '}{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
