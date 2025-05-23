#!/bin/sh
echo '****************************************************************************'
echo '             compile_packages.sh                                            '
echo '                      by niuren.zhu                                         '
echo '                           2016.06.17                                       '
echo '  说明：                                                                     '
echo '    1. 下载apache-maven，地址http://maven.apache.org/download.cgi。           '
echo '    2. 解压apache-maven，并设置系统变量MAVEN_HOME为解压的程序目录。               '
echo '    3. 添加PATH变量到MAVEN_HOME\bin，并检查JAVE_HOME配置是否正确。               '
echo '    4. 运行提示符运行mvn -v 检查安装是否成功。                                   '
echo '    5. 此脚本会遍历当前目录的子目录，查找pom.xml并编译jar包到release目录。          '
echo '    6. 可在compile_order.txt文件中调整编译顺序。                                '
echo '****************************************************************************'
# 设置参数变量
cd $(dirname $0)
WORK_FOLDER=${PWD}

echo --当前工作的目录是[${WORK_FOLDER}]
echo --检查编译顺序文件[compile_order.txt]
if [ ! -e ${WORK_FOLDER}/compile_order.txt ]; then
  ls -l | awk '/^d/{print $NF}' >${WORK_FOLDER}/compile_order.txt
fi

echo --清除项目缓存
if [ -e ${WORK_FOLDER}/release/ ]; then
  rm -rf ${WORK_FOLDER}/release/
fi
mkdir -p ${WORK_FOLDER}/release/
if [ -e ${WORK_FOLDER}/pom.xml ]; then
  mvn -q clean install -f ${WORK_FOLDER}/pom.xml
fi

echo --开始编译[compile_order.txt]内容
while read line; do
  if [ -e ${WORK_FOLDER}/${line}/pom.xml ]; then
    isService=$(echo ${line} | grep '.service$' | wc -l)
    if [ ${isService} != 0 ]; then
      # 网站，编译war包
      echo --开始编译[${line}]
      mvn -q clean package -Dmaven.test.skip=true -f ${WORK_FOLDER}/${line}/pom.xml

      if [ -n "$(ls ${WORK_FOLDER}/${line}/target/*.war 2>/dev/null)" ]; then
        cp -r ${WORK_FOLDER}/${line}/target/*.war ${WORK_FOLDER}/release
      fi
    else
      # 非网站，编译jar包并安装到本地
      echo --开始编译[${line}]+安装
      mvn -q clean package install -Dmaven.test.skip=true -f ${WORK_FOLDER}/${line}/pom.xml

      if [ -n "$(ls ${WORK_FOLDER}/${line}/target/*.jar 2>/dev/null)" ]; then
        cp -r ${WORK_FOLDER}/${line}/target/*.jar ${WORK_FOLDER}/release
      fi
    fi
    # 检查编译结果
    if [ -n "$(ls ${WORK_FOLDER}/release/${line}*.* 2>/dev/null)" ]; then
      echo --编译[${line}]成功
    else
      echo --编译[${line}]失败
    fi
  fi
done <${WORK_FOLDER}/compile_order.txt | sed 's/\r//g'

echo --开始编译额外内容
mvn -q clean install -f ${WORK_FOLDER}/btulz.transforms.b1/pom.xml
# complie b1 8.8
mvn -q clean package install -Dmaven.test.skip=true -f ${WORK_FOLDER}/btulz.transforms.b1/pom.b188.xml
if [ -n "$(ls ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar 2>/dev/null)" ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar ${WORK_FOLDER}/release
fi
if [ -e ${WORK_FOLDER}/btulz.transforms.b1/target/lib/ ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/lib/* ${WORK_FOLDER}/release
fi
# complie b1 9.1
mvn -q clean package install -Dmaven.test.skip=true -f ${WORK_FOLDER}/btulz.transforms.b1/pom.b191.xml
if [ -n "$(ls ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar 2>/dev/null)" ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar ${WORK_FOLDER}/release
fi
if [ -e ${WORK_FOLDER}/btulz.transforms.b1/target/lib/ ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/lib/* ${WORK_FOLDER}/release
fi
# complie b1 9.2
mvn -q clean package install -Dmaven.test.skip=true -f ${WORK_FOLDER}/btulz.transforms.b1/pom.b192.xml
if [ -n "$(ls ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar 2>/dev/null)" ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar ${WORK_FOLDER}/release
fi
if [ -e ${WORK_FOLDER}/btulz.transforms.b1/target/lib/ ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/lib/* ${WORK_FOLDER}/release
fi
# complie b1 9.3
mvn -q clean package install -Dmaven.test.skip=true -f ${WORK_FOLDER}/btulz.transforms.b1/pom.b193.xml
if [ -n "$(ls ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar 2>/dev/null)" ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar ${WORK_FOLDER}/release
fi
if [ -e ${WORK_FOLDER}/btulz.transforms.b1/target/lib/ ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/lib/* ${WORK_FOLDER}/release
fi
# complie b1 10
mvn -q clean package install -Dmaven.test.skip=true -f ${WORK_FOLDER}/btulz.transforms.b1/pom.b110.xml
if [ -n "$(ls ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar 2>/dev/null)" ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/btulz.transforms.b1-*.jar ${WORK_FOLDER}/release
fi
if [ -e ${WORK_FOLDER}/btulz.transforms.b1/target/lib/ ]; then
  cp -r ${WORK_FOLDER}/btulz.transforms.b1/target/lib/* ${WORK_FOLDER}/release
fi

echo --输出直接调用shell脚本
cp -r ${WORK_FOLDER}/btulz.transforms.b1/src/main/commands/btulz.shell.sh.txt ${WORK_FOLDER}/release/btulz.shell.sh
cp -r ${WORK_FOLDER}/btulz.transforms.b1/src/main/commands/btulz.shell.bat.txt ${WORK_FOLDER}/release/btulz.shell.bat
chmod 777 ${WORK_FOLDER}/release/btulz.shell.sh
echo --压缩编译文件为tar包
if [ -e ${WORK_FOLDER}/release ]; then
  cd ${WORK_FOLDER}/release/
  tar --exclude='*-sources.jar' -cvf btulz.transforms.tar *.jar btulz.shell.*
fi
cd ${WORK_FOLDER}

echo --编译完成
