using UnityEngine;
using System.Runtime.InteropServices;
using System;

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
        try
        {
            ActiveTemplate = JsonUtility.FromJson<Template>(json);
            FireOnChangeTemplate();
        }
        catch (Exception ex)
        {
            Debug.LogError("ChangeTemplate: " + ex.ToString());
        }
    }

    public void FireOnChangeTemplate()
    {
        try
        {
#if !UNITY_EDITOR && UNITY_WEBGL
        OnChangeTemplate(JsonUtility.ToJson(ActiveTemplate));
#endif
        }
        catch (Exception ex)
        {
            Debug.LogError("FireOnChangeTemplate: " + ex.ToString());
        }
    }

    public void FireOnChangeField(string fieldId)
    {
        try
        {
            Field targetField = ActiveTemplate.fields.Find(field => field.id == fieldId);
#if !UNITY_EDITOR && UNITY_WEBGL
        OnChangeField(JsonUtility.ToJson(targetField));
#endif
        }
        catch (Exception ex)
        {
            Debug.LogError("FireOnChangeField: " + ex.ToString());
        }
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
        try
        {
            Destroy(GameObject.Find(id));
            ActiveTemplate.fields.Remove(targetField);
            FireOnChangeTemplate();
        }
        catch (Exception ex)
        {
            Debug.LogError("Field not found: " + id + " " + ex.ToString());
        }
    }

    public void FieldChange(string jsonField)
    {
        Field parsedField = JsonUtility.FromJson<Field>(jsonField);
        int index = ActiveTemplate.fields.FindIndex(field => field.id == parsedField.id);
        RectTransform sheetTransform = (UnityEngine.RectTransform)gameObject.transform.Find("Sheet");
        RectTransform fieldTransf = (RectTransform)sheetTransform.Find(ActiveTemplate.fields[index].id);
        try
        {
            fieldTransf.name = parsedField.id;
            fieldTransf.GetComponentInChildren<UnityEngine.UI.InputField>().text = parsedField.sampleData;
            fieldTransf.sizeDelta = new Vector2(parsedField.size.width * widthFactor, parsedField.size.height * heightFactor);
            fieldTransf.position = new Vector3(
                (parsedField.position.x + parsedField.size.width / 2.0f  - ActiveTemplate.size.width / 2.0f) * widthFactor,
                (ActiveTemplate.size.height - (parsedField.position.y + parsedField.size.height / 2.0f  + ActiveTemplate.size.height / 2.0f)) * heightFactor,
                fieldTransf.position.z);
            ActiveTemplate.fields[index] = parsedField;
            FireOnChangeField(parsedField.id);
        }
        catch (Exception ex)
        {
            Debug.LogError("Field not found: " + parsedField.id + " " + ex.ToString());
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

