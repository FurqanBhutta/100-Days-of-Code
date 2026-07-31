export default async function Page({ params }) {
  const { slug1, slug2 } = await params
  return (
    <>
      <div>Slug one is: {slug1}</div>
      <div>Slug two is: {slug2}</div>
    </>
  )
}