function Container({ children }) {
    return (
        <div className="w-screen h-screen bg-mainBg flex justify-center items-center z-0">
            <div
                className="font-main w-300 h-[400px] lg:w-500 lg:h-500 -translate-x-[6px] -translate-y-[6px] bg-netural border-[3px] border-borderColor shadow-[12px_12px_0_#000000] overflow-hidden transition-all duration-300 ease-linear hover:-translate-x-[12px] hover:-translate-y-[12px]">
                {children}
            </div>
        </div>


    )
}

export default Container;