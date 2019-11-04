using System;
using System.Collections.Generic;
using System.Text;
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
            //sheetTransform.GetComponent<Image>().sprite = value.image != null ? toImage(value.image) : null;
            sheetTransform.sizeDelta = new Vector2(value.size.width * widthFactor, value.size.height * heightFactor);
            Debug.Log("factor " + value.size.width * widthFactor);
            activeTemplate = value;
        }
    }


    private void toImage(string inputText)
    {
        byte[] bytesToEncode = Encoding.UTF8.GetBytes(inputText);
        string encodedText = Convert.ToBase64String(bytesToEncode);
        //return  e
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