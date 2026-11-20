# Shonan site fonts

Fonts from the official [Google Fonts repository](https://github.com/google/fonts), obtained 2026-11-19. Each family includes its SIL Open Font License in this directory.

- [BBH Bartle Regular](https://github.com/google/fonts/tree/main/ofl/bbhbartle): full font, lossless WOFF2 conversion.
- [Instrument Sans variable](https://github.com/google/fonts/tree/main/ofl/instrumentsans): full font, lossless WOFF2 conversion.
- [Zen Kaku Gothic New](https://github.com/google/fonts/tree/main/ofl/zenkakugothicnew): Regular, Medium, Bold, Black. The initial WOFF2 subset covers the site's application content, shared labels and SVG text, with layout features and name records retained.

The `-Full.woff2` files retain all 7,737 character mappings from the official TTFs. They use the CSS family `YottaByte Zen Full` as a same-typeface fallback. Generated `fontFallback.css` excludes the initial subset from each fallback face's `unicode-range`, so complete files are requested only for additional characters, including later copy changes or visitor input.

To refresh both sets, install `fonttools[woff]` in a Python environment and run:

```sh
python3 scripts/generate-shonan-japanese-fonts.py --source-dir /path/to/official/ttfs
```

The source directory must contain the four official `ZenKakuGothicNew-{Regular,Medium,Bold,Black}.ttf` files. Do not omit the license files when distributing the fonts.
