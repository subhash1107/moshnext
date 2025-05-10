import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOption from "@/app/auth/authOption";

export async function POST(request: NextRequest) {
  const server = await getServerSession(authOption)
  if(!server)
    return NextResponse.json({},{status:401})
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
