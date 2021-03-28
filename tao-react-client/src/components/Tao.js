import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import provideData from "../lib/valueProvider";

const Tao = () => {
    const [tao, setTao] = useState(null);

    useEffect(() => {
        if (!tao) {
            provideData('Tao')
                .then((data) => { setTao(data); });
        }
    }, [tao]);
    useEffect(() => {
        if (tao) {
            document.title = `${tao.title}`;
        }
    }, [tao]);

    if (tao) return (
        <>
            <h3>{tao.author}</h3>
            <h1>{tao.title}</h1>
            <ul>
                {tao.books.map(
                    book => <li key={book.code}><Link to={{ pathname: `/book/${book.code}` }}>{book.code} : {book.title}</Link></li>
                )}
            </ul>
        </>
    );
    return <div>... Tao...</div>;
}

export default Tao;