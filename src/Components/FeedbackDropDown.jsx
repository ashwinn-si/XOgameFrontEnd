import {forwardRef, useImperativeHandle, useState} from "react";

const FeedbackDropDown = forwardRef((props, ref ) => {
    const [selectedOption, setSelectedOption] = useState(5); // State to store the selected option

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value); // Update state when option changes
    };

    useImperativeHandle(ref, () => ({
        getData() {
            return {
                feedbackTitle: props.props.title,
                feedback: selectedOption,
            }
        }
    }))

    return (
        <div className="flex w-full justify-evenly align-items-center my-3">
            <label htmlFor="options" className="text-xl font-semibold w-[50%] text-center">{props.props.title}</label>
            <div className="w-[50%] flex items-center justify-evenly">
                <select id="options" value={selectedOption} onChange={handleSelectChange}
                        className="  -translate-x-[3px] -translate-y-[3px] border-borderColor shadow-[3px_3px_0_#000000] px-2 py-1 border-black border-[3px] bg-white "
                        >
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
            </div>

        </div>
    );
})
export default FeedbackDropDown;
