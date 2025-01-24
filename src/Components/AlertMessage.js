function AlertMessage({props}) {
    return (
        <div className="flex justify-center items-center w-full my-3">
            <div
                className="-translate-x-[3px] -translate-y-[3px] bg-netural border-[3px] border-borderColor shadow-[3px_3px_0_#000000] overflow-hidden transition-all duration-300 ease-linear px-4 py-2 animate-bounce">
                {props.content}
            </div>
        </div>


    )
}

export default AlertMessage;