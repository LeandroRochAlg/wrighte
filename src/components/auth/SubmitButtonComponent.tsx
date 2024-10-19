interface Props {
    title: string;
}

const SubmitButtonComponent = (props: Props) => {
    return (
        <button type="submit" className="hover:bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mx-auto w-32 mt-5">
            {props.title}
        </button>
    );
}

export default SubmitButtonComponent;