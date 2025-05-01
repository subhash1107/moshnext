'use client'
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
// anything which is doing ssr can be done like this so it not cause any error
import dynamic from 'next/dynamic';
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";
import {Controller, useForm} from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation';

interface Issueform{
  title:string,
  description:string
}
const page = () => {
  const router = useRouter()
  const {register,control,handleSubmit} = useForm<Issueform>()
  return (
    <form className='max-w-xl space-y-5' onSubmit={handleSubmit(async (data)=>{
      await axios.post('/api/issues', data)
      router.push('/issues')
    })}>
        <TextField.Root variant='classic' placeholder='Title' className='p-2 w-full' {...register('title')}/>
        <Controller
        name='description'
        control={control}
        render={({field})=>
        <SimpleMDE placeholder='describe the issue...' className='' {...field}/>
        }/>
        <Button>Submit New Issue</Button>
    </form>
  )
}

export default page