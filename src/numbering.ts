import { DecimalFormat, NumberFormat, ParsedSubpicture } from "./definitions";
import { evaluateXPathToNumber } from "fontoxpath";
import { wrapValue } from "./xjslt";

const UNICODE_DIGIT_STARTS = [
  0x0031, // ASCII digits (1-9)
  0x0661, // Arabic-Indic digits (١-٩)
  0x06f1, // Extended Arabic-Indic digits (۱-۹)
  0x0967, // Devanagari digits (१-९)
  0x09e7, // Bengali digits (১-৯)
  0x0a67, // Gurmukhi digits (੧-੯)
  0x0ae7, // Gujarati digits (૧-૯)
  0x0b67, // Oriya digits (୧-୯)
  0x0be7, // Tamil digits (௧-௯)
  0x0c67, // Telugu digits (౧-౯)
  0x0ce7, // Kannada digits (೧-೯)
  0x0d67, // Malayalam digits (൧-൯)
  0x0de7, // Sinhala Lith digits (෧-෯)
  0x0e51, // Thai digits (๑-๙)
  0x0ed1, // Lao digits (໑-໙)
  0x0f21, // Tibetan digits (༡-༩)
  0x1041, // Myanmar digits (၁-၉)
  0x1091, // Myanmar Shan digits (႑-႙)
  0x17e1, // Khmer digits (១-៩)
  0x1811, // Mongolian digits (᠑-᠙)
  0x1947, // Limbu digits (᥇-᥏)
  0x19d1, // New Tai Lue digits (᧑-᧙)
  0x1a81, // Tai Tham Hora digits (᪁-᪉)
  0x1a91, // Tai Tham Tham digits (᪑-᪙)
  0x1b51, // Balinese digits (᭑-᭙)
  0x1bb1, // Sundanese digits (᮱-᮹)
  0x1c41, // Lepcha digits (᱁-᱉)
  0x1c51, // Ol Chiki digits (᱑-᱙)
  0xa621, // Vai digits (꘡-꘩)
  0xa8d1, // Saurashtra digits (꣑-꣙)
  0xa901, // Kayah Li digits (꤁-꤉)
  0xa9d1, // Javanese digits (꧑-꧙)
  0xa9f1, // Myanmar Tai Laing digits (꧱-꧹)
  0xaa51, // Cham digits (꩑-꩙)
  0xabf1, // Meetei Mayek digits (꯱-꯹)
  0xff11, // Fullwidth digits (１-９)
  0x104a1, // Osmanya digits (𐒡-𐒩)
  0x10d31, // Hanifi Rohingya digits (𐴱-𐴹)
  0x11067, // Brahmi digits (𑁧-𑁯)
  0x110f1, // Sora Sompeng digits (𑃱-𑃹)
  0x11137, // Chakma digits (𑄷-𑄿)
  0x111d1, // Sharada digits (𑇑-𑇙)
  0x112f1, // Khudawadi digits (𑋱-𑋹)
  0x11451, // Newa digits (𑑑-𑑙)
  0x114d1, // Tirhuta digits (𑓑-𑓙)
  0x11651, // Modi digits (𑙑-𑙙)
  0x116c1, // Takri digits (𑛁-𑛉)
  0x11731, // Ahom digits (𑜱-𑜹)
  0x118e1, // Warang Citi digits (𑣡-𑣩)
  0x11c51, // Bhaiksuki digits (𑱑-𑱙)
  0x11d51, // Masaram Gondi digits (𑵑-𑵙)
  0x11da1, // Gunjala Gondi digits (𑶡-𑶩)
  0x16a61, // Mro digits (𖩡-𖩩)
  0x16b51, // Pahawh Hmong digits (𖭑-𖭙)
  0x1d7cf, // Mathematical bold digits (𝟏-𝟗)
  0x1d7d9, // Mathematical double-struck digits (𝟙-𝟡)
  0x1d7e3, // Mathematical sans-serif digits (𝟣-𝟫)
  0x1d7ed, // Mathematical sans-serif bold digits (𝟭-𝟵)
  0x1d7f7, // Mathematical monospace digits (𝟷-𝟿)
  0x1e951, // Adlam digits (𞥑-𞥙)
];

export function groupNumeric(
  n: string,
  groupingSeparator?: string,
  groupingSize?: number,
): string {
  if (!groupingSeparator || !groupingSize || n.length <= groupingSize) {
    return n;
  }

  const parts: string[] = [];
  let remaining = n;
  while (remaining.length > groupingSize) {
    parts.unshift(remaining.slice(-groupingSize));
    remaining = remaining.slice(0, -groupingSize);
  }
  if (remaining) {
    parts.unshift(remaining);
  }
  return parts.join(groupingSeparator);
}

export function toNumeric(n: number, padding?: number): string {
  return n.toString().padStart(padding, "0");
}

/**
 * Generate a function to convert a number to alphabetic format (a, b, c, ..., z, aa, ...)
 */
export function mkToAlphabetic(
  startChar: number,
  endChar: number,
): (value: number) => string | undefined {
  const radix = endChar - startChar + 1;
  const strings = [...Array(radix)].map((_, i) =>
    String.fromCodePoint(startChar + i),
  );
  return function (value: number) {
    if (value === 0) {
      return "0";
    }
    let result = "";
    let n = value;

    while (n > 0) {
      n--; // if n is 1, that's equal to startChar
      result = strings[n % radix] + result;
      n = Math.floor(n / radix);
    }

    return result;
  };
}

export const toAlphabetic = mkToAlphabetic(97, 122);
export const toAlphabeticUpper = mkToAlphabetic(65, 90);

/**
 * Convert a number to Roman numerals.
 */
export function toRoman(input: number): string {
  const romanNumerals = new Map<number, string>([
    [1000, "m"],
    [900, "cm"],
    [500, "d"],
    [400, "cd"],
    [100, "c"],
    [90, "xc"],
    [50, "l"],
    [40, "xl"],
    [10, "x"],
    [9, "ix"],
    [5, "v"],
    [4, "iv"],
    [1, "i"],
  ]);

  if (input === 0) {
    return "0";
  }

  let retval = "";
  let remaining = input;

  for (const [value, symbol] of romanNumerals) {
    while (remaining >= value) {
      retval += symbol;
      remaining -= value;
    }
  }

  return retval;
}

/**
 * Format a number with a specific format token.
 * Based on XSLT 2.0 number formatting rules.
 */
export function formatWithToken(
  value: number,
  token: string,
  groupingSeparator?: string,
  groupingSize?: number,
): string {
  if (isNaN(value) || !isFinite(value)) {
    return "";
  }

  // Check for ASCII decimal format
  if (/0*1/.test(token)) {
    return groupNumeric(
      toNumeric(value, token.length),
      groupingSeparator,
      groupingSize,
    );
  }

  // Uppercase alphabetic (A, B, C, ..., Z, AA, AB, ...)
  if (token === "A") {
    return toAlphabeticUpper(value) || "";
  }

  // Lowercase alphabetic (a, b, c, ..., z, aa, ab, ...)
  if (token === "a") {
    return toAlphabetic(value) || "";
  }

  // Uppercase Roman numerals
  if (token === "I") {
    return toRoman(value).toUpperCase();
  }

  // Lowercase Roman numerals
  if (token === "i") {
    return toRoman(value);
  }

  // Check for Unicode digit formats (excluding ASCII which is handled above)
  for (const digitOne of UNICODE_DIGIT_STARTS) {
    if (digitOne === 0x0031) continue; // Skip ASCII, already handled
    const digitZero = digitOne - 1;
    const re = new RegExp(
      `${String.fromCharCode(digitZero)}*${String.fromCharCode(digitOne)}`,
    );
    if (re.test(token)) {
      return groupNumeric(
        remapDigits(toNumeric(value, token.length), digitZero),
        groupingSeparator,
        groupingSize,
      );
    }
  }

  // Huh?
  return groupNumeric(
    toNumeric(value, token.length),
    groupingSeparator,
    groupingSize,
  );
}

/**
 * Format an array of numbers according to a NumberFormat
 * specification. Implements XSLT 2.0 number formatting rules from
 * https://www.w3.org/TR/xslt20/#convert
 */
export function formatNumber(
  numbers: number[],
  format: NumberFormat,
  groupingSeparator?: string,
  groupingSize?: number,
): string {
  const parts: string[] = [];

  if (format.prefix) {
    parts.push(format.prefix);
  }

  // Format each number
  for (let i = 0; i < numbers.length; i++) {
    // If we have more numbers than format tokens, use the last format token
    const tokenIndex = Math.min(i, format.formats.length - 1);
    const formatToken = format.formats[tokenIndex];

    if (!formatToken) {
      // Shouldn't happen.
      throw new Error("No number format found");
    }
    if (formatToken.separator && i !== 0) {
      parts.push(formatToken.separator);
    }
    parts.push(
      formatWithToken(
        numbers[i],
        formatToken.format,
        groupingSeparator,
        groupingSize,
      ),
    );
  }

  if (format.suffix) {
    parts.push(format.suffix);
  }

  return parts.join("");
}

/* Code for xsl:decimal-format and fn:format-number() */

function parseSubpicture(sub: string, fmt: DecimalFormat): ParsedSubpicture {
  const zero = fmt.zeroDigit;
  const hash = fmt.digit;
  const dec = fmt.decimalSeparator;
  const grp = fmt.groupingSeparator;

  let i = 0;
  let isPercent = false;
  let isPerMille = false;

  function checkPerRules() {
    if (isPercent || isPerMille) {
      throw new Error("XTDE1310: Multiple percent/per-mille characters.");
    }
  }

  function slurpPassive() {
    let slurped = "";
    while (
      i < sub.length &&
      sub[i] !== zero &&
      sub[i] !== hash &&
      sub[i] !== dec
    ) {
      if (sub[i] === fmt.percent) {
        checkPerRules();
        isPercent = true;
      }
      if (sub[i] === fmt.perMille) {
        checkPerRules();
        isPerMille = true;
      }
      slurped += sub[i++];
    }
    return slurped;
  }
  const prefix = slurpPassive();

  let intMinDigits = 0;
  let intDigitCount = 0;
  let lastGroupPos = -1;
  let groupingSize: number | undefined;

  while (i < sub.length && sub[i] !== dec) {
    const c = sub[i];
    if (c === zero) {
      intMinDigits++;
      intDigitCount++;
    } else if (c === hash) {
      intDigitCount++;
    } else if (c === grp) {
      lastGroupPos = intDigitCount;
    } else {
      break;
    }
    i++;
  }

  if (lastGroupPos >= 0) {
    groupingSize = intDigitCount - lastGroupPos;
  }

  let decMinDigits = 0;
  let decMaxDigits = 0;

  if (i < sub.length && sub[i] === dec) {
    i++;
    while (i < sub.length) {
      const c = sub[i];
      if (c === zero) {
        decMinDigits++;
        decMaxDigits++;
      } else if (c === hash) {
        decMaxDigits++;
      } else {
        break;
      }
      i++;
    }
  }

  const suffix = slurpPassive();
  if (i < sub.length) {
    throw new Error(`XTDE1310: Active characters after picture string suffix: ${sub.slice(i)}`);
  }

  return {
    prefix,
    suffix,
    integerMinDigits: Math.max(intMinDigits, 1),
    integerGroupSize: groupingSize,
    decimalMinDigits: decMinDigits,
    decimalMaxDigits: decMaxDigits,
    isPercent,
    isPerMille,
  };
}

/* Remap standard arabic numerals to another set of decimals. */
export function remapDigits(str: string, zeroCode: number): string {
  return [...str]
    .map((c) => {
      const code = c.codePointAt(0)!;
      if (code >= 48 && code <= 57) {
        return String.fromCodePoint(zeroCode + code - 48);
      }
      return c;
    })
    .join("");
}

function applySubpicture(
  value: number,
  sub: ParsedSubpicture,
  fmt: DecimalFormat,
): string {
  if (sub.isPercent) value = value * 100;
  else if (sub.isPerMille) value = value * 1000;

  const rounded = evaluateXPathToNumber(
    "round-half-to-even($number, $precision)",
    undefined,
    undefined,
    {
      number: wrapValue(value, "xs:double"),
      precision: wrapValue(sub.decimalMaxDigits, "xs:integer"),
    },
  );

  const wholePart = Math.trunc(rounded);
  let intStr = groupNumeric(
    toNumeric(wholePart, sub.integerMinDigits),
    fmt.groupingSeparator,
    sub.integerGroupSize,
  );

  // Format decimal part.
  let decStr = rounded.toString().split(".")[1] ?? ""; // is there a better way?
  while (decStr.length < sub.decimalMinDigits) {
    decStr += "0";
  }
  const decimalSeparator = decStr.length > 0 ? fmt.decimalSeparator : "";

  const zeroCode = fmt.zeroDigit.codePointAt(0)!;
  if (zeroCode !== 48) {
    intStr = remapDigits(intStr, zeroCode);
    decStr = remapDigits(decStr, zeroCode);
  }

  return `${sub.prefix}${intStr}${decimalSeparator}${decStr}${sub.suffix}`;
}

export function formatNumberWithPicture(
  value: number,
  picture: string,
  fmt: DecimalFormat,
): string {
  if (isNaN(value)) return fmt.nan;
  if (!isFinite(value)) {
    return (value < 0 ? fmt.minusSign : "") + fmt.infinity;
  }

  const pictureStringParts = picture.split(fmt.patternSeparator);
  let subPicture: ParsedSubpicture | undefined = undefined;

  if (value < 0) {
    if (pictureStringParts.length > 1) {
      // Use the negative subpicture.
      subPicture = parseSubpicture(pictureStringParts[1], fmt);
    } else {
      // Use a modified positive subpicture.
      const positiveSub = parseSubpicture(pictureStringParts[0], fmt);
      subPicture = {
        ...positiveSub,
        prefix: `${fmt.minusSign}${positiveSub.prefix || ""}`,
      };
    }
  } else {
    subPicture = parseSubpicture(pictureStringParts[0], fmt);
  }
  return applySubpicture(Math.abs(value), subPicture, fmt);
}
