"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoRenderType = exports.WithRef = exports.ManualNextPrevNavigation = exports.WithPDFInput = exports.Default = void 0;
var react_1 = __importStar(require("react"));
var DocViewer_1 = __importDefault(require("./DocViewer"));
var renderers_1 = require("./renderers");
var pdf_file_pdf_1 = __importDefault(require("./exampleFiles/pdf-file.pdf"));
var pdf_multiple_pages_file_pdf_1 = __importDefault(require("./exampleFiles/pdf-multiple-pages-file.pdf"));
var png_image_png_1 = __importDefault(require("./exampleFiles/png-image.png"));
var csv_file_csv_1 = __importDefault(require("./exampleFiles/csv-file.csv"));
var eps_file_eps_1 = __importDefault(require("./exampleFiles/eps-file.eps"));
/* eslint-disable import/no-anonymous-default-export */
exports.default = {
    title: "DocViewer",
};
var docs = [
    { uri: pdf_file_pdf_1.default },
    { uri: png_image_png_1.default },
    { uri: csv_file_csv_1.default },
    { uri: pdf_multiple_pages_file_pdf_1.default },
];
var Default = function () { return (react_1.default.createElement(DocViewer_1.default, { documents: docs, initialActiveDocument: docs[1], config: {
        noRenderer: {
            overrideComponent: function (_a) {
                var document = _a.document, fileName = _a.fileName;
                var fileText = fileName || (document === null || document === void 0 ? void 0 : document.fileType) || "";
                console.log(document);
                if (fileText) {
                    return react_1.default.createElement("div", null,
                        "no renderer for ",
                        fileText);
                }
                return react_1.default.createElement("div", null, "no renderer");
            },
        },
        loadingRenderer: {
            overrideComponent: function (_a) {
                var document = _a.document, fileName = _a.fileName;
                var fileText = fileName || (document === null || document === void 0 ? void 0 : document.fileType) || "";
                if (fileText) {
                    return react_1.default.createElement("div", null,
                        "loading (",
                        fileText,
                        ")");
                }
                return react_1.default.createElement("div", null, "loading");
            },
        },
        csvDelimiter: ",",
        pdfZoom: {
            defaultZoom: 1.1,
            zoomJump: 0.2,
        },
        pdfVerticalScrollByDefault: true,
    }, language: "pl" })); };
exports.Default = Default;
var WithPDFInput = function () {
    var _a = (0, react_1.useState)([]), selectedDocs = _a[0], setSelectedDocs = _a[1];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("input", { type: "file", accept: ".pdf", multiple: true, onChange: function (el) {
                var _a;
                return ((_a = el.target.files) === null || _a === void 0 ? void 0 : _a.length) &&
                    setSelectedDocs(Array.from(el.target.files));
            } }),
        react_1.default.createElement(DocViewer_1.default, { documents: selectedDocs.map(function (file) { return ({
                uri: window.URL.createObjectURL(file),
                fileName: file.name,
            }); }), pluginRenderers: renderers_1.DocViewerRenderers })));
};
exports.WithPDFInput = WithPDFInput;
var ManualNextPrevNavigation = function () {
    var _a = (0, react_1.useState)(docs[0]), activeDocument = _a[0], setActiveDocument = _a[1];
    var handleDocumentChange = function (document) {
        setActiveDocument(document);
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(DocViewer_1.default, { documents: docs, activeDocument: activeDocument, onDocumentChange: handleDocumentChange })));
};
exports.ManualNextPrevNavigation = ManualNextPrevNavigation;
var WithRef = function () {
    var docViewerRef = (0, react_1.useRef)(null);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: function () { var _a; return (_a = docViewerRef === null || docViewerRef === void 0 ? void 0 : docViewerRef.current) === null || _a === void 0 ? void 0 : _a.prev(); } }, "Prev Document By Ref"),
            react_1.default.createElement("button", { onClick: function () { var _a; return (_a = docViewerRef === null || docViewerRef === void 0 ? void 0 : docViewerRef.current) === null || _a === void 0 ? void 0 : _a.next(); } }, "Next Document By Ref")),
        react_1.default.createElement(DocViewer_1.default, { ref: docViewerRef, documents: docs, config: { header: { disableHeader: true } } })));
};
exports.WithRef = WithRef;
var NoRenderType = function () {
    var docs = [{ uri: eps_file_eps_1.default, fileType: "application/postscript" }];
    return (react_1.default.createElement(DocViewer_1.default, { documents: docs, initialActiveDocument: docs[0], pluginRenderers: renderers_1.DocViewerRenderers, language: "en" }));
};
exports.NoRenderType = NoRenderType;
