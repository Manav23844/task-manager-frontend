import "@testing-library/jest-dom";

// React Router relies on TextEncoder in some environments (JSDOM + Jest).
import { TextDecoder, TextEncoder } from "util";

if (!globalThis.TextEncoder) {
  globalThis.TextEncoder = TextEncoder;
}

if (!globalThis.TextDecoder) {
  globalThis.TextDecoder = TextDecoder;
}

