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
</xsl:stylesheet>
