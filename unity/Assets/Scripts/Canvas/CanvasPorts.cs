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
    public static extern void Change(string jsonData);


    public void OnChange(string jsonData)
    {
        var result = JsonConvert.DeserializeObject<T>(json);
    }
}
