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
    <xsl:call-template name="output-author-item">
      <xsl:with-param name="out-type" select="'item'"/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="output-author-item">
    <xsl:param name="out-type" select="'author'"/>
    <xsl:element name="{$out-type}"><xsl:value-of select="." /></xsl:element>
  </xsl:template>  
</xsl:stylesheet>
