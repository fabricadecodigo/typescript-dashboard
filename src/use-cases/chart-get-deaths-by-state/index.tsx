import { getByState } from "../../repositories/covid-api";

export interface IChartDeathsByState {
    data: {
        labels: string[];
        series: any[];
    },
    options: any;
}

export const getChartDeathsByState = async () => {
    const casesByState = await getByState();
    const labels: string[] = [];
    const deaths: number[] = [];

    const transformedDate = casesByState.map(state => ({ uf: state.uf, deaths: state.deaths }));
    const transformedOrdered = transformedDate.sort((a, b) => b.deaths - a.deaths);

    for (const state of transformedOrdered) {
        labels.push(state.uf);
        deaths.push(state.deaths)
    }

    const data: IChartDeathsByState = {
        data: {
            labels: labels,
            series: [
                deaths
            ]
        },
        options: {
            axisX: {
                showLabel: true,
                showGrid: false,
            },
            axisY: {
                showLabel: true,
                showGrid: false,
            }
        }
    }

    return data;
};
