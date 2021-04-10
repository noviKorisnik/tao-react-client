import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import provideData from "../lib/valueProvider";

const Book = () => {
    const { code } = useParams();
    const history = useHistory();
    const [book, setBook] = useState(null);
    const [tao, setTao] = useState(null);

    useEffect(() => {
        if (!book || book.code !== code) {
            provideData(`Tao/Book/${code}`)
                .then((b) => { setBook(b); });
        }
    }, [code, book]);
    useEffect(() => {
        if (!tao) {
            provideData('Tao')
                .then((t) => { setTao(t); });
        }
    }, [tao]);
    useEffect(() => {
        if (tao && book) {
            document.title = `${book.code} : ${book.title} - ${tao.title}`;
        }
    }, [tao, book]);

    if (book) return (
        <>
            {!tao || <Link to={{ pathname: '/' }}>{tao.title}</Link>}
            {!tao || <> | <select onChange={(e) => { history.push(`/book/${e.target.value}`); }} value={code}>
                {tao.books.map((b) =>
                    <option key={b.code} value={b.code}>{b.code} : {b.title}</option>
                )}
            </select>
            </>}
            <hr />
            <h4 class="code">{code}</h4>
            <h2 class="title">{book.title}</h2>
            <h6 class="quoted">{book.quoted}</h6>
            <h4 class="quote">{book.quote}</h4>
        </>
    );

    return <div>Book: {code}</div>;
}

export default Book;