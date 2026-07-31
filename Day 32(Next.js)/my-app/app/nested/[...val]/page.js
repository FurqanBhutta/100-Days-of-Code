export default async function Page({ params }) {
    const {val} = await params
    return (
        <>
            <div>
                params are {JSON.stringify(val)}
            </div>
        </>
    )
}