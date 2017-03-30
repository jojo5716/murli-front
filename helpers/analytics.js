import _ from 'lodash';


function formatData(keyName, dataToFormat) {
    const metricsFormated = [];
    _.forEach(dataToFormat, (dataName) => {
        const obj = {};
        obj[keyName] = dataName;
        metricsFormated.push(obj);
    });

    return metricsFormated;
}

export function formatMetrics(keyName, metrics) {
    return formatData(keyName, metrics);
}

export function formatDimensions(keyName, metrics) {
    return formatData(keyName, metrics);
}

export function overviewData(data) {
    const overview = {
        total: 0,
        rows: 0,
        maximums: 0,
        minimums: 0
    };

    _.forEach(data.result.reports, (report) => {
        overview.rows = report.data.rowCount;
        overview.maximums = report.data.maximums[0].values[0];
        overview.minimums = report.data.minimums[0].values[0];
        overview.total = report.data.totals[0].values[0];
    });

    return overview;
}

