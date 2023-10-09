import React,{useState} from 'react'
import {useForm}  from 'react-hook-form'
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const ValidationSchema =yup.object().shape({
    fullName: yup.string().required("fullName is required"),
    email: yup.string().required("email is required"),
    password: yup.string().required().max(15).min(6),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "password didn't match"),
    profileImage: yup.mixed().required("image is required")
})

const Register:React.FC = () => {
    type FormData = yup.InferType<typeof ValidationSchema>

    const {register, handleSubmit, reset, formState : {errors}} = useForm({
        resolver : yupResolver(ValidationSchema)
    })
     const createUser = handleSubmit(async(data:FormData)=>{
        console.log(data)
     })

     const [previewImageUrl, setPreviewImageUrl] = useState<string | undefined>(undefined
        );

        const onImagePreview = (e:React.ChangeEvent<HTMLInputElement>) =>{
             const file = e.target.files![0];
             const url = URL.createObjectURL(file)
             setPreviewImageUrl(url)
        };
 
  return (
    <div>
        <h1 className='mb-5'>Create an Account</h1>
        <form onSubmit={createUser}>
            <img
              src={previewImageUrl}
            className='h-[70px] w-[70px] rounded-[50%] bg-slate-400' />
            <div className='flex-col hidden'>
                <span>Profile Image</span>
                <input 

                {...register("profileImage")}
                 id="pix"
                type="file"
                className='h-[40px] p-3 w-[350px] mb-5' placeholder='enter yor email' onChange={(onImagePreview)} />
            </div>
            <br />
            <br />
            <label htmlFor="pix" className='p-[10px] rounded-md bg-blue-600'>Upload Image</label>
            <br />
            <br />
            <div className='flex flex-col'>
                <span>FullName</span>
            <input
             {...register("fullName")}
            className='h-[40px] p-3 w-[300px] mb-5' placeholder='enter your Fullname' />
            <p className='text-red-500'>{errors?.fullName?.message}</p>
            </div>
            <div className='flex flex-col'>
                <span>Email</span>
            <input
             {...register("email")}
            className='h-[40px] p-3 w-[300px] mb-5' placeholder='Email' />
            <p className='text-red-500'>{errors?.email?.message}</p>
            </div>
            <div className='flex flex-col'>
                <span>Password</span>
            <input
              {...register("password")}
            className='h-[40px] p-3 w-[300px] mb-5' placeholder='Password' />
            </div>
            <div className='flex flex-col'>
                <span>Confirm Password</span>
            <input className='h-[40px] p-3 w-[300px] mb-5' placeholder='Confirm Password' />
            <p className='text-red-500'>{errors?.password?.message}</p>
            </div>
            <p className='mb-5'>
                Already have an account
            </p>
            <button>submit</button>
        </form>
    </div>
  )
}

export default Register