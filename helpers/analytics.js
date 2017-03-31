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
        total: [],
        rows: 0,
        maximums: [],
        minimums: []
    };

    _.forEach(data.result.reports, (report) => {
        const metrics = report.columnHeader.metricHeader.metricHeaderEntries;
        const metricsName = metrics.map(metric => metric.name);
        const metricsValues = report.data.totals[0].values;
        overview.total = _.zip(metricsName, metricsValues);
        overview.maximums = _.zip(metricsName, report.data.maximums[0].values);
        overview.minimums = _.zip(metricsName, report.data.minimums[0].values);
        overview.rows = report.data.rowCount;
    });

    return overview;
}

export function AnalyticsCharts(data) {
    const charts = {};

    _.forEach(data.result.reports, (report) => {
        const metrics = report.columnHeader.metricHeader.metricHeaderEntries;
        const metricsName = metrics.map(metric => metric.name);

        const dimensions = report.columnHeader.dimensions;
        const dimensionsName = dimensions.map(dimension => dimension);


        dimensionsName.map((dimensionName, dimensionIndex) => {
            // ga:country
            report.data.rows.map((row) => {
                if (!charts[dimensionName]) {
                    charts[dimensionName] = {};
                }

                const dimensionValue = row.dimensions[dimensionIndex]; // (not set), Spain...

                if (!charts[dimensionName][dimensionValue]) {
                    charts[dimensionName][dimensionValue] = {};
                }

                metricsName.map((metricName, metricIndex) => {
                    // Users
                    if (!charts[dimensionName][dimensionValue][metricName]) {
                        charts[dimensionName][dimensionValue][metricName] = 0;
                    }

                    const metricsValues = row.metrics[0].values;
                    charts[dimensionName][dimensionValue][metricName] += parseInt(metricsValues[metricIndex], 10);
                });
            });
        });

    });
    return charts;
}

export function getMetricsName(data) {
    const metrics = _.map(data.result.reports, report =>
        report.columnHeader.metricHeader.metricHeaderEntries.map(metric => metric.name)
    );

    return metrics[0] || [];
}

export function getChartData(metricsName, data) {
    const charts = {};
    Object.keys(data).map((dimensionName) => { // ga:country
        Object.keys(data[dimensionName]).map((dimension) => { // (not set)
            if (!charts[dimensionName]) {
                charts[dimensionName] = {};// ga:country
            }

            metricsName.map((metric) => {
                // Country
                if (!charts[dimensionName][metric]) {
                    charts[dimensionName][metric] = [];
                }
                charts[dimensionName][metric].push(data[dimensionName][dimension][metric]);
            });
        });

    });

    return charts;
}
