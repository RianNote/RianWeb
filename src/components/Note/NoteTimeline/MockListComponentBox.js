import React from "react";
import "./MockCss.css";
const MocklineBox = ({ title, final_modified_at, snippet, tag }) => {
    return (
        <div className="box-container">
            <div className="box-body">
                <div className="body-text">
                    <div className="box-title">{title}</div>
                    <div className="box-snippet">{snippet}</div>
                </div>
                <div className="box-right-bar">
                    <div className="box-weekday">화요일</div>
                    <div className="box-date">
                        {final_modified_at.split("/")[1]}
                    </div>
                </div>
            </div>
            <div className="box-footer">
                <div className="box-tags">
                    <div className="tag-mark">
                        <div className="color-circle tag1" />
                        <div className="box-tag">{tag}</div>
                    </div>
                    <div className="tag-mark">
                        <div className="color-circle tag2" />
                        <div className="box-tag">{tag}</div>
                    </div>
                    <div className="tag-mark">
                        <div className="color-circle tag3" />
                        <div className="box-tag">{tag}</div>
                    </div>
                </div>
                <div className="box-bottom-bar" />
            </div>
        </div>
    );
};

export default MocklineBox;
