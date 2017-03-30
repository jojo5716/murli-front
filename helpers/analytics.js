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

