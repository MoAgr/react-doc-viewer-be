"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var react_2 = __importDefault(require("react"));
var index_1 = __importDefault(require("../index"));
var pdf_file_pdf_1 = __importDefault(require("../exampleFiles/pdf-file.pdf"));
var png_image_png_1 = __importDefault(require("../exampleFiles/png-image.png"));
var eps_file_eps_1 = __importDefault(require("../exampleFiles/eps-file.eps"));
test("renders component with no documents", function () {
    (0, react_1.render)(react_2.default.createElement(index_1.default, { documents: [] }));
    expect(react_1.screen.getByTestId("react-doc-viewer")).toBeDefined();
});
test("renders component with documents", function () {
    var docs = [{ uri: pdf_file_pdf_1.default }, { uri: png_image_png_1.default }];
    (0, react_1.render)(react_2.default.createElement(index_1.default, { documents: docs }));
    expect(react_1.screen.getByTestId("react-doc-viewer")).toBeDefined();
    expect(react_1.screen.getByText("Document 1 of ".concat(docs.length))).toBeDefined();
});
test("renders component with unsupported file type", function () {
    var docs = [{ uri: eps_file_eps_1.default, fileType: "application/postscript" }];
    (0, react_1.render)(react_2.default.createElement(index_1.default, { documents: docs }));
    expect(react_1.screen.getByTestId("react-doc-viewer")).toBeDefined();
    expect(react_1.screen.getByText("No renderer for file type: application/postscript")).toBeInTheDocument();
});
test("renders doc viewer with initialActiveDocument prop", function () {
    var docs = [{ uri: pdf_file_pdf_1.default }, { uri: png_image_png_1.default }];
    (0, react_1.render)(react_2.default.createElement(index_1.default, { documents: docs, initialActiveDocument: docs[1] }));
    var proxyRenderer = react_1.screen.getByTestId("proxy-renderer");
    expect(react_1.screen.getByTestId("react-doc-viewer")).toBeDefined();
    expect(react_1.screen.getByText("Document 2 of ".concat(docs.length))).toBeDefined();
    expect(proxyRenderer).toBeDefined();
    expect(proxyRenderer.querySelector("img")).toBeDefined();
});
