import { getData, storeData } from './localStorage';

const path = 'https://localhost:5001/';

const provideData = async (key) => {
    let data = getData(key);
    if (data) {
        return data;
    }
    //better check what if something goes wrong...
    data = await (await fetch(path + key)).json();
    storeData(key, data);
    return data;
}

export default provideData;