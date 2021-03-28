import { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import provideData from "../lib/valueProvider";


const decodePath = (path) => {
    const arr = path.split('/');
    let page;
    let code;
    if (arr.length < 3) {
        page = 'tao';
    } else {
        page = arr[1];
        code = arr[2];
    }
    return [page, code];
}

const prev = async (path) => {
    const [page, code] = decodePath(path);
    let tao, book, chapter, index;
    switch (page.toLowerCase()) {
        case 'tao': return null;
        case 'book':
            tao = await provideData('Tao');
            index = tao.books.findIndex(b => b.code === code);
            if (index < 0) return null;
            if (index === 0) return '/';
            book = await provideData(`Tao/Book/${tao.books[index - 1].code}`);
            if (book.chapters.length === 0) return `/book/${book.code}`;
            return `/chapter/${book.chapters[book.chapters.length - 1].code}`;
        case 'chapter':
            let taoPromise = provideData('Tao');
            let chapterPromise = provideData(`Tao/Chapter/${code}`);
            [tao, chapter] = await Promise.all([taoPromise, chapterPromise]);
            book = await provideData(`Tao/Book/${tao.books.find(b => b.id === chapter.bookId).code}`);
            index = book.chapters.findIndex(c => c.code === code);
            if (index < 0) return null;
            if (index === 0) return `/book/${book.code}`;
            return `/chapter/${book.chapters[index - 1].code}`;
        default:
            return null;
    }
}
const next = async (path) => {
    const [page, code] = decodePath(path);
    let tao, book, chapter, index;
    switch (page.toLowerCase()) {
        case 'tao':
            tao = await provideData('Tao');
            return `/book/${tao.books[0].code}`;
        case 'book':
            book = await provideData(`Tao/Book/${code}`);
            if (book.chapters.length > 0) return `/chapter/${book.chapters[0].code}`;
            tao = await provideData('Tao');
            index = tao.books.findIndex(b => b.code === code);
            if (index < 0) return null;
            if (index >= tao.books.length - 1) return null;
            return `/book/${tao.books[index + 1].code}`;
        case 'chapter':
            let taoPromise = provideData('Tao');
            let chapterPromise = provideData(`Tao/Chapter/${code}`);
            [tao, chapter] = await Promise.all([taoPromise, chapterPromise]);
            book = await provideData(`Tao/Book/${tao.books.find(b => b.id === chapter.bookId).code}`);
            index = book.chapters.findIndex(c => c.code === code);
            if (index < 0) return null;
            if (index < book.chapters.length - 1) return `/chapter/${book.chapters[index + 1].code}`;
            index = tao.books.findIndex(b => b.code === book.code);
            if (index < 0) return null;
            if (index >= tao.books.length - 1) return null;
            return `/book/${tao.books[index + 1].code}`;
        default:
            return null;
    }
}

const navigate = async (location, direction) => {
    let where = null;
    switch (direction) {
        case 'prev':
            where = await prev(location);
            break;
        case 'next':
            where = await next(location);
            break;
        default:
            break;
    }
    return where;
}

const useNav = () => {
    const location = useLocation();
    const history = useHistory();
    const handler = async (e) => {
        switch (e.detail.direction) {
            case 'prev':
            case 'next':
                const where = await navigate(location.pathname, e.detail.direction);
                if (where !== null) {
                    history.push(where);
                }
                break;
            default:
                break;
        }
    };
    useEffect(() => {
        document.addEventListener('navigate', handler);
        return () => {
            document.removeEventListener('navigate', handler);
        };
    });
}

const Navigator = () => {
    useNav();

    return null;
};

export default Navigator;