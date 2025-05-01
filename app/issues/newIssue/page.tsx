import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-xl space-y-5'>
        <TextField.Root variant='classic' placeholder='Title' className='p-2 w-full'/>
        <TextArea placeholder='describe the issue...' size='3' className='p-2'/>
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default page