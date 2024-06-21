<xsl:stylesheet
    version="2.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:template match="/">
    <xsl:element name="xsl:stylesheet">
      <xsl:attribute name="version" select="@xsl:version"/>
      <xsl:element name="xsl:template">
        <xsl:attribute name="match">/</xsl:attribute>
        <xsl:copy-of select="."/>
      </xsl:element>
    </xsl:element>
  </xsl:template>

   <xsl:template match="@* | node()">
     <xsl:copy>
       <xsl:apply-templates select="@* | node()" />
     </xsl:copy>
   </xsl:template>
</xsl:stylesheet>
