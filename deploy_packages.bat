@echo off
setlocal EnableDelayedExpansion
echo ***************************************************************************
echo      deploy_packages.bat
echo                     by niuren.zhu
echo                           2017.09.06
echo  ˵����
echo     1. ����jar����maven�ֿ⡣
echo     2. ��setting.xml��^<servers^>�ڵ�����ӣ������û�����������Ҫ�����Ա���룩
echo           ^<server^>
echo             ^<id^>ibas-maven^<^/id^>
echo             ^<username^>�û���^<^/username^>
echo             ^<password^>����^<^/password^>
echo           ^<^/server^>
echo ****************************************************************************
rem ���ò�������
set WORK_FOLDER=%~dp0
rem �ֿ����ַ
set ROOT_URL=http://maven.colorcoding.org/repository/
rem �ֿ�����
set REPOSITORY=%1
rem ����Ĭ�ϲֿ�����
if "%REPOSITORY%"=="" set REPOSITORY=maven-releases
set REPOSITORY_URL=%ROOT_URL%%REPOSITORY%
set REPOSITORY_ID=ibas-maven

echo --���maven���л���
call mvn -v >nul || goto :CHECK_MAVEN_FAILD

echo --������ַ��%REPOSITORY_URL%
rem ��������
if exist %WORK_FOLDER%\pom.xml (
  call mvn deploy:deploy-file ^
    -Dfile=%WORK_FOLDER%\pom.xml ^
    -DpomFile=%WORK_FOLDER%\pom.xml ^
    -Durl=%REPOSITORY_URL% ^
    -DrepositoryId=%REPOSITORY_ID% ^
    -Dpackaging=pom
)
rem ��������
for /f %%m in (%WORKFOLDER%compile_order.txt) do (
  if exist %WORK_FOLDER%%%m\pom.xml (
    for /f %%l in ('dir /s /a /b %WORK_FOLDER%release\%%m-*.jar' ) do (
      call mvn deploy:deploy-file ^
        -Dfile=%%l ^
        -DpomFile=%WORK_FOLDER%%%m\pom.xml ^
        -Durl=%REPOSITORY_URL% ^
        -DrepositoryId=%REPOSITORY_ID% ^
        -Dpackaging=jar
      )
    )
  )
)
rem ��������
if exist %WORK_FOLDER%\btulz.transforms.b1\pom.xml (
  call mvn deploy:deploy-file ^
    -Dfile=%WORK_FOLDER%\btulz.transforms.b1\pom.xml ^
    -DpomFile=%WORK_FOLDER%\btulz.transforms.b1\pom.xml ^
    -Durl=%REPOSITORY_URL% ^
    -DrepositoryId=%REPOSITORY_ID% ^
    -Dpackaging=pom
)
rem ��������
set FILE_POM=btulz.transforms.b1\pom.b188.xml
set FILE_JAR=btulz.transforms.b1-0.1.0-8.8.jar
if exist %WORK_FOLDER%%FILE_POM% (
  if exist %WORK_FOLDER%release\%FILE_JAR% (
    call mvn deploy:deploy-file ^
      -Dfile=%WORK_FOLDER%release\%FILE_JAR% ^
      -DpomFile=%WORK_FOLDER%%FILE_POM% ^
      -Durl=%REPOSITORY_URL% ^
      -DrepositoryId=%REPOSITORY_ID% ^
      -Dpackaging=jar
    )
  )
)
set FILE_POM=btulz.transforms.b1\pom.b191.xml
set FILE_JAR=btulz.transforms.b1-0.1.0-9.1.jar
if exist %WORK_FOLDER%%FILE_POM% (
  if exist %WORK_FOLDER%release\%FILE_JAR% (
    call mvn deploy:deploy-file ^
      -Dfile=%WORK_FOLDER%release\%FILE_JAR% ^
      -DpomFile=%WORK_FOLDER%%FILE_POM% ^
      -Durl=%REPOSITORY_URL% ^
      -DrepositoryId=%REPOSITORY_ID% ^
      -Dpackaging=jar
    )
  )
)
set FILE_POM=btulz.transforms.b1\pom.b192.xml
set FILE_JAR=btulz.transforms.b1-0.1.0-9.2.jar
if exist %WORK_FOLDER%%FILE_POM% (
  if exist %WORK_FOLDER%release\%FILE_JAR% (
    call mvn deploy:deploy-file ^
      -Dfile=%WORK_FOLDER%release\%FILE_JAR% ^
      -DpomFile=%WORK_FOLDER%%FILE_POM% ^
      -Durl=%REPOSITORY_URL% ^
      -DrepositoryId=%REPOSITORY_ID% ^
      -Dpackaging=jar
    )
  )
)
set FILE_POM=btulz.transforms.b1\pom.b193.xml
set FILE_JAR=btulz.transforms.b1-0.1.0-9.3.jar
if exist %WORK_FOLDER%%FILE_POM% (
  if exist %WORK_FOLDER%release\%FILE_JAR% (
    call mvn deploy:deploy-file ^
      -Dfile=%WORK_FOLDER%release\%FILE_JAR% ^
      -DpomFile=%WORK_FOLDER%%FILE_POM% ^
      -Durl=%REPOSITORY_URL% ^
      -DrepositoryId=%REPOSITORY_ID% ^
      -Dpackaging=jar
    )
  )
)
set FILE_POM=btulz.transforms.b1\pom.b110.xml
set FILE_JAR=btulz.transforms.b1-0.1.0-10.jar
if exist %WORK_FOLDER%%FILE_POM% (
  if exist %WORK_FOLDER%release\%FILE_JAR% (
    call mvn deploy:deploy-file ^
      -Dfile=%WORK_FOLDER%release\%FILE_JAR% ^
      -DpomFile=%WORK_FOLDER%%FILE_POM% ^
      -Durl=%REPOSITORY_URL% ^
      -DrepositoryId=%REPOSITORY_ID% ^
      -Dpackaging=jar
    )
  )
)
rem �������߰�����
if exist %WORK_FOLDER%\release\btulz.transforms.tar (
  call mvn deploy:deploy-file ^
    -DgroupId=org.colorcoding.tools ^
    -DartifactId=btulz.transforms ^
    -Durl=%REPOSITORY_URL% ^
    -DrepositoryId=%REPOSITORY_ID% ^
    -Dfile=%WORK_FOLDER%\release\btulz.transforms.tar ^
    -Dpackaging=tar ^
    -Dversion=b1-latest
)
echo --�������

goto :EOF
rem ********************************����Ϊ����************************************
:CHECK_MAVEN_FAILD
echo û�м�⵽MAVEN���밴�����²�����
echo 1. �Ƿ�װ�����ص�ַ��http://maven.apache.org/download.cgi
echo 2. �Ƿ����õ�PATH���������ú���Ҫ����
echo 3. ����mvn -v��������Ƿ�ɹ�
goto :EOF