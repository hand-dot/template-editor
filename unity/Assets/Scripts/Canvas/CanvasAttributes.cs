using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;

public partial class CanvasBehaviours : MonoBehaviour
{
    private Template ActiveTemplate { get; set; }

}

[JsonObject("template")]
class Template
{
    [JsonProperty("templateName")]
    public string TemplateName { get; set; } = "";
    [JsonProperty("image")]
    public string Image { get; set; } = "";
    [JsonProperty("fontName")]
    public string FontName { get; set; } = "NotoSansCJKjp";
    [JsonProperty("pageSize")]
    public PageSize PageSize { get; set; } = new PageSize();
}

[JsonObject("pageSize")]
class PageSize
{
    [JsonProperty("width")]
    public int Width { get; set; } = 210;
    [JsonProperty("height")]
    public int Height { get; set; } = 297;
}

