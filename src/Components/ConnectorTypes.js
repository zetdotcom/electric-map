import React from "react";

import data from './../Data/data.json';


const ConnectorTypes = (props) => {

  function unique(value, index, self) { 
    return self.indexOf(value) === index;
}
  var ct = data.map((item) => {
    return item
      .Connector
      .map((type) => {
        return type.ConnectorType
      })
  })
  const newArr = Array
    .prototype
    .concat(...ct);
    const types = newArr.filter( unique );
  console.log(newArr.filter( unique ));
  

    return (<select className="types" onChange={props.onChange}>
    <option name="type" value="all">
      {" "}
      Select Connector Type{" "}
    </option>
    <option name="type" value="all">
      {" "}
      Show all{" "}
    </option>
    {types.map((connectorType, index) => {
      return <option name="type" value={connectorType} key={index}>
      {" "}
      {connectorType}{" "}
    </option>
    })}
    
  </select>);
}

export {ConnectorTypes};


// <option name="type" value="3-pin Type G (BS1363)">
//       {" "}
//       3-pin Type G (BS1363){" "}
//     </option>
//     <option name="type" value="JEVS G105 (CHAdeMO) DC">
//       {" "}
//       JEVS G105 (CHAdeMO) DC{" "}
//     </option>
//     <option name="type" value="Type 1 SAEJ1772 (IEC 62196)">
//       {" "}
//       Type 1 SAEJ1772 (IEC 62196){" "}
//     </option>
//     <option name="type" value="Type 2 Combo (IEC62196) DC">
//       {" "}
//       Type 2 Combo (IEC62196) DC{" "}
//     </option>
//     <option name="type" value="Type 2 Mennekes (IEC62196)">
//       {" "}
//       Type 2 Mennekes (IEC62196){" "}
//     </option>
//     <option name="type" value="Type 2 Tesla (IEC62196) DC">
//       {" "}
//       Type 2 Tesla (IEC62196) DC{" "}
//     </option>
//     <option name="type" value="Type 3 Scame (IEC62196)">
//       {" "}
//       Type 3 Scame (IEC62196){" "}
//     </option>