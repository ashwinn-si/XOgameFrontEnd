function WinnerAnnoument({props}) {
    return (
        <p className="text-[1.1rem] lg:text-[1.4rem] font-bold text-center pt-1.5 animate-pulse text-wrap">
            {props.text === "Tie Wins !!!" ? (
                <>
                    <span className="font-black text-highlighting"> Tie !!! </span>
                    Next Round in {props.time}
                </>
            ) : (
                <>
                    <span className="font-black text-highlighting"> {props.text} </span>
                    Next Round in {props.time}
                </>
            )}
        </p>


    )
}

export default WinnerAnnoument;