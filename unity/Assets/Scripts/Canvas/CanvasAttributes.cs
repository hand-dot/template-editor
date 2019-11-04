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
            return template;
        }
        set
        {
            float widthFactor = 2480 / 210f;
            float heightFactor = 3508 / 297f;
            RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
            sheetTransform.GetComponent<Image>().sprite = value.image != null ? toImage(value.image) : null;
            sheetTransform.sizeDelta = new Vector2(value.size.width * widthFactor, value.size.height * heightFactor);
            Debug.Log("factor " + value.size.width * widthFactor);
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

[System.Serializable]
class Template
{
    public string name = "";
    public string image = "";
    public string fontName = "NotoSansCJKjp";
    public PageSize size = new PageSize();
    public List<BaseField> fields = new List<BaseField>();
}


[System.Serializable]
class PageSize
{
    public int width = 210;
    public int height = 297;
}

[System.Serializable]
class BaseField
{
    public string id = "";
    public string name = "";
    public string sampleData = "";
    public Position position = new Position();
}

[System.Serializable]
class TextField : BaseField
{
    public string type = "text";
    public TextStyle style = new TextStyle();
}

[System.Serializable]
class ImageField : BaseField
{
    public string type = "image";
    public object style;
}


[System.Serializable]
class Position
{
    public float width;
    public float height;
}

[System.Serializable]
class TextStyle
{
    public string alignment;
    public int fontSize;
    public float characterSpacing;
    public float lineHeight;
}