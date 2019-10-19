using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public partial class CanvasBehaviours : MonoBehaviour
{
    private Template ActiveTemplate { get; set; }
}

[System.Serializable]
class Template
{
    public string templateName = "";
    public string image = "";
    public string fontName = "NotoSansCJKjp";
    public PageSize pageSize = new PageSize();
}

[System.Serializable]
class PageSize
{
    public int width　= 210;
    public int height = 297;
}

