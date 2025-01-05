function ScoreCard(props) {
    const data  = props.props;
    return (
        <div
            className="font-main text-heading lg:text-heading-lg font-black w-full p-2 bg-white   text-black border-b-[3px] border-borderColor flex justify-evenly items-center">
            <div className="flex items-center justify-between font-bold">
                <p>{data.player1Symbol} : </p>
                <p className="pl-2 font-black"> {data.player1Score}</p>
            </div>
            <div className="flex items-center justify-between font-bold ">
                <p className="pr-2 font-black">{data.player2Score}</p>
                <p > : {data.player2Symbol}</p>
            </div>
        </div>
    )
}

export default ScoreCard;