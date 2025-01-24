import {forwardRef, useImperativeHandle, useState} from "react";

const UserNameField = forwardRef((props, ref) => {
    const [context , setContext] = useState(null);
    useImperativeHandle(ref, () => ({
        getData(){
            return context
        }
    }))

    return(
        <div className="w-[100%] flex justify-evenly items-center flex-col lg:flex-row ">
            <div className=" w-[30%] flex justify-center items-center">
                <p className="text-xl font-bold my-3 lg:m-0">{props.props.content}</p>
            </div>
            <div className=" w-[70%] flex justify-center items-center">
                <input
                    className=" border-2 border-solid border-borderColor font-semibold shadow-[6px_6px_0_#000000] p-1"
                    type="text" placeholder="Enter" required onChange={e => setContext(e.target.value)}/>
            </div>


        </div>

    )
})

export default UserNameField;