'use client'
import { Heading, Flex, Card, Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from "@/app/components"

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
    <Heading as='h2'><Skeleton/></Heading>
    <Flex gapX='4' my='2'>
    <Skeleton width='5rem'/>
    <Skeleton width='8rem'/>
    </Flex>
    <Card className="prose">
    <Skeleton count={3}/>
    </Card>
    <Skeleton/>
  </Box>
  )
}

export default LoadingIssueDetailPage