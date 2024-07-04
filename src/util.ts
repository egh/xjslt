/*
 * Copyright (C) 2021-2024 Erik Hetzner
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

import { fileURLToPath, resolve } from "url";
import { readFileSync } from "fs";
import { DynamicContext } from "./xjslt";
import * as slimdom from "slimdom";

export function urlToDom(context: DynamicContext, url: string) {
  const absoluteURL = context.inputURL
    ? resolve(context.inputURL.toString(), url)
    : url;

  if (absoluteURL.startsWith("file:")) {
    return slimdom.parseXmlDocument(
      readFileSync(fileURLToPath(new URL(absoluteURL))).toString(),
    );
  } else {
    /** How to do async with fontoxpath? */
    // const response = await fetch(absoluteURL);
    // return slimdom.parseXmlDocument(response.body.toString());
    return undefined;
  }
}
