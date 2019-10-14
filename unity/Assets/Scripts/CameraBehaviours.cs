using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraBehaviours : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {

    }

    // Update is called once per frame
    void Update()
    {

    }
}


public static class CameraBehavioursExtension
{
    public static void MoveCamera(this Camera camera, Vector3 target, float speed = 999999999f)
    {
        camera.transform.position = Vector3.MoveTowards(camera.transform.position, camera.transform.position + target, speed * Time.deltaTime);
    }

    public static void ResizeCamera(this Camera camera, Vector3 scroll, float scale, float upperLimit, float lowerLimit)
    {
        float target = camera.orthographicSize + scroll.y * scale;
        Camera.main.orthographicSize = target > upperLimit
                             ? upperLimit
                             : target < lowerLimit
                             ? lowerLimit
                             : target;
    }
}
