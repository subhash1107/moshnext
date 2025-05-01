'use client'
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
// anything which is doing ssr can be done like this so it not cause any error
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

const page = () => {
  return (
    <div className='max-w-xl space-y-5'>
        <TextField.Root variant='classic' placeholder='Title' className='p-2 w-full'/>
        <SimpleMDE placeholder='describe the issue...' className='p-2'/>
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default page