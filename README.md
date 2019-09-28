# 起動

`yarn start`

# Unity のコードを反映するには

下記のディレクトリをください

- `public/Build`
- `public/TemplateData`

---

[unityのマニュアル](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html?_ga=2.4361331.1983438053.1569153378-60467206.1569153378)

![](https://github.com/hand-dot/labelmake.jp/blob/master/design/template-editor.png)

```
unityInstance.SendMessage('Canvas', 'SetTemplate', '{
	"name": "test template",
	"size": {
		"width": 210,
		"height": 297
	},
	"font": "Serif"
}');
```
