import './App.css'
import { useForm } from 'react-hook-form'

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d) => {
    return new Promise((reesolve, reject) => {
      setTimeout(() => {
        reesolve();
      }, d * 1000);
    })
  }

  const onSubmit = async (data) => {
    await delay(2);
    console.log(data);
    reset();
  }

  return (
    <>
      <div className="container w-100 m-auto bg-white rounded-2xl p-5 mt-10">
        {isSubmitting ? <div className='text-center font-bold text-xl'>Loading...</div> : <div className='text-center font-bold text-xl'>Enter Credentials</div>}
        <form action="" onSubmit={handleSubmit(onSubmit)} className='  '>

          <input {...register("username", { required: { value: true, message: "username is required" }, minLength: { value: 3, message: "Length should be greater than 3" }, maxLength: { value: 8, message: "Length should be less than 8" } })} type="text" placeholder='username' className='border border-slate-500 mt-2 p-2 w-full rounded-xl'/> <br />
          {errors.username && <div className='text-red-600'>{errors.username.message}</div>}

          <input {...register("password", { minLength: { value: 8, message: "password should greater than 8" } })} type="password" placeholder='password' className='border border-slate-500 mt-2 p-2 w-full rounded-xl'/> <br />
          {errors.password && <div className='text-red-600'>{errors.password.message}</div>}

          <input disabled={isSubmitting} type="submit" value="submit" className='bg-blue-500 rounded-2xl mt-2 p-2 text-white font-bold'/>
          {errors.myForm && <div>{errors.myForm.message}</div>}

        </form>
      </div>
    </>
  )
}

export default App
