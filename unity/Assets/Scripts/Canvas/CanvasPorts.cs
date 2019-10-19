using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using System;
using UnityEngine.EventSystems;
using Newtonsoft.Json;

public partial class CanvasBehaviours : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern void OnChangeTemplate(string jsonData);


    public void ChangeTemplate(string json)
    {
        ActiveTemplate = JsonConvert.DeserializeObject<Template>(json);
        OnChangeTemplate(JsonConvert.SerializeObject(ActiveTemplate));
    }
}
