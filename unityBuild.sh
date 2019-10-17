#!/bin/bash

CURRENT_DIR=`pwd`
UNITY_APP_PATH=/Applications/Unity/Hub/Editor/2019.2.9f1/Unity.app/Contents/MacOS/Unity
UNITY_PROJECT_PATH="$CURRENT_DIR/unity"
UNITY_BUILDE_NAME=Builder.Build
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
echo "success!!"
exit 0