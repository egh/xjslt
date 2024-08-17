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

   <!-- TODO: fully implement https://www.w3.org/TR/xslt20/#stylesheet-stripping -->
   <xsl:template match="text()[matches(., '^[\s\t\n\r]+$') and not(parent::xsl:text)]">
     <!-- strip -->
   </xsl:template>
</xsl:stylesheet>
