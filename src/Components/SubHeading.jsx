function SubHeading(props) {
    return (
        <p className="m-1 text-[1.1rem] lg:text-[1.4rem] font-extrabold text-center">
            {props.props.content}
        </p>
    )
}

export default SubHeading;