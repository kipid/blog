#!/bin/sh
# folder : /Users/kipid/Documents/Github/iris-docu/
# chmod 755 test.sh
# ./test.sh "abc   def"   classic
MY_MESSAGE="Hello   \"\"   World"  # This is a comment.
echo $MY_MESSAGE
echo "$MY_MESSAGE   Hello?"
echo ${MY_MESSAGE}   Hello?
echo "${MY_MESSAGE}   Hello?"
echo $MY_MESSAGE_something_right_next
echo ${MY_MESSAGE}_something_right_next   Hello?
echo "${MY_MESSAGE}_something_right_next   Hello?"

echo "I was called with $# parameters"
echo "My name is $0"
echo "My first parameter is $1"
echo "My second parameter is $2"
echo "All parameters are $@"
echo "All parameters are $*"
echo "The exit status of the last command executed. :" $?
echo "The process number of the current shell. (PID) :" $$
echo "The process number of the last background command. :" $!

for TOKEN in $*
do
  echo $TOKEN
done

echo "A quote is \", backslash is \\, backtick is \`."
X=5
echo "A few spaces are    ; dollar is \$. \$X is ${X}."

STR="kipid/hello/Some"
echo ${STR//\//.}  # kipid.hello.Some
# result_string="${original_string//Suzi/$string_to_replace_Su‌​zi_with}" (that is, use // rather than / between original_string and Suzi).

echo PATH $PATH  # /usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin
echo CLASSPATH $CLASSPATH  # Empty?
echo PWD  # Print Working Directory
echo $PWD  # /Users/kipid/Documents/Github/iris-docu
echo `PWD`  # /Users/kipid/Documents/Github/iris-docu
echo $(dirname $0)  # .
echo $(dirname $PWD)  # /Users/kipid/Documents/Github
echo `dirname $PWD`  # /Users/kipid/Documents/Github
echo $(dirname $(dirname $PWD))  # /Users/kipid/Documents
echo $(dirname $(dirname $(dirname $PWD)))  # /Users/kipid

cd ..
echo $PWD  # /Users/kipid/Documents/Github
echo ${PWD##*/}  # Github
echo $(basename $PWD)  # Github
echo `basename $PWD`  # Github

cd /Users/kipid
echo $PWD  # /Users/kipid
echo ${PWD##*/}  # kipid

cd /Users/kipid/Documents/Github/iris-docu/sources/kipid/hello
echo $PWD
CURR_DIR=$PWD
PACKAGE=""
while [ "$CURR_DIR" != "/" ]; do
  CURR_BASE=`basename $CURR_DIR`
  if [ "$CURR_BASE" == "sources" ]; then
    break
  fi
  PACKAGE=${CURR_BASE}.${PACKAGE}
  CURR_DIR=`dirname $CURR_DIR`
  echo $CURR_DIR
done
echo `dirname $CURR_DIR`/classes
echo $PACKAGE
echo ${PACKAGE//./\/}

# Automatically back to the original working directory.