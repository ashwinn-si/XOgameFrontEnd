function RoomIDHeader({props}) {

    return (
        <div
            className="font-main text-heading lg:text-heading-lg font-semibold w-full p-2 bg-white   text-black border-b-[3px] border-borderColor pl-2">
            <p>
                Room ID :
                <span className="text-highlighting font-black pl-2">{props.roomID}</span>
                <span className="material-symbols-outlined text-black pl-2 text-xl lg:text-2xl cursor-pointer" onClick={props.handleClickFunction}>
                    content_copy
                </span>
            </p>
        </div>
    )
}

export default RoomIDHeader;