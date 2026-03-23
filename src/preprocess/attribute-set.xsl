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

  <xsl:template name="use-attribute-sets">
    <xsl:param name="attribute-sets"/>
    <xsl:variable name="root" select="/"/>
    <xsl:for-each select="tokenize($attribute-sets, '\s+')">
      <xsl:variable name="name" select="."/>
      <xsl:variable name="attribute-set" select="$root//xsl:attribute-set[@name=$name]"/>
      <xsl:if test="not(boolean($attribute-set))">
        <xsl:message terminate="yes">XTSE0710 Attribute set not found</xsl:message>
      </xsl:if>
      <xsl:copy-of select="$root//xsl:attribute-set[@name=$name]/node()"/>
    </xsl:for-each>
  </xsl:template>
  
  <xsl:template match="xsl:copy[@use-attribute-sets] | xsl:element[@use-attribute-sets]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:call-template name="use-attribute-sets">
        <xsl:with-param name="attribute-sets" select="@use-attribute-sets"/>
      </xsl:call-template>
      <xsl:apply-templates select="node()" />
    </xsl:copy>
  </xsl:template>


  <xsl:template match="*[namespace-uri() != 'http://www.w3.org/1999/XSL/Transform' and @xsl:use-attribute-sets]">
    <xsl:copy>
      <xsl:apply-templates select="@*"/>
      <xsl:call-template name="use-attribute-sets">
        <xsl:with-param name="attribute-sets" select="@xsl:use-attribute-sets"/>
      </xsl:call-template>
      <xsl:apply-templates select="node()" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="@use-attribute-sets | @xsl:use-attribute-sets">
  </xsl:template>
</xsl:stylesheet>
