﻿using System;
using UnityEngine;


public partial class CanvasBehaviours : MonoBehaviour
{
    private Template activeTemplate;
    private Template ActiveTemplate
    {
        get {
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
            sheetTransform.sizeDelta = new Vector2(value.size.width * widthFactor, value.size.height * heightFactor);
            Debug.Log("factor " + value.size.width * widthFactor);
            activeTemplate = value;
        }
    }

}

[System.Serializable]
class Template
{
    public string name = "";
    public string image = "";
    public string fontName = "NotoSansCJKjp";
    public PageSize size = new PageSize();
}

[System.Serializable]
class PageSize
{
    public int width = 210;
    public int height = 297;
}

