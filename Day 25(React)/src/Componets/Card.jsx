
const Card = (props) => {
    return (
        <div className="rounded-lg bg-gray-100 p-6 shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <h2 className="text-lg font-semibold mb-2">
                {props.item.title}
            </h2>
            <p className="text-gray-600">
                {props.item.body}
            </p>
        </div>
    )
}

export default Card
