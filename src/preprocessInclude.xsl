<xsl:stylesheet
    version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
   <xsl:template match="/ | @* | node()">
     <xsl:copy>
       <xsl:apply-templates select="@* | node()" />
     </xsl:copy>
   </xsl:template>
   <xsl:template match="xsl:include">
     <xsl:variable name="doc" select="doc(@href)"/>
     <xsl:apply-templates select="$doc/xsl:stylesheet/* | $doc/xsl:transform/*"/>
   </xsl:template>
</xsl:stylesheet>
