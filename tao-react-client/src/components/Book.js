import { useParams } from "react-router";

const Book = () => {
    const { code } = useParams();

    return <div>Book {code}</div>;
}

export default Book;