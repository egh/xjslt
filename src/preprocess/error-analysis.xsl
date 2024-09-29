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
     <xsl:next-match/>
   </xsl:template>
</xsl:stylesheet>
