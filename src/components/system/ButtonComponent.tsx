interface Props {
    title: string;
    onClick: () => void;
}

const ButtonComponent = (props: Props) => {
    return (
        <button className="hover:bg-green-500 bg-green-200 text-white-100 font-bold py-2 px-4 rounded-lg">
            {props.title}
        </button>
    );
}

export default ButtonComponent;