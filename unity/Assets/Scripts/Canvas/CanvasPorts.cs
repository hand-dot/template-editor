using UnityEngine;
using System.Runtime.InteropServices;

public partial class CanvasBehaviours : MonoBehaviour
{
    [DllImport("__Internal")]
    public static extern void OnChangeTemplate(string jsonData);

    [DllImport("__Internal")]
    public static extern void OnChangeField(string jsonData);

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

    public void FireOnChangeField(string fieldId)
    {
        Field targetField = ActiveTemplate.fields.Find(field => field.id == fieldId);
        Debug.Log(JsonUtility.ToJson(targetField) + fieldId);
#if !UNITY_EDITOR && UNITY_WEBGL
        OnChangeField(JsonUtility.ToJson(targetField));
#endif
    }

    public void FieldAdd()
    {
        GameObject inputFieldGameObj = InstantiateField();
        Field baseField = new Field("text");
        inputFieldGameObj.name = baseField.id;
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

    public void FieldChange(string jsonField)
    {
        float widthFactor = 2480 / 210f;
        float heightFactor = 3508 / 297f;
        Field parsedField = JsonUtility.FromJson<Field>(jsonField);
        int index = ActiveTemplate.fields.FindIndex(field => field.id == parsedField.id);
        RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
        RectTransform fieldTransf = (RectTransform)sheetTransform.Find(ActiveTemplate.fields[index].id);
        if (index > 0 && fieldTransf)
        {
            fieldTransf.name = parsedField.name;
            fieldTransf.GetComponentInChildren<UnityEngine.UI.InputField>().text = fieldTransf.GetComponentInChildren<UnityEngine.UI.InputField>().text;
            fieldTransf.sizeDelta = new Vector2(parsedField.size.width * widthFactor, parsedField.size.height * heightFactor);
            fieldTransf.position = new Vector3(parsedField.position.x, parsedField.position.y, fieldTransf.position.z);
            FireOnChangeField(parsedField.name);
        } else
        {
            Debug.Log("Field not found");
        }
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

