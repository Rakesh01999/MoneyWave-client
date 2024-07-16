
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto md:w-4/12 text-center my-8">
            <p className="text-blue-600 mb-2">---{subHeading}---</p>
            <p className="text-3xl uppercase border-y-4 py-4">{heading}</p>
        </div>
    );
};

export default SectionTitle;