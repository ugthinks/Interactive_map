ATLAS PERIMETER ATMOSPHERE PATCH

This patch adds a decorative antique-engraved landscape layer to the outer left and right margins. It does not modify the India SVG, monument markers, state labels, pocket watch, or controls.

FILES
- public/assets/atlas-ornaments.png
- src/atlas-atmosphere.css

INSTALL
1. Copy public/assets/atlas-ornaments.png into your project's public/assets/ folder.
2. Copy src/atlas-atmosphere.css into your project's src/ folder.
3. In your existing index.html, add this stylesheet link immediately after the existing /src/style.css link:

   <link rel="stylesheet" href="/src/atlas-atmosphere.css" />

IMPORTANT
Do not replace your existing index.html, src/style.css, or src/components/IndiaMap.js with files from this patch. The stylesheet link is the only HTML change required.

The decorative layer is pointer-events:none and sits behind the map. It is toned down on narrower screens.
