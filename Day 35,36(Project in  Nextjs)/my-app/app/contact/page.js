import Navbar from "@/components/Navbar"

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-700">
          Have questions or feedback? We&apos;d love to hear from you! Reach out to us using the contact information below.
        </p>
      </div>
    </div>
  )
}

export default page
