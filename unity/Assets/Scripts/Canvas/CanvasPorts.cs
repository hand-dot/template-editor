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
        Debug.Log(JsonUtility.ToJson(ActiveTemplate));
        OnChangeTemplate(JsonUtility.ToJson(ActiveTemplate));
    }
}
