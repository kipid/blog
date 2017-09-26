#!/bin/sh
# folder : /Users/kipid/Documents/Github/iris-docu/
# chmod 755 runJava.sh
# cp runJava.sh /usr/local/bin/
FILE_BASE_NAME=$1
if [ -f "${FILE_BASE_NAME}.java" ]; then
  echo $PWD  # Print Working Directory.
  CURR_DIR=$PWD
  PACKAGE=""
  while [ "$CURR_DIR" != "/" ]; do
    CURR_BASE=`basename $CURR_DIR`
    if [ "$CURR_BASE" == "sources" ]; then
      break
    fi
    PACKAGE=${CURR_BASE}.${PACKAGE}
    CURR_DIR=`dirname $CURR_DIR`
  done
  D=`dirname $CURR_DIR`/classes
  CLASSPATH=/Library/Java/Extensions:/Library/Java/JavaVirtualMachines/jdk1.8.0_141.jdk/Contents/Home/jre/lib:/Users/kipid/Downloads/gson-2.8.1.jar:/Users/kipid/Downloads/guava-23.0.jar:/Users/kipid/Downloads/junit-4.12.jar:${D}
  echo "Compiling ${FILE_BASE_NAME}.java"
  javac ${FILE_BASE_NAME}.java -encoding utf8 -d ${D} -classpath ${CLASSPATH}
else
  echo "File ${FILE_BASE_NAME}.java does not exist."
fi
if [ $? == 0 ]; then
  cd $D
  CLASSFILE=./${PACKAGE//./\/}${FILE_BASE_NAME}
  if [ -f "${CLASSFILE}.class" ]; then
    echo "--- OUTPUT: ${PACKAGE}${FILE_BASE_NAME} $2 $3 $4 $5 $6 $7 $8 $9 ---"
    java -Dfile.encoding=UTF8 -classpath ${CLASSPATH} ${PACKAGE}${FILE_BASE_NAME} $2 $3 $4 $5 $6 $7 $8 $9
  else
    echo "File ${CLASSFILE}.class does not exist."
  fi
fi