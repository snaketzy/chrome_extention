# 前言
```
参考文档
https://developer.chrome.com/docs/extensions/reference/api/action?hl=zh-cn
https://github.com/GoogleChrome/chrome-extensions-samples
https://src.chromium.org/viewvc/chrome/trunk/src/chrome/common/extensions/docs/examples/howto/contentscript_xhr/

科学上网是前端开发人员的基本能力要求
```

# manifest.json【清单文件】
```
manifest_version: 以chrome 88为分水岭，之前是2，之后是3，整体manifest.json格式定义调整。某早期中文文档只说写2，估计没有深究过原因
https://developer.chrome.com/docs/extensions/reference/manifest?hl=zh-cn

version: 插件版本号，load 的时候会提示必填

action : 定义extension在Chrome Toolbar上的UI及点击操作
https://developer.chrome.com/docs/extensions/reference/api/action?hl=zh-cn

background: 官方定义的插件载入时运行的后台脚本，通过web worker运行

content_scripts: 打开特定网页时，注入指定的js和css

permissions: 每个调用的api需要对应的权限，在api说明文档中列明，必填，否则load会报错,activeTab是个神奇的授权
https://developer.chrome.com/docs/extensions/develop/concepts/activeTab?hl=zh-cn

host_permissions: 主机权限，用于解决跨域请求的权限问题
https://developer.chrome.com/docs/extensions/develop/concepts/network-requests?hl=zh-cn

declarative_net_request: 修改或屏蔽网络请求用，以规则集的形式存在
https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest?hl=zh-cn
https://developer.chrome.com/docs/extensions/reference/api/declarativeNetRequest?hl=zh-cn#type-ResourceType
```

# 中文互联网资源滞后
```
全网最详细的谷歌插件开发小册
https://blog.csdn.net/qq_34998786/article/details/131388792
230625发布的手册，遵循的是manifest_version为2的规范。
```