/*
 * Copyright (C) 2021-2026 Erik Hetzner
 *
 * This file is part of XJSLT.
 *
 * XJSLT is free software: you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * XJSLT is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with XJSLT. If not, see
 * <https://www.gnu.org/licenses/>.
 */

import { parseNumberFormat } from "../src/compile";

describe("parseNumberFormat", () => {
  describe("Simple formats", () => {
    test("single digit format '1'", () => {
      const result = parseNumberFormat("1");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "1" }],
      });
    });

    test("zero-padded format '01'", () => {
      const result = parseNumberFormat("01");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "01" }],
      });
    });

    test("lowercase alphabetic 'a'", () => {
      const result = parseNumberFormat("a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "a" }],
      });
    });

    test("uppercase alphabetic 'A'", () => {
      const result = parseNumberFormat("A");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "A" }],
      });
    });

    test("lowercase roman 'i'", () => {
      const result = parseNumberFormat("i");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "i" }],
      });
    });

    test("uppercase roman 'I'", () => {
      const result = parseNumberFormat("I");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "I" }],
      });
    });
  });

  describe("Formats with prefixes", () => {
    test("format with symbolic prefix '§1'", () => {
      const result = parseNumberFormat("§1");
      expect(result).toEqual({
        prefix: "§",
        suffix: undefined,
        formats: [{ format: "1" }],
      });
    });

    test("format with parenthesis prefix '(1'", () => {
      const result = parseNumberFormat("(1");
      expect(result).toEqual({
        prefix: "(",
        suffix: undefined,
        formats: [{ format: "1" }],
      });
    });
  });

  describe("Formats with suffixes", () => {
    test("format with period suffix '1.'", () => {
      const result = parseNumberFormat("1.");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ".",
        formats: [{ format: "1" }],
      });
    });

    test("format with parenthesis suffix '1)'", () => {
      const result = parseNumberFormat("1)");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ")",
        formats: [{ format: "1" }],
      });
    });

    test("format with colon suffix 'A:'", () => {
      const result = parseNumberFormat("A:");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ":",
        formats: [{ format: "A" }],
      });
    });
  });

  describe("Formats with both prefix and suffix", () => {
    test("format with parentheses '(1)'", () => {
      const result = parseNumberFormat("(1)");
      expect(result).toEqual({
        prefix: "(",
        suffix: ")",
        formats: [{ format: "1" }],
      });
    });

    test("format with punctuation '- 1 -'", () => {
      const result = parseNumberFormat("- 1 -");
      expect(result).toEqual({
        prefix: "- ",
        suffix: " -",
        formats: [{ format: "1" }],
      });
    });
  });

  describe("Multi-level hierarchical formats", () => {
    test("two-level format '1.1'", () => {
      const result = parseNumberFormat("1.1");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "1", separator: "." }, { format: "1" }],
      });
    });

    test("mixed format '1.a'", () => {
      const result = parseNumberFormat("1.a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "1", separator: "." }, { format: "a" }],
      });
    });

    test("three-level format '1.1.1'", () => {
      const result = parseNumberFormat("1.1.1");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "1", separator: "." },
          { format: "1" },
        ],
      });
    });

    test("complex mixed format 'A.1.a'", () => {
      const result = parseNumberFormat("A.1.a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "A", separator: "." },
          { format: "1", separator: "." },
          { format: "a" },
        ],
      });
    });

    test("format with different separators '1-a.i'", () => {
      const result = parseNumberFormat("1-a.i");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "-" },
          { format: "a", separator: "." },
          { format: "i" },
        ],
      });
    });
  });

  describe("Complex formats with prefix and suffix", () => {
    test("hierarchical with prefix '§ 1.1'", () => {
      const result = parseNumberFormat("§ 1.1");
      expect(result).toEqual({
        prefix: "§ ",
        suffix: undefined,
        formats: [{ format: "1", separator: "." }, { format: "1" }],
      });
    });

    test("hierarchical with suffix '1.1.'", () => {
      const result = parseNumberFormat("1.1.");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ".",
        formats: [{ format: "1", separator: "." }, { format: "1" }],
      });
    });

    test("hierarchical with both '(1.a.i)'", () => {
      const result = parseNumberFormat("(1.a.i)");
      expect(result).toEqual({
        prefix: "(",
        suffix: ")",
        formats: [
          { format: "1", separator: "." },
          { format: "a", separator: "." },
          { format: "i" },
        ],
      });
    });
  });

  describe("Edge cases", () => {
    test("empty string", () => {
      const result = parseNumberFormat("");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [],
      });
    });

    test("only non-alphanumeric characters", () => {
      const result = parseNumberFormat("...");
      expect(result).toEqual({
        prefix: "...",
        suffix: undefined,
        formats: [],
      });
    });

    test("format with multi-character separator '1---a'", () => {
      const result = parseNumberFormat("1---a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "1", separator: "---" }, { format: "a" }],
      });
    });

    test("format with whitespace separator '1   a'", () => {
      const result = parseNumberFormat("1   a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "1", separator: "   " }, { format: "a" }],
      });
    });

    test("Unicode decimal digits", () => {
      const result = parseNumberFormat("١");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "١" }],
      });
    });
  });
});
