# Template

## 基本概要
新規構築用テンプレート  
あくまで個人用のもののため、独自ルールがあります。  
量産用の構成のため、シングルページや小規模の場合は調整。

## 仕様
- 文字コード：UTF-8（BOM無し）
- ドキュメントタイプ：HTML5 / CSS level3
- 改行コード：CR+LF
- フォント：Noto Sans JP 400 + 700
- レスポンシブ + リキッド

## ラベルルール
### id
記法：パスカルケース（アッパーキャメルケース）  
JSにてインスタンス対象となるオブジェクトにのみ使用  
CSS指定ではidは使用不可

### class
FLOCSS + BEMを基にした独自ルール（ローワーキャメルケースあり）  
モジュールの状態や識別はマルチクラス  
  
接頭語
- レイアウト：「.l_xxx」
- 汎用クラス：「.c_xxx」
- モジュール：「.m_xxx」
- モジュールの状態（変化）：「.s_xxx」
- モジュールの識別：「.-xxx」
- JS用：「.js_xxx」

接続  
ブロックとなる子要素毎に「-」で接続  
エレメントを「__」で接続

## HTML
インデント：ソフトタイプ（半角スペース2つ）  
空要素：閉じとなる「/」は記述なし

## CSS
### ライブラリ
- slick（編集不可）

### common.css
リセット、基本レイアウト、モジュール  
※ページ固有の指定は別ファイルとして管理

### utilityClass.css
Utilityクラス（汎用クラス）用  
必要に応じて読み込む

## Javascript
### ライブラリ
- jQuery 3.3.1（編集不可）
- slick（編集不可）

### common.js
共通モジュールをオブジェクトリテラルで管理
- App.global：グローバル変数
- App.fn：関数
- App.ui：インターフェース用モジュール
- App.utils：その他汎用モジュール
- App.views：オブジェクト（View）

※ページ固有の指定は別ファイルとして管理  
  
参考：[JSモジュール設計](https://github.com/takahashiakira/tech_for_web/wiki/JS%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E8%A8%AD%E8%A8%88)
