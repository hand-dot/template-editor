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
        FireOnChangeTemplate();
    }

    public void FireOnChangeTemplate()
    {
        Debug.Log(JsonUtility.ToJson(ActiveTemplate));
#if !UNITY_EDITOR && UNITY_WEBGL
        OnChangeTemplate(JsonUtility.ToJson(ActiveTemplate));
#endif
    }

    public void FieldAdd()
    {
        GameObject inputField = InstantiateField();
        Field baseField = new Field("text");
        inputField.name = baseField.id;
        ActiveTemplate.fields.Add(baseField);
        //Debug.Log(JsonUtility.ToJson(ActiveTemplate));
        //ActiveTemplate.GetType() == typeof(TextField);
        FireOnChangeTemplate();
    }

    public void FieldRemove(string id)
    {
        Field targetField = ActiveTemplate.fields.Find(field => field.id == id);
        if (targetField != null)
        {
            Destroy(GameObject.Find(id));
            ActiveTemplate.fields.Remove(targetField);
        }
        FireOnChangeTemplate();
    }


    [System.Serializable]
    private class CanvasFocus
    {
        public bool hasFocus;
    }
    public void FocusCanvas(string json)
    {
        CanvasFocus canvas = JsonUtility.FromJson<CanvasFocus>(json);
#if !UNITY_EDITOR && UNITY_WEBGL
        WebGLInput.captureAllKeyboardInput = canvas.hasFocus;
#endif
    }
}

