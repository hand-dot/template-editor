using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UI;

public partial class CanvasBehaviours : MonoBehaviour
{
    private Template activeTemplate;
    private Template ActiveTemplate
    {
        get
        {
            float widthFactor = 210f / 2480;
            float heightFactor = 297f / 3508;
            RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
            Template template = new Template();
            template.name = activeTemplate.name;
            template.image = activeTemplate.image;
            template.fontName = activeTemplate.fontName;
            PageSize pageSize = new PageSize();
            pageSize.width = Convert.ToInt32(sheetTransform.rect.width * widthFactor);
            pageSize.height = Convert.ToInt32(sheetTransform.rect.height * heightFactor);
            template.size = pageSize;
            for (int i = 0; i < activeTemplate.fields.Count; i++)
            {
                RectTransform tmpTransform = (UnityEngine.RectTransform)transform.Find("Sheet").Find(activeTemplate.fields[i].id);
                Field field = activeTemplate.fields[i];
                field.size.width = tmpTransform ? tmpTransform.rect.width : field.size.width;
                field.size.height = tmpTransform ? tmpTransform.rect.height : field.size.height;
                field.position.x = tmpTransform ? tmpTransform.rect.x : field.position.x;
                field.position.y = tmpTransform ? tmpTransform.rect.y : field.position.y;
            }
            template.fields = activeTemplate.fields;
            return template;
        }
        set
        {
            float widthFactor = 2480 / 210f;
            float heightFactor = 3508 / 297f;
            RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
            sheetTransform.GetComponent<Image>().sprite = value.image != null && value.image != "" ? toImage(value.image) : null;
            sheetTransform.sizeDelta = new Vector2(value.size.width * widthFactor, value.size.height * heightFactor);
            activeTemplate = value;
        }
    }


    private Sprite toImage(string str)
    {
        string trimmedStr = Regex.Replace(str, "^data:image.*base64,", "");
        byte[] imageBytes = Convert.FromBase64String(trimmedStr);
        Texture2D texture = new Texture2D(2, 2);
        texture.LoadImage(imageBytes);
        return Sprite.Create(texture, new Rect(0.0f, 0.0f, texture.width, texture.height), new Vector2(0.5f, 0.5f), 100.0f);
    }

}

/** Template */
[System.Serializable]
class Template
{
    public string name = "";
    public string image = "";
    public string fontName = "NotoSansCJKjp";
    public PageSize size = new PageSize();
    public List<Field> fields = new List<Field>();
}


[System.Serializable]
class PageSize
{
    public int width = 210;
    public int height = 297;
}

/** TextField ImageField */
[System.Serializable]
class Field
{
    public string id = Guid.NewGuid().ToString();
    public string name = "";
    public string sampleData = "";
    public Position position = new Position();
    public Size size = new Size();
    public string type;
    public TextStyle style;

    public Field()
    {
        type = "text";
        style = new TextStyle();
    }
    public Field(string fieldType)
    {
        type = fieldType == "image" ? "image" : "text";
        style = fieldType == "image" ? null : new TextStyle();
    }
}


[System.Serializable]
class Position
{
    public float x;
    public float y;
}

[System.Serializable]
class Size
{
    public float width = 500;
    public float height = 100;
}

[System.Serializable]
class TextStyle
{
    public string alignment = "";
    public int fontSize = 16;
    public float characterSpacing = 1f;
    public float lineHeight = 1f;
}
