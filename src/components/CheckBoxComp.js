import React from "react";

const CheckBoxComp = () => {
    return (
        <div>
            <div className="page__section">
                <div className="page__toggle">
                    <label className="toggle">
                        <input className="toggle__input" type="checkbox"/>
                        <span className="toggle__label">
                            <span className="toggle__text">Segunda-feira</span>
                         </span>
                    </label>
                </div>
            </div>
        </div>
    )
}
export default CheckBoxComp