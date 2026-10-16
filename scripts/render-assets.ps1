$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$siteRoot = Split-Path $PSScriptRoot -Parent
$metadataText = & node (Join-Path $PSScriptRoot 'build-site.mjs') --metadata
if ($LASTEXITCODE -ne 0) { throw 'Content metadata export failed.' }
$contentMetadata = $metadataText | ConvertFrom-Json
$assetDirectory = Join-Path $siteRoot 'assets/images/og'
[System.IO.Directory]::CreateDirectory($assetDirectory) | Out-Null
$mascot = [System.Drawing.Image]::FromFile((Join-Path $siteRoot 'assets/images/coocoo.png'))
$titleFont = [System.Drawing.Font]::new('Malgun Gothic', 43, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$bodyFont = [System.Drawing.Font]::new('Malgun Gothic', 27, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$smallFont = [System.Drawing.Font]::new('Malgun Gothic', 24, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$ink = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#28231f'))
$muted = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#635a56'))
$paper = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#fffdf8'))
$accent = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#f2d27f'))
$format = [System.Drawing.StringFormat]::new()
$format.Trimming = [System.Drawing.StringTrimming]::EllipsisCharacter
try {
  foreach ($item in $contentMetadata) {
    $bitmap = [System.Drawing.Bitmap]::new(1200, 630)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml('#f4f0e8'))
      $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.FillRectangle($paper, 40, 40, 1120, 550)
      $graphics.FillRectangle($accent, 68, 78, 284, 468)
      $graphics.DrawImage($mascot, 100, 150, 220, 220)
      $graphics.DrawString('쿠쿠', $titleFont, $ink, 158, 408)
      $graphics.DrawString([string]$item.category, $smallFont, $muted, 400, 92)
      $graphics.DrawString([string]$item.heading, $titleFont, $ink, [System.Drawing.RectangleF]::new(400, 150, 700, 154), $format)
      $graphics.DrawString([string]$item.description, $bodyFont, $ink, [System.Drawing.RectangleF]::new(400, 320, 690, 126), $format)
      $graphics.DrawString('친구랑 비교하는 짧은 테스트와 놀이', $smallFont, $muted, 400, 474)
      $graphics.DrawString('coocooing.kro.kr', $smallFont, $ink, 400, 528)
      $bitmap.Save((Join-Path $assetDirectory ($item.id + '.png')), [System.Drawing.Imaging.ImageFormat]::Png)
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  }
  $metadataHash = [Convert]::ToHexString([System.Security.Cryptography.SHA256]::HashData([System.Text.Encoding]::UTF8.GetBytes($metadataText.Trim()))).ToLowerInvariant()
  $manifest = @{ metadataSha256 = $metadataHash; count = $contentMetadata.Count } | ConvertTo-Json
  [System.IO.File]::WriteAllText((Join-Path $assetDirectory 'manifest.json'), $manifest + [Environment]::NewLine)
} finally {
  $mascot.Dispose(); $titleFont.Dispose(); $bodyFont.Dispose(); $smallFont.Dispose()
  $ink.Dispose(); $muted.Dispose(); $paper.Dispose(); $accent.Dispose(); $format.Dispose()
}
Write-Output "Rendered $($contentMetadata.Count) content preview images."
