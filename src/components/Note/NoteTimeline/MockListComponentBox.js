import React, { Component } from "react";
import './MockCss.css'
const MocklineBox = ({title, final_modified_at, snippet, tag}) => {
    return (
        <div className="box-container">
                <div className="box-body">
                    <div className="box-title">{title}</div>
                    <div className="box-snippet">{snippet}</div>
                </div>
                <div className="box-right-bar">
                    <div className="box-weekday">화요일</div>
                    <div className="box-date">{final_modified_at.split('/')[1]}</div>
                </div>
                <div className="box-bottom-bar">
                    <div className="tag-mark">
                        <div className="color-circle"></div>
                        <div className="box-tag">{tag}</div>
                    </div>
                </div>
        </div>
    )
}

export default MocklineBox