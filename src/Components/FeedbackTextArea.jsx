import {forwardRef, useImperativeHandle, useState} from "react";

const  FeedbackTextArea = forwardRef((props, ref )  => {
    const [feedback, setFeedback] = useState("");
    useImperativeHandle(ref, () => ({
        getData() {
            return {
                feedbackTitle : "Extra Suggestion",
                feedback : feedback,
            }
        }
    }))
    return(
        <div className="flex w-full justify-evenly align-items-center my-3">
            <label htmlFor="options" className="text-xl font-semibold w-[50%] text-center">Any Suggestion</label>
            <div className="w-[50%] flex items-center justify-evenly">
                <input type={"text"} className=" h-[20%]text-wrap -translate-x-[3px] -translate-y-[3px] border-borderColor shadow-[3px_3px_0_#000000] px-2 py-1 border-black border bg-white w-[98%]" placeholder={"Enter"} onChange={(e) => setFeedback(e.target.value)} />
            </div>

        </div>
    )
})

export default FeedbackTextArea;