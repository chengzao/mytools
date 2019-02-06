### travis

#### install 

- `gem install travis`

#### api

```
before_install
install
before_script
script
aftersuccess or afterfailure
[OPTIONAL] before_deploy
[OPTIONAL] deploy
[OPTIONAL] after_deploy
after_script
```

```
before_install：install 阶段之前执行
before_script：script 阶段之前执行
after_failure：script 阶段失败时执行
after_success：script 阶段成功时执行
before_deploy：deploy 步骤之前执行
after_deploy：deploy 步骤之后执行
after_script：script 阶段之后执行
```

#### url 

- [持续集成服务 Travis CI 教程](http://www.ruanyifeng.com/blog/2017/12/travis_ci_tutorial.html)