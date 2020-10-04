import API from './covid-api-config';

interface ICovidByState {
    uid: number;
    uf: string;
    state: string;
    cases: number;
    deaths: number;
    suspects: number;
    refuses: number;
}

interface ICovidBrazil {
    cases: number;
    confirmed: number;
    deaths: number;
    recovered: number;
    updated_at: string;
}

const getTotalInBrazil = async () => {
    const result: ICovidBrazil = await API.get('/brazil').then(res => res.data.data);
    return result;
}

const getByState = async () => {
    const result: ICovidByState[] = await API.get('/').then(res => res.data.data);
    return result;
}

export {
    getTotalInBrazil,
    getByState
};