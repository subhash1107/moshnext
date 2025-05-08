import { issueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import { Value } from "@radix-ui/themes/components/data-list";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { isUint16Array } from "util/types";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error?.format(), { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });
  const updateIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updateIssue)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where:{id:parseInt(params.id)}
  })
  if(!issue)
    return NextResponse.json({error:'Issue Not Found'},{status:404})
  await prisma.issue.delete({
    where:{id:issue?.id}
  })

  return NextResponse.json({})
}
