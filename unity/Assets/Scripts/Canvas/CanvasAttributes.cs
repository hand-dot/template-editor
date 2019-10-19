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
    public string templateName { get; set; } = "";
    public string image { get; set; } = "";
    public string fontName { get; set; } = "NotoSansCJKjp";
    public PageSize pageSize { get; set; } = new PageSize();
}

[System.Serializable]
class PageSize
{
    public int width { get; set; } = 210;
    public int height { get; set; } = 297;
}

