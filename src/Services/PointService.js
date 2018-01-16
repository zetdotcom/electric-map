import data from './../Data/data.json';

// filter
// Connector.ConnectorType


// // get by id
// ChargeDeviceId


// // accessible
// AccessRestrictionFlag
// SubscriptionRequiredFlag

export const getLocationById = (id) => {
    const result = data.filter((location) => {
        return location.ChargeDeviceId === id;
    });

    return result.length ? result[0] : null;
}

export const getAccessible = () => {
    return data.filter((location) => {
        return !location.AccessRestrictionFlag && !location.SubscriptionRequiredFlag;
    });
}

export const filterByConnectorType = (connectorType) => {
    return getAccessible().filter((location, index) => {
        const connectors = location.Connector.filter((connector) => {
            return connector.ConnectorType === connectorType;
        });

        return connectors.length > 0 ? true : false;
    });
}