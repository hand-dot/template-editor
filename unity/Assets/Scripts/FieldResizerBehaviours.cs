using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class FieldResizerBehaviours : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    public bool IsPointerDown { get; set; }
    public Vector3 mouseOffset = Vector3.zero;
    public GameObject canvas;
    public GameObject wrapperObject;

    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
    }

    void LateUpdate()
    {
        if (IsPointerDown)
        {

            wrapperObject.GetComponent<RectTransform>().sizeDelta =
                wrapperObject.CalculateSizeDelta(Input.mousePosition, mouseOffset);
        }
    }
    public void OnPointerDown(PointerEventData eventData)
    {
        mouseOffset = Input.mousePosition;
        IsPointerDown = true;
    }

    public void OnPointerUp(PointerEventData eventData) => IsPointerDown = false;

}

public static class GameObjectFollower
{
    public static Vector2 CalculateSizeDelta(this GameObject gameObject, Vector3 mousePos, Vector3 mouseOffset)
    {
        Vector3 gameObjectRectPos = gameObject.GetComponent<RectTransform>().position;
        Vector3 mouseWorldPointPos = Camera.main.ScreenToWorldPoint(mousePos);
        Vector3 mouseOffsetWorldPointPos = Camera.main.ScreenToWorldPoint(mouseOffset);
        return new Vector2(mouseWorldPointPos.x * 2 - gameObjectRectPos.x * 2, -mouseWorldPointPos.y * 2 + gameObjectRectPos.y * 2);
    }
}