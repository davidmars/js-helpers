import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { default: IframeMessageSender } = require("../dist/window/IframeMessageSender.js");
const { default: FileDropper } = require("../dist/browser/FileDropper.js");

const iframeMessageSender = new IframeMessageSender("iframe");
const fileDropper = new FileDropper();

assert.equal(typeof iframeMessageSender.evt.on, "function");
assert.equal(typeof fileDropper.on, "function");

console.log("Runtime imports OK: IframeMessageSender, FileDropper");
