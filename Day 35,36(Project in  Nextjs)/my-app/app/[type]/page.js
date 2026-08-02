import Link from "next/link"

export default async function Page({ params }) {
  const { type } = await params
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {/* {myData.map((item) => (
          <div key={item.id} className="border p-4">
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <Link href={`/${item.mealType}/${item.id}`} className="text-blue-500 hover:underline">
              View Recipe
            </Link>
          </div>
        ))} */}
        </div>
    </>
  )
}