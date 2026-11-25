# LDStatus Pro

本仓库是 LDStatus Pro 的 fork。原版功能和使用文档请见[原仓库 caigg188/LDStatusPro](https://github.com/caigg188/LDStatusPro)。

### v3.9.0.12

本 fork 基于此版本新增了**自动阅读帖子回复**功能，代码在[自动阅读分支](https://github.com/Jayczee/LDStatusPro/tree/feat/topic-reply-reader)。打开帖子后，脚本会在后台逐条读取回复。你可以照常滚动、选中文字或写回复。面板显示后台进度，默认每 30 秒读一条，可选 10、20、30 或 60 秒，也可随时暂停。速度设置会自动保存。面板记录的是本地读取进度，论坛已读状态由站点自行统计。
