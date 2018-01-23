import React from "react";

const ConnectorTypes = (props) => {
    return (<select className="types" onChange={props.onChange}>
    <option name="type" value="all">
      {" "}
      Select Connector Type{" "}
    </option>
    <option name="type" value="all">
      {" "}
      Show all{" "}
    </option>
    <option name="type" value="3-pin Type G (BS1363)">
      {" "}
      3-pin Type G (BS1363){" "}
    </option>
    <option name="type" value="JEVS G105 (CHAdeMO) DC">
      {" "}
      JEVS G105 (CHAdeMO) DC{" "}
    </option>
    <option name="type" value="Type 1 SAEJ1772 (IEC 62196)">
      {" "}
      Type 1 SAEJ1772 (IEC 62196){" "}
    </option>
    <option name="type" value="Type 2 Combo (IEC62196) DC">
      {" "}
      Type 2 Combo (IEC62196) DC{" "}
    </option>
    <option name="type" value="Type 2 Mennekes (IEC62196)">
      {" "}
      Type 2 Mennekes (IEC62196){" "}
    </option>
    <option name="type" value="Type 2 Tesla (IEC62196) DC">
      {" "}
      Type 2 Tesla (IEC62196) DC{" "}
    </option>
    <option name="type" value="Type 3 Scame (IEC62196)">
      {" "}
      Type 3 Scame (IEC62196){" "}
    </option>
  </select>);
}

export {ConnectorTypes};