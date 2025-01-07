function LoadingHeader({props}) {
    return (
        <div
            className="font-main text-[1rem] lg:text-heading-lg font-semibold p-2  text-black h-[80%] w-full text-center flex justify-center items-center">
            <p>
                First To get <span className="text-highlighting font-black"> 3 points Win...! </span><br />Starting in {props.time} {/*higlight the need text later*/}
            </p>

        </div>
    )
}
export default LoadingHeader;