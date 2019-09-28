# 起動

`yarn start`

# Unity のコードを反映するには

下記のディレクトリをください

- `public/Build`
- `public/TemplateData`

---

[unityのマニュアル](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html?_ga=2.4361331.1983438053.1569153378-60467206.1569153378)

![](https://github.com/hand-dot/labelmake.jp/blob/master/design/template-editor.png)

## 左サイドバーのメソッド

```
unityInstance.SendMessage('Canvas', 'SetTemplate', '{
	"name": "test template",
	"pageSize": {
		"width": 210,
		"height": 297
	},
	"fontName": "NotoSansCJKjp"
}');
unityInstance.SendMessage('Canvas', 'DownloadTemplate');
unityInstance.SendMessage('Canvas', 'ImportImage', 'base64......');
unityInstance.SendMessage('Canvas', 'ImportTemplate', '{
	"sampledata": [
		{
			"[お届け先]郵便番号": "1234567",
			"[お届け先]住所1": "東京都東京1|2|3|4",
			"[お届け先]住所2": "東京マンション123号",
			"[お届け先]氏名": "東京都 出得太 様",
			"[差出人]郵便番号": "7654321",
			"[差出人]住所1": "大阪府大阪1|2|3|4",
			"[差出人]住所2": "大阪マンション123号",
			"[差出人]氏名": "大阪府 出得太"
		}
	],
	"position": {
		"[お届け先]郵便番号": {
			"position": {
				"x": 45,
				"y": 10
			},
			"width": 50,
			"alignment": "left",
			"size": 22.9,
			"space": 7.4,
			"type": "text",
			"lineHeight": 1
		},
		"[お届け先]住所1": {
			"position": {
				"x": 90,
				"y": 30
			},
			"width": 0,
			"alignment": "center",
			"size": 9.2,
			"space": 0,
			"type": "text",
			"lineHeight": 1
		},
		"[お届け先]住所2": {
			"position": {
				"x": 83,
				"y": 35
			},
			"width": 0,
			"alignment": "center",
			"size": 9.2,
			"space": 0,
			"type": "text",
			"lineHeight": 1
		},
		"[お届け先]氏名": {
			"position": {
				"x": 50,
				"y": 25
			},
			"width": 0,
			"alignment": "left",
			"size": 20,
			"space": 0,
			"type": "text",
			"lineHeight": 1
		},
		"[差出人]郵便番号": {
			"position": {
				"x": 6.3,
				"y": 121.5
			},
			"width": 50,
			"alignment": "left",
			"size": 14.8,
			"space": 3.6,
			"type": "text",
			"lineHeight": 0
		},
		"[差出人]住所1": {
			"position": {
				"x": 29,
				"y": 50
			},
			"width": 0,
			"alignment": "center",
			"size": 7,
			"space": 0,
			"type": "text",
			"lineHeight": 1
		},
		"[差出人]住所2": {
			"position": {
				"x": 25,
				"y": 60
			},
			"width": 0,
			"alignment": "center",
			"size": 7,
			"space": 0,
			"type": "text",
			"lineHeight": 1
		},
		"[差出人]氏名": {
			"position": {
				"x": 12,
				"y": 57
			},
			"width": 0,
			"alignment": "left",
			"size": 15,
			"space": 0,
			"type": "text",
			"lineHeight": 1
		}
	},
	"image": null,
	"pageSize": {
		"width": 100,
		"height": 148
	},
	"name": "年賀はがき",
	"fontName": "NotoSansCJKjp"
}');
```

##  右サイドバー

```
```
