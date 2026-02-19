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
import {
  mkToNumeric,
  toAlphabetic,
  toAlphabeticUpper,
  toNumeric,
  toRoman,
} from "../src/xjslt";

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

describe("toRoman", () => {
  describe("Basic numerals 1-10", () => {
    test("units 1-3", () => {
      expect(toRoman(1)).toBe("i");
      expect(toRoman(2)).toBe("ii");
      expect(toRoman(3)).toBe("iii");
      expect(toRoman(4)).toBe("iv");
      expect(toRoman(5)).toBe("v");
      expect(toRoman(6)).toBe("vi");
      expect(toRoman(7)).toBe("vii");
      expect(toRoman(8)).toBe("viii");
      expect(toRoman(9)).toBe("ix");
      expect(toRoman(10)).toBe("x");
    });
  });

  describe("Tens 10-100", () => {
    test("multiples of 10", () => {
      expect(toRoman(10)).toBe("x");
      expect(toRoman(20)).toBe("xx");
      expect(toRoman(30)).toBe("xxx");
      expect(toRoman(40)).toBe("xl");
      expect(toRoman(50)).toBe("l");
      expect(toRoman(60)).toBe("lx");
      expect(toRoman(70)).toBe("lxx");
      expect(toRoman(80)).toBe("lxxx");
      expect(toRoman(90)).toBe("xc");
      expect(toRoman(100)).toBe("c");
    });
  });

  describe("Large numbers", () => {
    test("thousands", () => {
      expect(toRoman(1000)).toBe("m");
      expect(toRoman(2000)).toBe("mm");
      expect(toRoman(3000)).toBe("mmm");
    });

    test("mixed large numbers", () => {
      expect(toRoman(1234)).toBe("mccxxxiv");
      expect(toRoman(2345)).toBe("mmcccxlv");
      expect(toRoman(3456)).toBe("mmmcdlvi");
      expect(toRoman(3888)).toBe("mmmdccclxxxviii");
      expect(toRoman(3999)).toBe("mmmcmxcix");
    });
  });
});

describe("toAlphabetic", () => {
  test("basic", () => {
    expect(toAlphabetic(1)).toBe("a");
    expect(toAlphabetic(2)).toBe("b");
    expect(toAlphabetic(3)).toBe("c");
    expect(toAlphabetic(26)).toBe("z");
    expect(toAlphabetic(27)).toBe("aa");
    expect(toAlphabetic(28)).toBe("ab");
    expect(toAlphabetic(29)).toBe("ac");
    expect(toAlphabetic(52)).toBe("az");
    expect(toAlphabetic(53)).toBe("ba");
    expect(toAlphabetic(54)).toBe("bb");
    expect(toAlphabetic(78)).toBe("bz");
    expect(toAlphabetic(677)).toBe("za");
    expect(toAlphabetic(702)).toBe("zz");
    expect(toAlphabetic(703)).toBe("aaa");
    expect(toAlphabetic(704)).toBe("aab");
    expect(toAlphabetic(728)).toBe("aaz");
    expect(toAlphabeticUpper(1)).toBe("A");
    expect(toAlphabeticUpper(2)).toBe("B");
    expect(toAlphabeticUpper(3)).toBe("C");
    expect(toAlphabeticUpper(26)).toBe("Z");
    expect(toAlphabeticUpper(27)).toBe("AA");
    expect(toAlphabeticUpper(28)).toBe("AB");
    expect(toAlphabeticUpper(29)).toBe("AC");
    expect(toAlphabeticUpper(52)).toBe("AZ");
    expect(toAlphabeticUpper(53)).toBe("BA");
    expect(toAlphabeticUpper(54)).toBe("BB");
    expect(toAlphabeticUpper(78)).toBe("BZ");
    expect(toAlphabeticUpper(677)).toBe("ZA");
    expect(toAlphabeticUpper(702)).toBe("ZZ");
    expect(toAlphabeticUpper(703)).toBe("AAA");
    expect(toAlphabeticUpper(704)).toBe("AAB");
    expect(toAlphabeticUpper(728)).toBe("AAZ");
  });

  test("specific examples", () => {
    expect(toAlphabetic(100)).toBe("cv");
    expect(toAlphabetic(500)).toBe("sf");
    expect(toAlphabetic(1000)).toBe("all");
    expect(toAlphabeticUpper(100)).toBe("CV");
    expect(toAlphabeticUpper(500)).toBe("SF");
    expect(toAlphabeticUpper(1000)).toBe("ALL");
  });

  test("large numbers work correctly", () => {
    expect(toAlphabetic(18278)).toBe("zzz");
    expect(toAlphabetic(18279)).toBe("aaaa");
    expect(toAlphabeticUpper(18279)).toBe("AAAA");
    expect(toAlphabeticUpper(18278)).toBe("ZZZ");
  });
});

describe("mkToNumeric", () => {
  describe("ASCII digits", () => {
    const toAsciiNumeric = mkToNumeric(0x0031);

    test("single digits", () => {
      expect(toAsciiNumeric(0)).toBe("0");
      expect(toAsciiNumeric(1)).toBe("1");
      expect(toAsciiNumeric(5)).toBe("5");
      expect(toAsciiNumeric(9)).toBe("9");
      expect(toNumeric(0)).toBe("0");
      expect(toNumeric(1)).toBe("1");
      expect(toNumeric(5)).toBe("5");
      expect(toNumeric(9)).toBe("9");
    });

    test("multi-digit numbers", () => {
      expect(toAsciiNumeric(10)).toBe("10");
      expect(toAsciiNumeric(42)).toBe("42");
      expect(toAsciiNumeric(123)).toBe("123");
      expect(toAsciiNumeric(1234567890)).toBe("1234567890");
      expect(toNumeric(10)).toBe("10");
      expect(toNumeric(42)).toBe("42");
      expect(toNumeric(123)).toBe("123");
      expect(toNumeric(1234567890)).toBe("1234567890");
    });

    test("with padding", () => {
      expect(toAsciiNumeric(1, 3)).toBe("001");
      expect(toAsciiNumeric(42, 5)).toBe("00042");
      expect(toAsciiNumeric(123, 2)).toBe("123"); // No padding if already longer
      expect(toAsciiNumeric(7, 1)).toBe("7"); // Padding equals length
      expect(toNumeric(1, 3)).toBe("001");
      expect(toNumeric(42, 5)).toBe("00042");
      expect(toNumeric(123, 2)).toBe("123"); // No padding if already longer
      expect(toNumeric(7, 1)).toBe("7"); // Padding equals length
    });

    test("zero with padding", () => {
      expect(toAsciiNumeric(0, 1)).toBe("0");
      expect(toAsciiNumeric(0, 3)).toBe("000");
      expect(toAsciiNumeric(0, 5)).toBe("00000");
      expect(toNumeric(0, 1)).toBe("0");
      expect(toNumeric(0, 3)).toBe("000");
      expect(toNumeric(0, 5)).toBe("00000");
    });
  });

  describe("Mathematical bold digits", () => {
    const toBoldDigits = mkToNumeric(0x1d7cf);

    test("single digits", () => {
      expect(toBoldDigits(0)).toBe("𝟎");
      expect(toBoldDigits(1)).toBe("𝟏");
      expect(toBoldDigits(5)).toBe("𝟓");
      expect(toBoldDigits(9)).toBe("𝟗");
    });

    test("multi-digit numbers", () => {
      expect(toBoldDigits(42)).toBe("𝟒𝟐");
      expect(toBoldDigits(123)).toBe("𝟏𝟐𝟑");
    });
  });

  describe("Edge cases", () => {
    const toAsciiNumeric = mkToNumeric(0x0031);

    test("excessive padding", () => {
      expect(toAsciiNumeric(1, 10)).toBe("0000000001");
      expect(toAsciiNumeric(42, 20)).toBe("00000000000000000042");
      expect(toNumeric(1, 10)).toBe("0000000001");
      expect(toNumeric(42, 20)).toBe("00000000000000000042");
    });

    test("zero padding", () => {
      expect(toAsciiNumeric(123, 0)).toBe("123");
      expect(toAsciiNumeric(42, 0)).toBe("42");
      expect(toNumeric(123, 0)).toBe("123");
      expect(toNumeric(42, 0)).toBe("42");
    });
  });
});
