import { getByState } from "../../repositories/covid-api";

export interface ITableInfoByState {
    data: string[][];
}

export const getChartInfoByState = async () => {
    const casesByState = await getByState();

    const data = casesByState.map(stateInfo => [stateInfo.uf, stateInfo.cases.toLocaleString(), stateInfo.deaths.toLocaleString()]);
        
    const result: ITableInfoByState = {
        data: data
    }

    return result;
}