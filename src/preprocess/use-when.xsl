<!-- Copyright (C) 2021-2026 Erik Hetzner -->

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
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xjslt="https://www.e6h.org/xjslt">
  
  <xsl:template match="/ | @* | node()">
     <xsl:copy>
       <xsl:apply-templates select="@* | node()" />
     </xsl:copy>
   </xsl:template>
   
   <xsl:template match="xsl:*[@use-when]">
     <xsl:if test="xjslt:evaluate(@use-when)">
       <xsl:copy>
         <xsl:apply-templates select="@* | node()" />
       </xsl:copy>
     </xsl:if>
   </xsl:template>

   <xsl:template match="*[namespace-uri() != 'http://www.w3.org/1999/XSL/Transform' and @xsl:use-when]">
     <xsl:if test="xjslt:evaluate(@xsl:use-when)">
       <xsl:copy>
         <xsl:apply-templates select="@* | node()" />
       </xsl:copy>
     </xsl:if>
   </xsl:template>
</xsl:stylesheet>
