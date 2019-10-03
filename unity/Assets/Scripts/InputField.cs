using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class InputField : MonoBehaviour, IPointerDownHandler, IPointerUpHandler
{
    enum MouseButton
    {
        left = 0,
        middle = 1,
        right = 2
    }

    public GameObject wrapperObject;
    public bool IsPointerDown { get; set; }
    public Vector3 mouseOffset = Vector3.zero;

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
        MoveWrapperObject();
    }

    public void MoveWrapperObject()
    {
        if (IsPointerDown)
        {
            Vector3 mouseWorldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            Vector3 mouseOffseWorldPos = Camera.main.ScreenToWorldPoint(mouseOffset);
            Vector3 size = wrapperObject.GetComponent<RectTransform>().sizeDelta / 2;

            if ((mouseWorldPos.x > (mouseOffseWorldPos - size).x && mouseWorldPos.x < (size + mouseOffseWorldPos).x) &&
                (mouseWorldPos.y > (mouseOffseWorldPos - size).y && mouseWorldPos.y < (size + mouseOffseWorldPos).y)
               )
            {
                return;
            }
            wrapperObject.transform.position = Vector3.Lerp(wrapperObject.transform.position, mouseWorldPos, 15 * Time.deltaTime);
        }
    }

    public void OnPointerDown(PointerEventData eventData)
    {
        mouseOffset = Input.mousePosition;
        IsPointerDown = true;
    }

    public void OnPointerUp(PointerEventData eventData) => IsPointerDown = false;

}
