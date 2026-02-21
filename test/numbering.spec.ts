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
  groupNumeric,
  formatNumber,
  formatWithToken,
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
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("zero-padded format '01'", () => {
      const result = parseNumberFormat("01");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "01", separator: "." }],
      });
    });

    test("lowercase alphabetic 'a'", () => {
      const result = parseNumberFormat("a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "a", separator: "." }],
      });
    });

    test("uppercase alphabetic 'A'", () => {
      const result = parseNumberFormat("A");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "A", separator: "." }],
      });
    });

    test("lowercase roman 'i'", () => {
      const result = parseNumberFormat("i");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "i", separator: "." }],
      });
    });

    test("uppercase roman 'I'", () => {
      const result = parseNumberFormat("I");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "I", separator: "." }],
      });
    });
  });

  describe("Formats with prefixes", () => {
    test("format with symbolic prefix '§1'", () => {
      const result = parseNumberFormat("§1");
      expect(result).toEqual({
        prefix: "§",
        suffix: undefined,
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("format with parenthesis prefix '(1'", () => {
      const result = parseNumberFormat("(1");
      expect(result).toEqual({
        prefix: "(",
        suffix: undefined,
        formats: [{ format: "1", separator: "." }],
      });
    });
  });

  describe("Formats with suffixes", () => {
    test("format with period suffix '1.'", () => {
      const result = parseNumberFormat("1.");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ".",
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("format with parenthesis suffix '1)'", () => {
      const result = parseNumberFormat("1)");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ")",
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("format with colon suffix 'A:'", () => {
      const result = parseNumberFormat("A:");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ":",
        formats: [{ format: "A", separator: "." }],
      });
    });
  });

  describe("Formats with both prefix and suffix", () => {
    test("format with parentheses '(1)'", () => {
      const result = parseNumberFormat("(1)");
      expect(result).toEqual({
        prefix: "(",
        suffix: ")",
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("format with punctuation '- 1 -'", () => {
      const result = parseNumberFormat("- 1 -");
      expect(result).toEqual({
        prefix: "- ",
        suffix: " -",
        formats: [{ format: "1", separator: "." }],
      });
    });
  });

  describe("Multi-level hierarchical formats", () => {
    test("two-level format '1.1'", () => {
      const result = parseNumberFormat("1.1");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "1", separator: "." },
        ],
      });
    });

    test("mixed format '1.a'", () => {
      const result = parseNumberFormat("1.a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "a", separator: "." },
        ],
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
          { format: "1", separator: "." },
        ],
      });
    });

    test("complex mixed format 'A:1,a'", () => {
      const result = parseNumberFormat("A:1,a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "A", separator: "." },
          { format: "1", separator: ":" },
          { format: "a", separator: "," },
        ],
      });
    });

    test("format with different separators '1-a,i'", () => {
      const result = parseNumberFormat("1-a,i");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "a", separator: "-" },
          { format: "i", separator: "," },
        ],
      });
    });
  });

  describe("Complex formats with prefix and suffix", () => {
    test("hierarchical with prefix '§ 1:1'", () => {
      const result = parseNumberFormat("§ 1:1");
      expect(result).toEqual({
        prefix: "§ ",
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "1", separator: ":" },
        ],
      });
    });

    test("hierarchical with suffix '1,1.'", () => {
      const result = parseNumberFormat("1,1.");
      expect(result).toEqual({
        prefix: undefined,
        suffix: ".",
        formats: [
          { format: "1", separator: "." },
          { format: "1", separator: "," },
        ],
      });
    });

    test("hierarchical with both '(1:a~i)'", () => {
      const result = parseNumberFormat("(1:a~i)");
      expect(result).toEqual({
        prefix: "(",
        suffix: ")",
        formats: [
          { format: "1", separator: "." },
          { format: "a", separator: ":" },
          { format: "i", separator: "~" },
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
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("only non-alphanumeric characters", () => {
      const result = parseNumberFormat("...");
      expect(result).toEqual({
        prefix: "...",
        suffix: "...",
        formats: [{ format: "1", separator: "." }],
      });
    });

    test("format with multi-character separator '1---a'", () => {
      const result = parseNumberFormat("1---a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "a", separator: "---" },
        ],
      });
    });

    test("format with whitespace separator '1   a'", () => {
      const result = parseNumberFormat("1   a");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [
          { format: "1", separator: "." },
          { format: "a", separator: "   " },
        ],
      });
    });

    test("Unicode decimal digits", () => {
      const result = parseNumberFormat("١");
      expect(result).toEqual({
        prefix: undefined,
        suffix: undefined,
        formats: [{ format: "١", separator: "." }],
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
    test("single digits", () => {
      expect(toNumeric(0)).toBe("0");
      expect(toNumeric(1)).toBe("1");
      expect(toNumeric(5)).toBe("5");
      expect(toNumeric(9)).toBe("9");
    });

    test("multi-digit numbers", () => {
      expect(toNumeric(10)).toBe("10");
      expect(toNumeric(42)).toBe("42");
      expect(toNumeric(123)).toBe("123");
      expect(toNumeric(1234567890)).toBe("1234567890");
    });

    test("with padding", () => {
      expect(toNumeric(1, 3)).toBe("001");
      expect(toNumeric(42, 5)).toBe("00042");
      expect(toNumeric(123, 2)).toBe("123"); // No padding if already longer
      expect(toNumeric(7, 1)).toBe("7"); // Padding equals length
    });

    test("zero with padding", () => {
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

  describe("Grouping separators", () => {
    test("grouping with different separator", () => {
      expect(groupNumeric(toNumeric(1000, 0), " ", 3)).toBe("1 000");
      expect(groupNumeric(toNumeric(1234567, 0), ".", 3)).toBe("1.234.567");
      expect(groupNumeric(toNumeric(12345, 0), "_", 3)).toBe("12_345");
    });

    test("different grouping sizes", () => {
      expect(groupNumeric(toNumeric(12345, 0), ",", 2)).toBe("1,23,45");
      expect(groupNumeric(toNumeric(123456, 0), ",", 4)).toBe("12,3456");
      expect(groupNumeric(toNumeric(1234567890, 0), ",", 5)).toBe(
        "12345,67890",
      ); // Right-to-left grouping
    });

    test("no grouping when length doesn't exceed grouping size", () => {
      expect(groupNumeric(toNumeric(123, 0), ",", 3)).toBe("123");
      expect(groupNumeric(toNumeric(99, 0), ",", 3)).toBe("99");
      expect(groupNumeric(toNumeric(1, 0), ",", 3)).toBe("1");
    });

    test("grouping with padding", () => {
      expect(groupNumeric(toNumeric(42, 6), ",", 3)).toBe("000,042");
      expect(groupNumeric(toNumeric(1, 5), ",", 3)).toBe("00,001");
    });

    test("zero with grouping", () => {
      expect(groupNumeric(toNumeric(0, 0), ",", 3)).toBe("0");
    });

    test("Unicode digit grouping with Arabic-Indic digits", () => {
      const toArabicIndic = mkToNumeric(0x0661); // Arabic-Indic digits
      expect(groupNumeric(toArabicIndic(1234, 0), "٬", 3)).toBe("١٬٢٣٤");
      expect(groupNumeric(toArabicIndic(1234567, 0), "٬", 3)).toBe("١٬٢٣٤٬٥٦٧");
    });

    test("Unicode digit grouping with Devanagari digits", () => {
      const toDevanagari = mkToNumeric(0x0967); // Devanagari digits
      expect(groupNumeric(toDevanagari(1234, 0), ",", 3)).toBe("१,२३४");
      expect(groupNumeric(toDevanagari(123456, 0), ",", 3)).toBe("१२३,४५६");
    });

    test("Unicode digit grouping with Thai digits", () => {
      const toThai = mkToNumeric(0x0e51); // Thai digits
      expect(groupNumeric(toThai(1234, 0), ",", 3)).toBe("๑,๒๓๔");
      expect(groupNumeric(toThai(12345678, 0), " ", 3)).toBe("๑๒ ๓๔๕ ๖๗๘");
    });
  });

  describe("Edge cases", () => {
    test("excessive padding", () => {
      expect(toNumeric(1, 10)).toBe("0000000001");
      expect(toNumeric(42, 20)).toBe("00000000000000000042");
    });

    test("zero padding", () => {
      expect(toNumeric(123, 0)).toBe("123");
      expect(toNumeric(42, 0)).toBe("42");
    });
  });
});

describe("formatWithToken", () => {
  describe("ASCII decimal formats", () => {
    test("single digit token '1'", () => {
      expect(formatWithToken(5, "1")).toBe("5");
      expect(formatWithToken(42, "1")).toBe("42");
      expect(formatWithToken(123, "1")).toBe("123");
    });

    test("zero-padded tokens", () => {
      expect(formatWithToken(5, "01")).toBe("05");
      expect(formatWithToken(5, "001")).toBe("005");
      expect(formatWithToken(42, "0001")).toBe("0042");
      expect(formatWithToken(1234, "01")).toBe("1234"); // No truncation
    });

    test("decimal with grouping separator", () => {
      expect(formatWithToken(1234, "1", ",", 3)).toBe("1,234");
      expect(formatWithToken(1234567, "1", ",", 3)).toBe("1,234,567");
      expect(formatWithToken(12345, "01", " ", 3)).toBe("12 345");
    });
  });

  describe("Alphabetic formats", () => {
    test("lowercase alphabetic 'a'", () => {
      expect(formatWithToken(1, "a")).toBe("a");
      expect(formatWithToken(26, "a")).toBe("z");
      expect(formatWithToken(27, "a")).toBe("aa");
    });

    test("uppercase alphabetic 'A'", () => {
      expect(formatWithToken(1, "A")).toBe("A");
      expect(formatWithToken(26, "A")).toBe("Z");
      expect(formatWithToken(27, "A")).toBe("AA");
    });
  });

  describe("Roman numeral formats", () => {
    test("lowercase roman 'i'", () => {
      expect(formatWithToken(1, "i")).toBe("i");
      expect(formatWithToken(9, "i")).toBe("ix");
      expect(formatWithToken(42, "i")).toBe("xlii");
      expect(formatWithToken(1999, "i")).toBe("mcmxcix");
    });

    test("uppercase roman 'I'", () => {
      expect(formatWithToken(1, "I")).toBe("I");
      expect(formatWithToken(9, "I")).toBe("IX");
      expect(formatWithToken(42, "I")).toBe("XLII");
      expect(formatWithToken(1999, "I")).toBe("MCMXCIX");
    });
  });

  describe("Unicode digit formats", () => {
    test("Arabic-Indic digits '١'", () => {
      expect(formatWithToken(5, "١")).toBe("٥");
      expect(formatWithToken(42, "١")).toBe("٤٢");
      expect(formatWithToken(123, "٠١")).toBe("١٢٣");
    });

    test("Devanagari digits '१'", () => {
      expect(formatWithToken(5, "१")).toBe("५");
      expect(formatWithToken(42, "१")).toBe("४२");
      expect(formatWithToken(123, "०१")).toBe("१२३");
    });

    test("Thai digits '๑'", () => {
      expect(formatWithToken(5, "๑")).toBe("๕");
      expect(formatWithToken(42, "๑")).toBe("๔๒");
      expect(formatWithToken(123, "๐๑")).toBe("๑๒๓");
    });

    test("Unicode digits with grouping", () => {
      expect(formatWithToken(1234, "١", "٬", 3)).toBe("١٬٢٣٤");
      expect(formatWithToken(1234567, "१", ",", 3)).toBe("१,२३४,५६७");
    });

    test("Unicode digits with padding", () => {
      expect(formatWithToken(5, "٠١")).toBe("٠٥");
      expect(formatWithToken(5, "०००१")).toBe("०००५");
    });
  });

  describe("Edge cases", () => {
    test("zero value", () => {
      expect(formatWithToken(0, "1")).toBe("0");
      expect(formatWithToken(0, "01")).toBe("00");
      expect(formatWithToken(0, "a")).toBe("");
      expect(formatWithToken(0, "A")).toBe("");
      expect(formatWithToken(0, "i")).toBe("");
    });

    test("NaN returns empty string", () => {
      expect(formatWithToken(NaN, "1")).toBe("");
      expect(formatWithToken(NaN, "a")).toBe("");
    });

    test("Infinity returns empty string", () => {
      expect(formatWithToken(Infinity, "1")).toBe("");
      expect(formatWithToken(-Infinity, "1")).toBe("");
    });
  });
});

describe("formatNumber", () => {
  describe("Single number formatting", () => {
    test("simple decimal format", () => {
      expect(formatNumber([5], parseNumberFormat("1"))).toBe("5");
      expect(formatNumber([42], parseNumberFormat("1"))).toBe("42");
      expect(formatNumber([123], parseNumberFormat("1"))).toBe("123");
    });

    test("zero-padded format", () => {
      expect(formatNumber([5], parseNumberFormat("01"))).toBe("05");
      expect(formatNumber([5], parseNumberFormat("001"))).toBe("005");
      expect(formatNumber([42], parseNumberFormat("0001"))).toBe("0042");
    });

    test("alphabetic format", () => {
      expect(formatNumber([1], parseNumberFormat("a"))).toBe("a");
      expect(formatNumber([26], parseNumberFormat("a"))).toBe("z");
      expect(formatNumber([27], parseNumberFormat("a"))).toBe("aa");
      expect(formatNumber([1], parseNumberFormat("A"))).toBe("A");
      expect(formatNumber([26], parseNumberFormat("A"))).toBe("Z");
    });

    test("roman numeral format", () => {
      expect(formatNumber([1], parseNumberFormat("i"))).toBe("i");
      expect(formatNumber([9], parseNumberFormat("i"))).toBe("ix");
      expect(formatNumber([42], parseNumberFormat("i"))).toBe("xlii");
      expect(formatNumber([1], parseNumberFormat("I"))).toBe("I");
      expect(formatNumber([42], parseNumberFormat("I"))).toBe("XLII");
    });
  });

  describe("Formatting with prefix and suffix", () => {
    test("with prefix only", () => {
      expect(formatNumber([5], parseNumberFormat("§1"))).toBe("§5");
      expect(formatNumber([42], parseNumberFormat("(1"))).toBe("(42");
    });

    test("with suffix only", () => {
      expect(formatNumber([5], parseNumberFormat("1."))).toBe("5.");
      expect(formatNumber([42], parseNumberFormat("1)"))).toBe("42)");
    });

    test("with both prefix and suffix", () => {
      expect(formatNumber([5], parseNumberFormat("(1)"))).toBe("(5)");
      expect(formatNumber([42], parseNumberFormat("- 1 -"))).toBe("- 42 -");
    });
  });

  describe("Multiple number formatting (hierarchical)", () => {
    test("two-level format '1.1'", () => {
      expect(formatNumber([1, 2], parseNumberFormat("1.1"))).toBe("1.2");
      expect(formatNumber([3, 5], parseNumberFormat("1.1"))).toBe("3.5");
    });

    test("three-level format '1.1.1'", () => {
      expect(formatNumber([1, 2, 3], parseNumberFormat("1.1.1"))).toBe("1.2.3");
      expect(formatNumber([10, 20, 30], parseNumberFormat("1.1.1"))).toBe(
        "10.20.30",
      );
    });

    test("mixed format types '1.a.i'", () => {
      expect(formatNumber([1, 2, 3], parseNumberFormat("1.a.i"))).toBe(
        "1.b.iii",
      );
    });

    test("different separators '1-a.i'", () => {
      expect(formatNumber([1, 2, 3], parseNumberFormat("1-a.i"))).toBe(
        "1-b.iii",
      );
    });
  });

  describe("More numbers than format tokens", () => {
    test("reuse last format token for additional numbers", () => {
      // default separator
      expect(formatNumber([1, 2, 3], parseNumberFormat("1"))).toBe("1.2.3");

      // Format has only 2 tokens, but we provide 3 numbers
      expect(formatNumber([1, 2, 3], parseNumberFormat("1:1"))).toBe("1:2:3");

      // Format has only 2 tokens, but we provide 4 numbers
      expect(formatNumber([1, 2, 3, 4], parseNumberFormat("1.1"))).toBe(
        "1.2.3.4",
      );
    });

    test("reuse with different format types", () => {
      expect(formatNumber([1, 2, 3, 4], parseNumberFormat("A-1"))).toBe(
        "A-2-3-4",
      );
    });
  });

  describe("Hierarchical formats with prefix and suffix", () => {
    test("hierarchical with prefix", () => {
      expect(formatNumber([1, 2], parseNumberFormat("§ 1.1"))).toBe("§ 1.2");
    });

    test("hierarchical with suffix", () => {
      expect(formatNumber([1, 2], parseNumberFormat("1.1."))).toBe("1.2.");
    });

    test("hierarchical with both prefix and suffix", () => {
      expect(formatNumber([1, 2, 3], parseNumberFormat("(1.a.i)"))).toBe(
        "(1.b.iii)",
      );
    });
  });

  describe("Grouping separators", () => {
    test("decimal with grouping separator", () => {
      expect(formatNumber([1234], parseNumberFormat("1"), ",", 3)).toBe(
        "1,234",
      );
      expect(formatNumber([1234567], parseNumberFormat("1"), ",", 3)).toBe(
        "1,234,567",
      );
    });

    test("hierarchical with grouping separator", () => {
      expect(formatNumber([1234, 5678], parseNumberFormat("1.1"), ",", 3)).toBe(
        "1,234.5,678",
      );
    });

    test("different grouping separator", () => {
      expect(formatNumber([1234567], parseNumberFormat("1"), " ", 3)).toBe(
        "1 234 567",
      );
    });
  });

  describe("Edge cases", () => {
    test("empty numbers array", () => {
      expect(formatNumber([], parseNumberFormat("1"))).toBe("");
    });

    test("zero-padded hierarchical format", () => {
      expect(formatNumber([1, 2], parseNumberFormat("01.01"))).toBe("01.02");
    });

    test("single number with multi-level format", () => {
      expect(formatNumber([1], parseNumberFormat("1.1.1"))).toBe("1");
    });

    test("uses default format when empty string provided", () => {
      expect(formatNumber([1], parseNumberFormat(""))).toBe("1");
    });
  });
});
