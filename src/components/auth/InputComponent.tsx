import { ComponentProps, forwardRef } from "react";

interface Props extends Omit<ComponentProps<"input">, "label"> {
    label: string;
}

const InputComponent = forwardRef<HTMLInputElement, Props>(
    ({ label, ...rest }, ref) => {
        return (
            <div className="mt-2 mb-1">
                <label className="block text-sm text-white">{label}</label>
                <input ref={ref} {...rest} className="w-[275px] focus:outline-none focus:underline hover:underline mx-auto border-none bg-white mt-1 rounded-lg h-9 px-3"/>
            </div>
        );
    }
);

export default InputComponent;