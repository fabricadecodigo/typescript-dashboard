import { getByState } from "../../repositories/covid-api";

export interface IChartCasesByState {
    data: {
        labels: string[];
        series: any[];
    },
    options: any;
}

export const getChartCasesByState = async () => {
    const casesByState = await getByState();
    const labels: string[] = [];
    const cases: number[] = [];

    for (const state of casesByState) {
        labels.push(state.uf);
        cases.push(state.cases);
    }
    const data: IChartCasesByState = {
        data: {
            labels: labels,
            series: [
                cases
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
            },
            // // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
            // width: undefined,
            // // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
            // height: undefined,
            // // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
            // high: undefined,
            // // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
            // low: 0,
            // // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
            // referenceValue: 1003429,
            // // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
            // chartPadding: {
            //     top: 100,
            //     right: 100,
            //     bottom: 100,
            //     left: 100
            // },
            // // Specify the distance in pixel of bars in a group
            // seriesBarDistance: 15,
            // // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
            // stackBars: false,
            // // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
            // // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
            // stackMode: 'accumulate',
            // // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
            // horizontalBars: false,
            // // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
            // distributeSeries: false,
            // // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
            // reverseData: false,
            // // If the bar chart should add a background fill to the .ct-grids group.
            // showGridBackground: false,
        }
    }

    return data;
};
