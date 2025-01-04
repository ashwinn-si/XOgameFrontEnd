function ErrorMessage(props) {
    return (
        //highlight for changing the text
        <p className="text-[1.1rem] lg:text-[1.4rem] font-extrabold text-center pt-1.5 animate-pulse">
            {props.props.content}
        </p>
    )
}

export default ErrorMessage;