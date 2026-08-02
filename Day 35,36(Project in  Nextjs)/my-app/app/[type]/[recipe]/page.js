export default async function Page({ params }) {
  const { recipe } = await params
  return (
    <>
      <div>Food is {recipe}</div>
    </>
  )
}