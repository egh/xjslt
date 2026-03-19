<!-- Copyright (C) 2021-2024 Erik Hetzner -->

<!-- This file is part of XJSLT. -->

<!-- XJSLT is free software: you can redistribute it and/or modify it -->
<!-- under the terms of the GNU Lesser General Public License as -->
<!-- published by the Free Software Foundation, either version 3 of the -->
<!-- License, or (at your option) any later version. -->

<!-- XJSLT is distributed in the hope that it will be useful, but -->
<!-- WITHOUT ANY WARRANTY; without even the implied warranty of -->
<!-- MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU -->
<!-- Lesser General Public License for more details. -->

<!-- You should have received a copy of the GNU Lesser General Public -->
<!-- License along with XJSLT. If not, see -->
<!-- <https://www.gnu.org/licenses/>. -->

<xsl:stylesheet
    version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  
  <xsl:template match="/ | @* | node()">
     <xsl:copy>
       <xsl:apply-templates select="@* | node()" />
     </xsl:copy>
   </xsl:template>
   
   <xsl:template match="xsl:variable | xsl:with-param">
     <xsl:if test="@select and (node() or text()) ">
       <xsl:message terminate="yes">XTSE0620: Variable or parameter <xsl:value-of select="@name"/> has both @select and children.</xsl:message>
     </xsl:if>
     <xsl:next-match/>
   </xsl:template>

   <xsl:template match="xsl:template">
     <xsl:if test="not(@match) and (@mode or @priority)">
       <xsl:message terminate="yes">XTSE0500: An xsl:template element that has no match attribute must have no mode attribute and no priority attribute.</xsl:message>
     </xsl:if>
     <xsl:if test="not(@match) and not(@name)">
       <xsl:message terminate="yes">XTSE0500: An xsl:template element must have either a match attribute or a name attribute, or both.</xsl:message>
     </xsl:if>
     <xsl:if test="@priority and not(number(@priority) = number(@priority))">
       <xsl:message terminate="yes">XTSE0505: The @priority attribute of xsl:template must be a number.</xsl:message>
     </xsl:if>
     <xsl:next-match/>
   </xsl:template>

   <xsl:template match="xsl:template/xsl:template">
     <xsl:message terminate="yes">XTSE0010: xsl:template only allowed at the top level.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:template/xsl:param">
     <xsl:if test="preceding-sibling::*[not(self::xsl:param)]">
       <xsl:message terminate="yes">XTSE0010: xsl:params must not be preceded by other elements</xsl:message>
     </xsl:if>
     <xsl:next-match/>
   </xsl:template>

   <xsl:template match="xsl:for-each//xsl:apply-imports | xsl:for-each-group//xsl:apply-imports">
     <xsl:message terminate="yes">XTSE0010: xsl:apply-imports may not appear inside xsl:for-each or xsl:for-each-group.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:call-template[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:call-template requires a @name attribute.</xsl:message>
   </xsl:template>

   <!-- xsl:if requires @test -->
   <xsl:template match="xsl:if[not(@test)]">
     <xsl:message terminate="yes">XTSE0010: xsl:if requires a @test attribute.</xsl:message>
   </xsl:template>

   <!-- xsl:for-each requires @select -->
   <xsl:template match="xsl:for-each[not(@select)]">
     <xsl:message terminate="yes">XTSE0010: xsl:for-each requires a @select attribute.</xsl:message>
   </xsl:template>

   <!-- xsl:choose constraints -->
   <xsl:template match="xsl:choose[not(xsl:when)]">
     <xsl:message terminate="yes">XTSE0010: xsl:choose must contain at least one xsl:when child element.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:choose/xsl:otherwise[following-sibling::*]">
     <xsl:message terminate="yes">XTSE0010: xsl:otherwise must be the last child of xsl:choose.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:when[not(parent::xsl:choose)]">
     <xsl:message terminate="yes">XTSE0010: xsl:when may only appear as a child of xsl:choose.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:otherwise[not(parent::xsl:choose)]">
     <xsl:message terminate="yes">XTSE0010: xsl:otherwise may only appear as a child of xsl:choose.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:when[not(@test)]">
     <xsl:message terminate="yes">XTSE0010: xsl:when requires a @test attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:element[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:element requires a @name attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:attribute[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:attribute requires a @name attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:namespace[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:namespace requires a @name attribute.</xsl:message>
   </xsl:template>

   <!-- xsl:processing-instruction requires @name -->
   <xsl:template match="xsl:processing-instruction[not(@name)]">
     <xsl:message terminate="yes">XTSE0910: xsl:processing-instruction requires a @name attribute.</xsl:message>
   </xsl:template>

   <!-- xsl:copy-of requires @select -->
   <xsl:template match="xsl:copy-of[not(@select)]">
     <xsl:message terminate="yes">XTSE0010: xsl:copy-of requires a @select attribute.</xsl:message>
   </xsl:template>

   <!-- xsl:number @level must be "single", "multiple", or "any" (XTSE1120) -->
   <xsl:template match="xsl:number[@level and not(@level = ('single', 'multiple', 'any'))]">
     <xsl:message terminate="yes">XTSE1120: The @level attribute of xsl:number must be "single", "multiple", or "any".</xsl:message>
   </xsl:template>

   <!-- xsl:for-each-group constraints (XTSE1290, XTSE1295) -->
   <xsl:template match="xsl:for-each-group">
     <xsl:if test="not(@select)">
       <xsl:message terminate="yes">XTSE1290: xsl:for-each-group requires a @select attribute.</xsl:message>
     </xsl:if>
     <xsl:if test="not(@group-by) and not(@group-adjacent) and not(@group-starting-with) and not(@group-ending-with)">
       <xsl:message terminate="yes">XTSE1295: xsl:for-each-group must have one of @group-by, @group-adjacent, @group-starting-with, or @group-ending-with.</xsl:message>
     </xsl:if>
     <xsl:next-match/>
   </xsl:template>

   <xsl:template match="xsl:function[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:function requires a @name attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:sort[not(parent::xsl:apply-templates or parent::xsl:for-each or parent::xsl:for-each-group or parent::xsl:perform-sort)]">
     <xsl:message terminate="yes">XTSE0010: xsl:sort is not allowed in this context.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:for-each/xsl:sort[preceding-sibling::*[not(self::xsl:sort)]]">
     <xsl:message terminate="yes">XTSE0010: xsl:sort must precede all other children of xsl:for-each.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:stylesheet[not(@version)] | xsl:transform[not(@version)]">
     <xsl:message terminate="yes">XTSE0010: xsl:stylesheet/xsl:transform requires a @version attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:variable[not(@name)] | xsl:with-param[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:variable/xsl:with-param requires a @name attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:param[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:param requires a @name attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:param[not(parent::xsl:stylesheet or parent::xsl:transform or parent::xsl:template or parent::xsl:function)]">
     <xsl:message terminate="yes">XTSE0010: xsl:param is not allowed in this context.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:key[not(@match)]">
     <xsl:message terminate="yes">XTSE0010: xsl:key requires a @match attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:attribute-set[not(@name)]">
     <xsl:message terminate="yes">XTSE0010: xsl:attribute-set requires a @name attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:attribute-set/*[not(self::xsl:attribute)]">
     <xsl:message terminate="yes">XTSE0010: xsl:attribute-set may only contain xsl:attribute elements.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:attribute-set[text()[normalize-space(.)]]">
     <xsl:message terminate="yes">XTSE0010: xsl:attribute-set may not contain text content.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:strip-space[not(@elements)] | xsl:preserve-space[not(@elements)]">
     <xsl:message terminate="yes">XTSE0010: xsl:strip-space/xsl:preserve-space requires an @elements attribute.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:call-template/xsl:*[not(self::xsl:with-param)]">
     <xsl:message terminate="yes">XTSE0010: xsl:call-template may only contain xsl:with-param children.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:apply-templates/xsl:*[not(self::xsl:sort) and not(self::xsl:with-param)]">
     <xsl:message terminate="yes">XTSE0010: xsl:apply-templates may only contain xsl:sort and xsl:with-param children.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:apply-imports/xsl:*[not(self::xsl:with-param)]">
     <xsl:message terminate="yes">XTSE0010: xsl:apply-imports may only contain xsl:with-param children.</xsl:message>
   </xsl:template>

   <xsl:template match="xsl:choose[text()[normalize-space(.)]]">
     <xsl:message terminate="yes">XTSE0010: xsl:choose may not contain text content.</xsl:message>
   </xsl:template>

   <!-- XTSE0090: Unknown attributes on XSLT elements.
        Standard attributes (valid on any XSLT element, null namespace): version,
        exclude-result-prefixes, extension-element-prefixes, xpath-default-namespace,
        default-collation, use-when. -->
   <xsl:template match="xsl:*/@*[not(namespace-uri()) or namespace-uri() = 'http://www.w3.org/1999/XSL/Transform']">
     <xsl:variable name="parent" select="local-name(..)"/>
     <xsl:variable name="attr" select="local-name()"/>
     <xsl:variable name="ns" select="namespace-uri()"/>
     <!-- XSLT-namespace attributes are not valid on XSLT elements -->
     <xsl:if test="$ns = 'http://www.w3.org/1999/XSL/Transform'">
       <xsl:message terminate="yes">XTSE0090: xsl:<xsl:value-of select="$attr"/> is not a valid attribute of xsl:<xsl:value-of select="$parent"/>.</xsl:message>
     </xsl:if>
     <!-- Standard attributes are valid on all XSLT elements -->
     <xsl:if test="not($ns) and not($attr = ('version', 'exclude-result-prefixes', 'extension-element-prefixes', 'xpath-default-namespace', 'default-collation', 'use-when'))">
       <xsl:variable name="allowed">
         <xsl:choose>
           <xsl:when test="$parent = ('stylesheet', 'transform')">id version extension-element-prefixes exclude-result-prefixes xpath-default-namespace default-validation default-collation input-type-annotations</xsl:when>
           <xsl:when test="$parent = 'analyze-string'">select regex flags</xsl:when>
           <xsl:when test="$parent = 'apply-imports'"></xsl:when>
           <xsl:when test="$parent = 'apply-templates'">select mode</xsl:when>
           <xsl:when test="$parent = 'attribute'">name namespace select separator type validation</xsl:when>
           <xsl:when test="$parent = 'attribute-set'">name use-attribute-sets</xsl:when>
           <xsl:when test="$parent = 'call-template'">name</xsl:when>
           <xsl:when test="$parent = 'character-map'">name use-character-maps</xsl:when>
           <xsl:when test="$parent = 'choose'"></xsl:when>
           <xsl:when test="$parent = 'comment'">select</xsl:when>
           <xsl:when test="$parent = 'copy'">copy-namespaces inherit-namespaces use-attribute-sets type validation select</xsl:when>
           <xsl:when test="$parent = 'copy-of'">select copy-namespaces type validation</xsl:when>
           <xsl:when test="$parent = 'decimal-format'">name decimal-separator grouping-separator infinity minus-sign NaN percent per-mille zero-digit digit pattern-separator exponent-separator</xsl:when>
           <xsl:when test="$parent = 'document'">validation type</xsl:when>
           <xsl:when test="$parent = 'element'">name namespace inherit-namespaces use-attribute-sets type validation</xsl:when>
           <xsl:when test="$parent = 'fallback'"></xsl:when>
           <xsl:when test="$parent = 'for-each'">select</xsl:when>
           <xsl:when test="$parent = 'for-each-group'">select group-by group-adjacent group-starting-with group-ending-with collation</xsl:when>
           <xsl:when test="$parent = 'function'">name as override visibility</xsl:when>
           <xsl:when test="$parent = 'if'">test</xsl:when>
           <xsl:when test="$parent = 'import'">href</xsl:when>
           <xsl:when test="$parent = 'import-schema'">namespace schema-location</xsl:when>
           <xsl:when test="$parent = 'include'">href</xsl:when>
           <xsl:when test="$parent = 'key'">name match use collation as</xsl:when>
           <xsl:when test="$parent = 'matching-substring'"></xsl:when>
           <xsl:when test="$parent = 'message'">select terminate error-code</xsl:when>
           <xsl:when test="$parent = 'namespace'">name select</xsl:when>
           <xsl:when test="$parent = 'namespace-alias'">stylesheet-prefix result-prefix</xsl:when>
           <xsl:when test="$parent = 'next-match'"></xsl:when>
           <xsl:when test="$parent = 'non-matching-substring'"></xsl:when>
           <xsl:when test="$parent = 'number'">value count from level format lang letter-value ordinal grouping-separator grouping-size select as</xsl:when>
           <xsl:when test="$parent = 'otherwise'"></xsl:when>
           <xsl:when test="$parent = 'output'">name method byte-order-mark cdata-section-elements doctype-public doctype-system encoding escape-uri-attributes include-content-type indent media-type normalization-form omit-xml-declaration standalone undeclare-prefixes use-character-maps version</xsl:when>
           <xsl:when test="$parent = 'output-character'">character string</xsl:when>
           <xsl:when test="$parent = 'param'">name select as required tunnel static</xsl:when>
           <xsl:when test="$parent = 'perform-sort'">select</xsl:when>
           <xsl:when test="$parent = 'preserve-space'">elements</xsl:when>
           <xsl:when test="$parent = 'processing-instruction'">name select</xsl:when>
           <xsl:when test="$parent = 'result-document'">format href validation type method byte-order-mark cdata-section-elements doctype-public doctype-system encoding escape-uri-attributes include-content-type indent media-type normalization-form omit-xml-declaration output-version standalone undeclare-prefixes use-character-maps parameter-document</xsl:when>
           <xsl:when test="$parent = 'sequence'">select as</xsl:when>
           <xsl:when test="$parent = 'sort'">select lang data-type order case-order collation stable as</xsl:when>
           <xsl:when test="$parent = 'strip-space'">elements</xsl:when>
           <xsl:when test="$parent = 'template'">match name priority mode as import-</xsl:when>
           <xsl:when test="$parent = 'text'">disable-output-escaping</xsl:when>
           <xsl:when test="$parent = 'value-of'">select separator disable-output-escaping</xsl:when>
           <xsl:when test="$parent = 'variable'">name select as</xsl:when>
           <xsl:when test="$parent = 'when'">test</xsl:when>
           <xsl:when test="$parent = 'with-param'">name select as tunnel</xsl:when>
           <xsl:otherwise>unknown</xsl:otherwise>
         </xsl:choose>
       </xsl:variable>
       <!-- Only check known elements; unknown elements are handled by XTSE0010 -->
       <!-- Only check when version=2.0 - otherwise ignore. -->
       <xsl:if test="/*[@version='2.0'] and $allowed != 'unknown' and not(tokenize(normalize-space($allowed), ' ') = $attr)">
         <xsl:message terminate="yes">XTSE0090: <xsl:value-of select="$attr"/> is not a valid attribute of xsl:<xsl:value-of select="$parent"/>.</xsl:message>
       </xsl:if>
     </xsl:if>
     <xsl:copy/>
   </xsl:template>

</xsl:stylesheet>
