function Header({props}) {
    return (
        <div
            className="font-main text-heading lg:text-heading-lg font-black w-full p-2 bg-white   text-black border-b-[3px] border-borderColor">{props.header}
        </div>
    )
}

export default Header;