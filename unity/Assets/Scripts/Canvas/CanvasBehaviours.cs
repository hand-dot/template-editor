using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
using System;
using UnityEngine.EventSystems;

public partial class CanvasBehaviours : MonoBehaviour
{
    public GameObject reactiveInputPrefab;
    public List<Texture2D> mouseTextures;
    private bool IsGrabbingActive { get; set; }

    private Vector3 grabbingStartPos;
    enum MouseButton
    {
        left = 0,
        middle = 1,
        right = 2
    }

    private void Start()
    {
        //Initialize the cursor
        //Cursor.SetCursor(FlipTexture(mouseTextures[0], false), new Vector2(10, 10), CursorMode.Auto);
        //OnTemplateChange("{\"templateName\": \"\",\"image\": null,\"pageSize\": {\"width\": 210,\"height\": 297},\"fontName\": \"NotoSansCJKjp\",\"fields\":  []}");
    }

    // Update is called once per frame
    void Update()
    {
        OnZoom();
        OnGrab();
    }

    private void OnZoom()
    {
        if (Math.Abs(Input.mouseScrollDelta.y) > 0.001)
        {
            float scale = 10.0f;
            float lowerLimit = 100f;
            float upperLimit = 1500f;
            Camera.main.ResizeCamera(Input.mouseScrollDelta, scale, upperLimit, lowerLimit);
        }
    }

    private void OnGrab()
    {
        if (IsGrabbingActive && Input.GetMouseButton((int)MouseButton.left))
        {
            Vector3 mouseWorldPos = Camera.main.ScreenToWorldPoint(Input.mousePosition);
            Vector3 grabbingStartWorldPos = Camera.main.ScreenToWorldPoint(grabbingStartPos);
            Camera.main.MoveCamera(grabbingStartWorldPos - mouseWorldPos);
            grabbingStartPos = Input.mousePosition;
        }
        else
        {
            grabbingStartPos = Input.mousePosition;
        }
    }

    public void OnCreateElement()
    {
        //var obj = Instantiate(reactiveInputPrefab, Vector3.zero, Quaternion.identity);
        //obj.transform.parent = transform;
    }

    public void SetGrabCanvas()
    {
        IsGrabbingActive = !IsGrabbingActive;
        //if (!IsGrabbingActive) { Cursor.SetCursor(FlipTexture(mouseTextures[0], false), new Vector2(10, 10), CursorMode.Auto); }
        //else { Cursor.SetCursor(FlipTexture(mouseTextures[1], false), new Vector2(10, 10), CursorMode.Auto); }
    }


    Texture2D FlipTexture(Texture2D original, bool upSideDown = true)
    {
        Texture2D flipped = new Texture2D(original.width, original.height);
        int xN = original.width;
        int yN = original.height;

        for (int i = 0; i < xN; i++)
        {
            for (int j = 0; j < yN; j++)
            {
                if (upSideDown)
                {
                    flipped.SetPixel(j, xN - i - 1, original.GetPixel(j, i));
                }
                else
                {
                    flipped.SetPixel(xN - i - 1, j, original.GetPixel(i, j));
                }
            }
        }
        flipped.Apply();
        return flipped;
    }
}


/// <summary>
/// Small helper class to convert viewport, screen or world positions to canvas space.
/// Only works with screen space canvases.
/// Usage:
/// objectOnCanvasRectTransform.anchoredPosition = specificCanvas.WorldToCanvasPoint(worldspaceTransform.position);
/// </summary>
public static class CanvasPositioningExtensions
{
    public static Vector3 WorldToCanvasPosition(this Canvas canvas, Vector3 worldPosition, Camera camera = null)
    {
        if (camera == null)
        {
            camera = Camera.main;
        }
        var viewportPosition = camera.WorldToViewportPoint(worldPosition);
        return canvas.ViewportToCanvasPosition(viewportPosition);
    }

    public static Vector3 ScreenToCanvasPosition(this Canvas canvas, Vector3 screenPosition)
    {
        var viewportPosition = new Vector3(screenPosition.x / Screen.width,
                                           screenPosition.y / Screen.height,
                                           0);
        return canvas.ViewportToCanvasPosition(viewportPosition);
    }

    public static Vector3 ViewportToCanvasPosition(this Canvas canvas, Vector3 viewportPosition)
    {
        var centerBasedViewPortPosition = viewportPosition - new Vector3(0.5f, 0.5f, 0);
        var canvasRect = canvas.GetComponent<RectTransform>();
        var scale = canvasRect.sizeDelta;
        return Vector3.Scale(centerBasedViewPortPosition, scale);
    }
}
