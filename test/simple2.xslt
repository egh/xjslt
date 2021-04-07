<xsl:stylesheet
    version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="xml" />

  <xsl:template match="/">
    <doc>
      <xsl:apply-templates/>
    </doc>
  </xsl:template>

  <xsl:template match="Article">
    <heading type="top"><xsl:value-of select="Title" /></heading>
    <list>
      <xsl:apply-templates select="Authors/Author" />
    </list>
  </xsl:template>

  <xsl:template match="Author">
    <item><xsl:value-of select="." /></item>
  </xsl:template>
</xsl:stylesheet>
