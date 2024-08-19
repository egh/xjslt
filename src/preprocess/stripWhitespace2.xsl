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

   <!-- https://www.w3.org/TR/xslt20/#stylesheet-stripping -->
   <xsl:template match="text()[matches(., '^[\s\t\n\r]+$')]" priority="1">
     <xsl:variable name="parent-name" select="local-name(..)"/>
     <xsl:variable name="ns-correct" select="namespace-uri(..) = 'http://www.w3.org/1999/XSL/Transform'"/>
     <xsl:variable name="nearest-preserve" select="./ancestor::*[@xml:space = 'preserve']"/>
     <xsl:variable name="nearest-default" select="./ancestor::*[@xml:space = 'default']"/>
     <xsl:choose>
       <xsl:when test="$ns-correct and $parent-name = 'text'">
         <xsl:copy/>
       </xsl:when>
       <xsl:when test="$parent-name = ('analyze-string', 'apply-imports', 'apply-templates', 'attribute-set', 'call-template', 'character-map', 'choose', 'next-match', 'stylesheet', 'transform')">
         <!-- always strip -->
       </xsl:when>
       <xsl:when test="$nearest-preserve and not($nearest-default)">
         <!-- there is a parent xml:space="preserve" but no xml:space="default" -->
         <xsl:copy/>
       </xsl:when>
       <xsl:when test="$nearest-preserve and $nearest-default and not($nearest-default = $nearest-preserve//*)">
         <!-- there is a closer xml:space="preserve" than a xml:space="default" -->
         <xsl:copy/>
       </xsl:when>
       <xsl:otherwise>
         <!-- strip -->
       </xsl:otherwise>
     </xsl:choose>
   </xsl:template>
</xsl:stylesheet>
