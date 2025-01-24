function PlayerNameDisplayer(props) {
    const names = (props.props.names);
    const symbol = (props.props.symbol);
    console.log(props.props);
    return (
        <div className="flex w-full justify-center items-center flex-col">
            <ul>
                {
                   names.map((element, index) => (
                        <li className="text-center m-2" key={index}>{element} - <span className="font-bold">{symbol[index]} </span></li>
                    ))

                }
            </ul>
        </div>
    )
}
export default PlayerNameDisplayer;