'use client'
import React, { useState } from 'react'
import { Button, Callout, TextField } from '@radix-ui/themes'
// anything which is doing ssr can be done like this so it not cause any error
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import {zodResolver} from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';

type Issueform = z.infer<typeof createIssueSchema> 
const page = () => {
  const [error,setError] = useState<string>('')
  const router = useRouter()
  const {register,control,handleSubmit,formState:{errors}} = useForm<Issueform>({
    resolver: zodResolver(createIssueSchema)
  })
  return (
    <div className='max-w-xl'>
      {error&&<Callout.Root color='red' className='mb-5'>
        <Callout.Text>{error}</Callout.Text>
      </Callout.Root>}
    <form 
    className=' space-y-5' onSubmit={handleSubmit(async (data)=>{
      try {
        await axios.post('/api/issues', data)
      router.push('/issues')
      } catch (error) {
       setError('An Unexpected Error Happened.')
      }
    })}>
        <TextField.Root variant='classic' placeholder='Title' className='p-2 w-full' {...register('title')}/>
        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Controller
        name='description'
        control={control}
        render={({field})=>
        <SimpleMDE placeholder='describe the issue...' className='' {...field}/>
        }/>
        <ErrorMessage>{errors?.description?.message}</ErrorMessage>
        <Button>Submit New Issue</Button>
    </form>
    </div>
  )
}

export default page