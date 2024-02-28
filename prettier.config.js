/** @type {import('prettier').Config} */
module.exports = {
  plugins: ["prettier-plugin-tailwindcss"],
  semi: true, // セミコロン付ける
  singleQuote: true, // シングルクォートを使う
  printWidth: 90, // 90文字で折り返し
  tabWidth: 2, // タブで半角2文字分のスペース
  trailingComma: "all", // オブジェクトリテラル等で最後にもカンマをつける
  jsxSingleQuote: true, // JSX内でシングルクォートを使う
};
