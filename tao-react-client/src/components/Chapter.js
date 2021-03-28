import { useParams } from "react-router";

const Chapter = () => {
    const { code } = useParams();

    return <div>Chapter {code}</div>;
}

export default Chapter;