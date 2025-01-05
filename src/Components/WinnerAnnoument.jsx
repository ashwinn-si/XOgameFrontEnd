function WinnerAnnoument({props}) {
    return (
        <p className="text-[1.1rem] lg:text-[1.4rem] font-extrabold text-center pt-1.5 animate-pulse">
            {props.text} Next Round in {props.time}
        </p>
    )
}

export default WinnerAnnoument;