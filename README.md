![](https://github.com/hand-dot/template-editor/blob/master/design/readme/template-editor.png)


# 起動

`yarn start`

# Unity のコードを反映するには

下記のディレクトリを配置してください

- `public/Build`
- `public/TemplateData`

---

[unity のマニュアル](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html?_ga=2.4361331.1983438053.1569153378-60467206.1569153378)

# 開発環境の構築

## Visual Studio IDE のインストール

- [Community エディションを入手して](https://visualstudio.microsoft.com/ja/downloads/)、インストールしてください。[詳細はこちら](https://docs.microsoft.com/ja-jp/visualstudio/mac/setup-vsmac-tools-unity?view=vsmac-2019)
- 次にユニティハブをインストールしてください。[ダウンロードはこちら](https://unity3d.com/get-unity/download)

- 下記の通りにゲームエンジンをインストールしてください
  ![](https://github.com/hand-dot/template-editor/blob/master/design/readme/unity-hub-engine1.png)

![](https://github.com/hand-dot/template-editor/blob/master/design/readme/unity-hub-engine2.png)

![](https://github.com/hand-dot/template-editor/blob/master/design/readme/unity-hub-engine3.png)

- インストール完了後にプロジェクトを追加し Unity を起動します
  ![](https://github.com/hand-dot/template-editor/blob/master/design/readme/unity-hub-add1.png)

![](https://github.com/hand-dot/template-editor/blob/master/design/readme/unity-hub-add2.png)

![](https://github.com/hand-dot/template-editor/blob/master/design/readme/unity-hub-add3.png)

## Unity のビルド

メニューから ファイル -> ビルドの設定 -> ビルドを押下します

## 左サイドバーのメソッド

```
unityInstance.SendMessage('Canvas', 'DownloadTemplate');
unityInstance.SendMessage('Canvas', 'ImportImage', 'base64......');
// ImportTemplateは初期化時にも使用される
// 既存のテンプレートを読み込んだ場合
unityInstance.SendMessage('Canvas', 'ChangeTemplate', '{
	"templateName": "年賀はがき",
	"image": null,
	"pageSize": {
		"width": 100,
		"height": 148
	},
	"fontName": "NotoSansCJKjp",
	// これはまだアイデアだが、fontUriを持ってもいいかもしれない
	// "fontUri": "https://labelmake3.firebaseapp.com/pdfmake/vfs_fonts.js"
	"fields":  [
		{
			"id": "uuid-hogehoge1234",
			"fieldName": "[お届け先]郵便番号",
			"sampleData": "1234567",
			"position": {
				"x": 45,
				"y": 10
			},
			"size": {
				"width": 50,
				"height": 100
			},
			"type": "text",
			"alignment": "left",
			"fontSize": 22.9,
			"characterSpacing": 7.4,
			"lineHeight": 1
		},
		{
			"id": "uuid-hogehoge1235",
			"fieldName": "[お届け先]住所1",
			"sampleData": "東京都東京1|2|3|4",
			"position": {
				"x": 90,
				"y": 30
			},
			"size": {
				"width": 0,
				"height": 100
			},
			"type": "text",
			"alignment": "center",
			"fontSize": 9.2,
			"characterSpacing": 0,
			"lineHeight": 1
		},
		{
			"id": "uuid-hogehoge1236",
			"fieldName": "[お届け先]住所2",
			"sampleData": "東京マンション123号",
			"position": {
				"x": 83,
				"y": 35
			},
			"size": {
				"width": 0,
				"height": 100
			},
			"type": "text",
			"alignment": "center",
			"fontSize": 9.2,
			"characterSpacing": 0,
			"lineHeight": 1
		},
		{
			"id": "uuid-hogehoge1237",
			"fieldName": "[お届け先]氏名",
			"sampleData": "東京都 出得太 様",
			"position": {
				"x": 50,
				"y": 25
			},
			"size": {
				"width": 0,
				"height": 100
			},
			"type": "text",
			"alignment": "left",
			"fontSize": 20,
			"characterSpacing": 0,
			"lineHeight": 1
		},
		{
			"id": "uuid-hogehoge1238",
			"fieldName": "[差出人]郵便番号",
			"sampleData": "7654321",
			"position": {
				"x": 6.3,
				"y": 121.5
			},
			"size": {
				"width": 50,
				"height": 100
			},
			"type": "text",
			"alignment": "left",
			"fontSize": 14.8,
			"characterSpacing": 3.6,
			"lineHeight": 0
		},
		{
			"id": "uuid-hogehoge1239",
			"fieldName": "[差出人]住所1",
			"sampleData": "大阪府大阪1|2|3|4",
			"position": {
				"x": 29,
				"y": 50
			},
			"size": {
				"width": 0,
				"height": 100
			},
			"type": "text",
			"alignment": "center",
			"fontSize": 7,
			"characterSpacing": 0,
			"lineHeight": 1
		},
		{
			"id": "uuid-hogehoge1220",
			"fieldName": "[差出人]住所2",
			"sampleData": "大阪マンション123号",
			"position": {
				"x": 25,
				"y": 60
			},
			"size": {
				"width": 0,
				"height": 100
			},
			"type": "text",
			"alignment": "center",
			"fontSize": 7,
			"characterSpacing": 0,
			"lineHeight": 1
		},
		{
			"id": "uuid-hogehoge1221",
			"fieldName": "[差出人]氏名",
			"sampleData": "大阪府 出得太",
			"position": {
				"x": 12,
				"y": 57
			},
			"size": {
				"width": 0,
				"height": 100
			},
			"type": "text",
			"alignment": "left",
			"fontSize": 15,
			"characterSpacing": 0,
			"lineHeight": 1
		}
	]
}');
// 初期化時
unityInstance.SendMessage('Canvas', 'ChangeTemplate', '{
	"templateName": "",
	"image": null,
	"pageSize": {
		"width": 210,
		"height": 297
	},
	"fontName": "NotoSansCJKjp",
	"fields":  []
}');
```

## 右サイドバーメソッド

- active は最新の変更されたフィールドの ID を find して点灯させる
- expand は Javascript で UI ステートとして持つ
- grab は最終的に positions の配列の並び順となるので UI ステートとして持つ

- remove は消して欲しいフィールドの ID を送る
- add は引数なし
- change は変えたい情報を送る

```
unityInstance.SendMessage('Canvas', 'Remove', 'uuid-hoge-hoge');
unityInstance.SendMessage('Canvas', 'Add');
// type text
unityInstance.SendMessage('Canvas', 'Change', '{
	"id": "uuid-hoge-hoge",
	"fieldName": "[お届け先]電話番号",
	"sampleData": "08012345678",
	"position": {
		"x": 91,
		"y": 135.5
	},
	"size": {
		"width": 95,
		"height": 95
	},
	"type": "text",
	"alignment": "left",
	"fontSize": 15,
	"characterSpacing": 0,
	"lineHeight": 1

}');
// type image
unityInstance.SendMessage('Canvas', 'Change', '{
	"id": "uuid-foo-bar",
	"fieldName": "サイン",
	"sampleData": "base64......",
	"position": {
		"x": 91,
		"y": 135.5
	},
	"size": {
		"width": 95,
		"height": 95
	},
	"type": "image"
}');
```

```
unityから変更があった場合にどのようにくるか

onChangeTemplate( changedTemplateData => {
// changedTemplateData
// 	"templateName": "test template",
//	"image": null,
// 	"pageSize": {
// 		"width": 210,
// 		"height": 297
// 	},
// 	"fontName": "NotoSansCJKjp"
})

// type text
onChangeField( changedFieldData => {
// changedFieldData
//  {
// 	"id": "uuid-foo-bar",
// 	"fieldName": "customerName",
// 	"sampleData": "john"
// 	"position": {
// 		"x": 91,
// 		"y": 135.5
// 	},
// 	"size": {
// 		"width": 95,
// 		"height": 95
// 	},
//	"type": "text",
//	"alignment": "left",
//	"fontSize": 15,
//	"characterSpacing": 0,
//	"lineHeight": 1
// }
})

// type image
onChangeField( changedFieldData => {
// changedFieldData
//  {
// 	"id": "uuid-foo-bar",
// 	"fieldName": "サイン",
// 	"sampleData": "base64......"
// 	"position": {
// 		"x": 91,
// 		"y": 135.5
// 	},
// 	"size": {
// 		"width": 95,
// 		"height": 95
// 	},
// 	"type": "image",
// }
})
```
