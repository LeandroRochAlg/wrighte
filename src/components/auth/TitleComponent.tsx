interface Props {
    title: string;
}

const TitleComponent = (props: Props) => {
    return (
        <h1 className="text-4xl font-bold text-center text-blue-700">{props.title}</h1>
    );
};

export default TitleComponent;