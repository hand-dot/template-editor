#!/bin/bash

CURRENT_DIR=`pwd`
UNITY_APP_PATH=/Applications/Unity/Hub/Editor/2019.2.9f1/Unity.app/Contents/MacOS/Unity
UNITY_PROJECT_PATH="$CURRENT_DIR/unity"
UNITY_BUILDE_NAME=WebGLBuilder.build
UNITY_LOG_PATH="$CURRENT_DIR/build.log"

$UNITY_APP_PATH -batchmode \
    -quit \
    -projectPath $UNITY_PROJECT_PATH \
    -executeMethod $UNITY_BUILDE_NAME \
    -logfile $UNITY_LOG_PATH

if [ $? -eq 1 ]; then
    echo "error!! check logfile: ${UNITY_LOG_PATH}"
    exit 1
fi

rm -rf public/Build
rm -rf public/TemplateData
mv -f unity/WebGL-Dist/Build public/
mv -f unity/WebGL-Dist/TemplateData public/
rm -rf unity/WebGL-Dist

echo "success!!"
exit 0