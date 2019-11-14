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
        FireChangeTempalte();
    }

    public void FireChangeTempalte()
    {
#if !UNITY_EDITOR && UNITY_WEBGL
        OnChangeTemplate(JsonUtility.ToJson(ActiveTemplate));
#endif
    }

    public void FieldAdd()
    {
        GameObject inputField = Instantiate(reactiveInputPrefab, Vector3.zero, Quaternion.identity);
        inputField.transform.parent = transform.Find("Sheet");
        Field baseField = new Field("text");
        inputField.name = baseField.id;
        ActiveTemplate.fields.Add(baseField);
        //Debug.Log(JsonUtility.ToJson(ActiveTemplate));
        //ActiveTemplate.GetType() == typeof(TextField);
        FireChangeTempalte();
    }

    public void FieldRemove(string id)
    {
        Field targetField = ActiveTemplate.fields.Find(field => field.id == id);
        if (targetField != null)
        {
            Destroy(GameObject.Find(id));
            ActiveTemplate.fields.Remove(targetField);
        }
        FireChangeTempalte();
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

