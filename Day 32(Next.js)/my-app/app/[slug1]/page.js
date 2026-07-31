
export default async function Page({ params }) {
  const { slug1 } = await params
  return (
    <>
      <div>Slug one is: {slug1}</div>
    </>
  )
}