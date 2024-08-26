import React from "react";

export const Switch = ({checked, onChange}) => (
    <div class="form-check form-switch">
    <input 
        class="form-check-input" 
        type="checkbox" 
        role="switch" 
        id="flexSwitchCheckChecked" 
        checked = {checked}
        onChange = {e => onChange(e.target.checked)}> 
    </input>
    <label class="form-check-label" for="flexSwitchCheckChecked">Read Only</label>
    </div>
);