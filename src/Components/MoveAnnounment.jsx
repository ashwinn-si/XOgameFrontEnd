function MoveAnnounment(props) {
    return (
        <p className="text-[1.1rem] lg:text-[1.4rem] font-bold text-center pt-3 text-highlighting">
            {props.props.player} <span className="font-semibold text-black">Turn</span>
        </p>
    )
}

export default MoveAnnounment;