import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import provideData from "../lib/valueProvider";

const Chapter = () => {
    const { code } = useParams();
    const history = useHistory();
    const [chapter, setChapter] = useState(null);
    const [book, setBook] = useState(null);
    const [tao, setTao] = useState(null);

    useEffect(() => {
        if (!chapter || chapter.code !== code) {
            provideData(`Tao/Chapter/${code}`)
                .then((c) => { setChapter(c); });
        }
    }, [code, chapter]);
    useEffect(() => {
        if (!tao) {
            provideData('Tao')
                .then((t) => { setTao(t); });
        }
    }, [tao]);
    useEffect(() => {
        if (tao && chapter) {
            const bookCode = tao.books.find(b => b.id === chapter.bookId).code;
            if (!book || book.code !== bookCode) {
                provideData(`Tao/Book/${bookCode}`)
                    .then((b) => { setBook(b); });
            }
        }
    }, [book, chapter, tao]);
    useEffect(() => {
        if (tao && book && chapter) {
            document.title = `${chapter.code} - ${book.title} - ${tao.title}`;
        }
    }, [tao, book, chapter]);


    if (chapter) return (
        <>
            {!tao || <Link to={{ pathname: '/' }}>{tao.title}</Link>}
            {!(tao && book) || <> | </>}
            {!book || <Link to={{ pathname: `/book/${book.code}` }}>{book.code} : {book.title}</Link>}
            {!book || <> | <select onChange={(e) => { history.push(`/chapter/${e.target.value}`); }}>
                {book.chapters.map((c) =>
                    <option key={c.code} value={c.code} selected={code === c.code}>Chapter {c.code}</option>
                )}
            </select>
            </>}
            <h5>{code}</h5>
            {chapter.paragraphs.map(
                paragraph =>
                    paragraph.isBlockquote
                        ? <blockquote key={paragraph.id} style={{ whiteSpace: 'pre' }}>{paragraph.text}</blockquote>
                        : <p key={paragraph.id}>{paragraph.text}</p>
            )}
        </>
    );

    return <div>Chapter: {code}</div>;
}

export default Chapter;