import Navbar from "@/components/Navbar"

const page = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8 min-h-[50vh]">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-700">
          Welcome to RecipeHub! We are a passionate team of food enthusiasts dedicated to bringing you the best recipes from around the world. Our mission is to make cooking easy, enjoyable, and accessible for everyone.
        </p>
      </div>
    </div>
  )
}

export const metadata = {
  title: "About | RecipeHub",
};

export default page
