import React from 'react';
import {MdSearch, MdSettingsInputHdmi, MdSettingsInputComponent, MdFlashOn} from 'react-icons/lib/md';


export const TypeSelect = () => {

    return (
    <div className="filter-type">

        <label htmlFor="type">
            <span><MdFlashOn className="search-icons"/>All Types</span>
            <input
                name="type"
                value="all"
                type="radio"
                onChange={this.props.typeSelection}
                defaultChecked/>
        </label>
        <label htmlFor="type">
            <span><MdSettingsInputHdmi className="search-icons"/>Type 2 Mennekes</span>
            <input
                name="type"
                value="type2"
                type="radio"
                onChange={this.props.typeSelection}/>
        </label>
        <label htmlFor="type">
            <span><MdSettingsInputComponent className="search-icons"/>3-Pin Type G</span>
            <input
                name="type"
                value="3pin"
                type="radio"
                onChange={this.props.typeSelection}/>
        </label>

    </div>
    )
}