using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Newtonsoft.Json;

public partial class CanvasBehaviours : MonoBehaviour
{
    private Template template;


}

[JsonObject("template")]
class Template
{
    [JsonProperty("templateName")]
    private string TemplateName { get; set; } = "";
    [JsonProperty("image")]
    private string Image { get; set; } = "";
    [JsonProperty("fontName")]
    private string FontName { get; set; } = "NotoSansCJKjp";
    [JsonProperty("pageSize")]
    private PageSize PageSizeInstance { get; set; } = new PageSize();

    [JsonObject("pageSize")]
    public class PageSize
    {
        [JsonProperty("width")]
        private int Width { get; set; } = 210;
        [JsonProperty("height")]
        private int Height { get; set; } = 297;
    }
}



