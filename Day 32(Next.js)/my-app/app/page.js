import Image from "next/image";

export default function Home() {
  return (
    <div >
      
      <h1>Home Page</h1>
      <div className='container my-5 size-120 relative mx-auto '>
       <Image className=' object-cover rounded-2xl' fill src="https://tse4.mm.bing.net/th/id/OIP.60k4JoqsHHHvQ-3CC7rKwwHaE0?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="mountains" />
     </div>
    </div>
  );
}
