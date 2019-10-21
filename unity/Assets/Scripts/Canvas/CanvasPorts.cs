using UnityEngine;
using System.Runtime.InteropServices;

public partial class CanvasBehaviours : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern void OnChangeTemplate(string jsonData);

    [DllImport("__Internal")]
    public static extern void OnInit();

    public void ChangeTemplate(string json)
    {
        ActiveTemplate = JsonUtility.FromJson<Template>(json);

#if !UNITY_EDITOR && UNITY_WEBGL
        OnChangeTemplate(JsonUtility.ToJson(ActiveTemplate));
#endif
    }

    public void FocusCanvas(string json)
    {
        CanvasFocus canvas = JsonUtility.FromJson<CanvasFocus>(json);
#if !UNITY_EDITOR && UNITY_WEBGL
        WebGLInput.captureAllKeyboardInput = canvas.hasFocus;
#endif
    }

    [System.Serializable]
    private class CanvasFocus
    {
        public bool hasFocus;
    }
}

