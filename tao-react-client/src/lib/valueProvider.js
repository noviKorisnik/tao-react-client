import { getData, storeData, clearData } from './localStorage';

const path = '/Tao.json';

const getTao = (t) => {
    t.books.forEach(book => {
        book.chapters = [];
    });
    return t;
}
const getBook = (t, code) => {
    const book = t.books.find(b => b.code === code);
    if (!book) return null;
    book.chapters.forEach(chapter => {
        chapter.paragraphs = [];
    });
    return book;
}
const getChapter = (t, code) => {
    let chapter;
    try {
        const book = t
            .books
            .find(b => b.chapters.some(c => c.code === code));
        chapter = t
            .books
            .find(b => b.chapters.some(c => c.code === code))
            .chapters
            .find(c => c.code === code);
    } catch (e) {
        return null;
    }
    if (!chapter) return null;
    return chapter;
}

const provideData = async (key) => {
    let data = getData(key);
    if (data) {
        return data;
    }
    if (key) {
        const [a, b, c] = key.split('/');
        const t = await (await fetch(path)).json();
        if (a.toLowerCase() === 'tao') {
            if (b === undefined) {
                data = getTao(t);
            } else {
                switch (b.toLowerCase()) {
                    case 'book':
                        data = getBook(t, c);
                        break;
                    case 'chapter':
                        data = getChapter(t, c);
                        break;
                    default:
                        break;
                };
            }
        }
    }
    if (data) {
        storeData(key, data);
        return data;
    }
    return null;
}

export default provideData;