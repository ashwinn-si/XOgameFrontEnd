function Button(props){
    return (
        <button
            className="px-[5px] py-[2.5px] lg:px-[10px] lg:py-[5px] text-button lg:text-button-lg mt-[10px] border-[3px] border-borderColor shadow-[3px_3px_0_#000000] font-[750] bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000]" onClick={props.props.clickFunction}>
            {props.props.content}
        </button>
    )
}

export default Button