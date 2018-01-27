import data from './../Data/data.json';


// // get by id
// ChargeDeviceId
export const getLocationById = (id) => {
    const result = data.filter((location) => {
        return location.ChargeDeviceId === id;
    });

    return result.length ? result[0] : null;
}

// // accessible
// AccessRestrictionFlag
// SubscriptionRequiredFlag
export const getAccessible = () => {
    return data.filter((location) => {
        return !location.AccessRestrictionFlag && !location.SubscriptionRequiredFlag;
    });
}


// filter
// Connector.ConnectorType
export const filterByConnectorType = (connectorType) => {
    if(connectorType === "all"){
        return getAccessible();
    }
    
    return getAccessible().filter((location, index) => {
        const connectors = location.Connector.filter((connector) => {
           return connector.ConnectorType === connectorType;
        });

        return connectors.length > 0 ? true : false;
    });
}



