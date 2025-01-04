function Container({ children }) {
    return (
        <div
            className="font-[Montserrat] w-300 h-300 lg:w-500 lg:h-500 -translate-x-[6px] -translate-y-[6px] bg-netural border-[3px] border-borderColor shadow-[12px_12px_0_#000000] overflow-hidden transition-all duration-300 ease-linear hover:-translate-x-[12px] hover:-translate-y-[12px]">
            <div className="font-[Montserrat] text-heading font-black w-full p-2 bg-white   text-black border-b-[3px] border-borderColor">Window</div>
            <div className="p-2 text-text font-semibold">
                Content here
            </div>
            <button
                className="px-[5px] py-[2.5px] lg:px-[10px] lg:py-[5px] mt-[10px] border-[3px] border-borderColor shadow-[3px_3px_0_#000000] font-[750] bg-primarybtn transition-all duration-300 ease-in-out cursor-pointer hover:translate-x-[1.5px] hover:translate-y-[1.5px] hover:shadow-[1.5px_1.5px_0_#000000] hover:bg-primarybtnHover active:translate-x-[3px] active:translate-y-[3px] active:shadow-[0_0_0_#000000]">
                Button
            </button>

        </div>

    )
}

export default Container;