using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using UnityEngine;
using UnityEngine.UI;

public partial class CanvasBehaviours : MonoBehaviour
{

    private float widthFactor = 2480 / 210f;
    private float heightFactor = 3508 / 297f;
    private Template activeTemplate;
    private Template ActiveTemplate
    {
        get
        {
            RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
            Template template = new Template();
            template.name = activeTemplate.name;
            template.image = activeTemplate.image;
            template.fontName = activeTemplate.fontName;
            PageSize pageSize = new PageSize();
            pageSize.width = Convert.ToInt32(sheetTransform.rect.width / widthFactor);
            pageSize.height = Convert.ToInt32(sheetTransform.rect.height / heightFactor);
            template.size = pageSize;
            for (int i = 0; i < activeTemplate.fields.Count; i++)
            {
                RectTransform fieldTransf = (UnityEngine.RectTransform)transform.Find("Sheet").Find(activeTemplate.fields[i].id);
                Field field = activeTemplate.fields[i];
                field.sampleData = fieldTransf.GetComponentInChildren<UnityEngine.UI.InputField>().text;
                field.size.width = fieldTransf.rect.width / widthFactor;
                field.size.height = fieldTransf.rect.height / heightFactor;
                field.position.x = fieldTransf.position.x / widthFactor - field.size.width / 2.0f + pageSize.width / 2.0f;
                field.position.y = - (fieldTransf.position.y / heightFactor + field.size.height / 2.0f - pageSize.height / 2.0f);
            }
            template.fields = activeTemplate.fields;
            return template;
        }
        set
        {
            RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
            sheetTransform.GetComponent<Image>().sprite = value.image != null && value.image != "" ? toImage(value.image) : null;
            sheetTransform.sizeDelta = new Vector2(value.size.width * widthFactor, value.size.height * heightFactor);

            foreach (Transform child in sheetTransform)
            {
                Destroy(child.gameObject);
            }

            for (int i = 0; i < value.fields.Count; i++)
            {

                RectTransform fieldTransf = InstantiateField().GetComponent<RectTransform>();
                Field field = value.fields[i];
                fieldTransf.name = field.id;
                fieldTransf.GetComponentInChildren<UnityEngine.UI.InputField>().text = fieldTransf.GetComponentInChildren<UnityEngine.UI.InputField>().text;
                fieldTransf.sizeDelta = new Vector2(field.size.width * widthFactor, field.size.height * heightFactor);
                fieldTransf.position = new Vector3(
                    (field.position.x + field.size.width / 2.0f - value.size.width / 2.0f) * widthFactor,
                    (value.size.height - (field.position.y - field.size.height / 2.0f + value.size.height / 2.0f)) * heightFactor,
                    fieldTransf.position.z
                 );
            }
            activeTemplate = value;
        }
    }

    private GameObject InstantiateField()
    {
        GameObject inputField = Instantiate(reactiveInputPrefab, Vector3.zero, Quaternion.identity);
        inputField.GetComponentInChildren<UnityEngine.UI.InputField>().onValueChanged.AddListener((val) => { FireOnChangeTemplate(); });
        inputField.transform.parent = transform.Find("Sheet");
        return inputField;
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
    public float width = 60;
    public float height = 10;
}

[System.Serializable]
class TextStyle
{
    public string alignment = "";
    public int fontSize = 16;
    public float characterSpacing = 1f;
    public float lineHeight = 1f;
}
