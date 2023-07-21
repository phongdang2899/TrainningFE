import React from 'react'
import { useForm } from "react-hook-form" 
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required()
const Dashboard = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)
  return (
    <div className="text-black">
      <form className='text-red' onSubmit={handleSubmit(onSubmit)}>
      <h1>OK</h1>
    <input className='text-[#000]' {...register("firstName")} />
    <p>{errors.firstName?.message}</p>
    <h1>age</h1>
    <input className='text-[#000]' {...register("age")} />
    <p>{errors.age?.message}</p>

    <input className='text-[#000]' type="submit" />
  </form>
    </div>
  )
}

export default Dashboard