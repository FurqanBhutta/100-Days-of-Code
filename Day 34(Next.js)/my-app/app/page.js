import { submitAction } from "@/actions/form.js"

export default function Home() {
  return (
    <>
      <div className='w-2/3 mx-auto my-12 text-center'>
        <h1 className="font-bold text-2xl ">My Form</h1>
        <form action={submitAction}>
          <div >
            <label htmlFor="name" >Name</label>
            <input id='name' name='name' className='border border-black m-3 text-black' type="text" />
          </div>
          <div>
            <label htmlFor="address" >Address</label>
            <input id='address' name='address' className='border border-black m-3 text-black' type="text" />
          </div>
          <button className='border border-black m-3 px-2 rounded-2xl bg-black text-white '>Submit</button>
        </form>
      </div>
    </>
  );
}
