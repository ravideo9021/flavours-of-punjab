# Fonts

Barlow and Barlow Condensed (© 2017 The Barlow Project Authors, SIL Open Font
License 1.1 — see `OFL.txt`), self-hosted through `next/font/local`.

Each file is the Google Fonts Latin subset reduced with `pyftsubset` to the
characters the site uses, without hinting (about 12 KB per weight instead of two
~20 KB requests). Barlow has no ₹ glyph, so the rupee sign is drawn by the
visitor's system font either way.

To add a character (for example a new accented letter), re-run `pyftsubset` on
the original file from https://github.com/jpt/barlow with a wider `--unicodes`
list, e.g.

    pyftsubset Barlow-Regular.ttf --flavor=woff2 --no-hinting \
      --layout-features="kern,liga,calt,locl,tnum,lnum,case" \
      --unicodes="U+0020-007E,U+00A0-00FF,U+2013-2014,U+2018-201E,U+2022,U+2026,U+20AC,U+2122" \
      --output-file=Barlow-400.woff2

Mr Dafoe (the script accent font) is still loaded from Google Fonts via
`next/font/google`, which self-hosts it at build time.
