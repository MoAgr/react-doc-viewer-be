import React, { useRef, useState } from "react";
import DocViewer from "./DocViewer";
import { DocViewerRenderers } from "./renderers";
import pdfFile from "./exampleFiles/pdf-file.pdf";
import pdfMultiplePagesFile from "./exampleFiles/pdf-multiple-pages-file.pdf";
import pngFile from "./exampleFiles/png-image.png";
import csvFile from "./exampleFiles/csv-file.csv";
import epsFile from "./exampleFiles/eps-file.eps";
/* eslint-disable import/no-anonymous-default-export */
export default {
    title: "DocViewer",
};
var docs = [
    { uri: pdfFile },
    { uri: pngFile },
    { uri: csvFile },
    { uri: pdfMultiplePagesFile },
];
export var Default = function () { return (React.createElement(DocViewer, { documents: docs, initialActiveDocument: docs[1], config: {
        noRenderer: {
            overrideComponent: function (_a) {
                var document = _a.document, fileName = _a.fileName;
                var fileText = fileName || (document === null || document === void 0 ? void 0 : document.fileType) || "";
                console.log(document);
                if (fileText) {
                    return React.createElement("div", null,
                        "no renderer for ",
                        fileText);
                }
                return React.createElement("div", null, "no renderer");
            },
        },
        loadingRenderer: {
            overrideComponent: function (_a) {
                var document = _a.document, fileName = _a.fileName;
                var fileText = fileName || (document === null || document === void 0 ? void 0 : document.fileType) || "";
                if (fileText) {
                    return React.createElement("div", null,
                        "loading (",
                        fileText,
                        ")");
                }
                return React.createElement("div", null, "loading");
            },
        },
        csvDelimiter: ",",
        pdfZoom: {
            defaultZoom: 1.1,
            zoomJump: 0.2,
        },
        pdfVerticalScrollByDefault: true,
    }, language: "pl" })); };
export var WithPDFInput = function () {
    var _a = useState([]), selectedDocs = _a[0], setSelectedDocs = _a[1];
    return (React.createElement(React.Fragment, null,
        React.createElement("input", { type: "file", accept: ".pdf", multiple: true, onChange: function (el) {
                var _a;
                return ((_a = el.target.files) === null || _a === void 0 ? void 0 : _a.length) &&
                    setSelectedDocs(Array.from(el.target.files));
            } }),
        React.createElement(DocViewer, { documents: selectedDocs.map(function (file) { return ({
                uri: window.URL.createObjectURL(file),
                fileName: file.name,
            }); }), pluginRenderers: DocViewerRenderers })));
};
export var ManualNextPrevNavigation = function () {
    var _a = useState(docs[0]), activeDocument = _a[0], setActiveDocument = _a[1];
    var handleDocumentChange = function (document) {
        setActiveDocument(document);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(DocViewer, { documents: docs, activeDocument: activeDocument, onDocumentChange: handleDocumentChange })));
};
export var WithRef = function () {
    var docViewerRef = useRef(null);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            React.createElement("button", { onClick: function () { var _a; return (_a = docViewerRef === null || docViewerRef === void 0 ? void 0 : docViewerRef.current) === null || _a === void 0 ? void 0 : _a.prev(); } }, "Prev Document By Ref"),
            React.createElement("button", { onClick: function () { var _a; return (_a = docViewerRef === null || docViewerRef === void 0 ? void 0 : docViewerRef.current) === null || _a === void 0 ? void 0 : _a.next(); } }, "Next Document By Ref")),
        React.createElement(DocViewer, { ref: docViewerRef, documents: docs, config: { header: { disableHeader: true } } })));
};
export var NoRenderType = function () {
    var docs = [{ uri: epsFile, fileType: "application/postscript" }];
    return (React.createElement(DocViewer, { documents: docs, initialActiveDocument: docs[0], pluginRenderers: DocViewerRenderers, language: "en" }));
};
