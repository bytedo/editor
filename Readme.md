## @bytedo/editor
> 定制版的前端最小化代码编辑器, 代码minify之后,仅`400KB`, 基于`CodeMirror 6.0`,提供`html, css, js, vue`的语法高亮和最基本的键盘快捷键。


### 用法

```js
// 或者从CDN地址中获取
import { EditorView, minimalSetup, vue, js, css, html } from '@bytedo/editor'


let view = new EditorView({
  doc: '', //默认显示的代码,
  extensions: minimalSetup(vue()), // 需要高亮什么文件, 就传什么进去
  parent: document.body // 创建的编辑器实例, 被包裹在哪个节点上
})


console.log(view.state.doc.toString())  // 获取编辑器的代码

```

### 支持的键盘快捷键

- `Alt + Left/Right` 将光标按单词边界移动
- `Alt + Up/Down` 将当前行代码与`上一行/下一行`互换
- `Alt + Shift + Up/Down` 将当前行代码在`上一行/下一行`中复制一份, 并将光标移动到`上一行/下一行`
- `Alt + l` (在`macos`中是`Ctrl + l`) 选中当前行
- `Alt + i` (在`macos`中是`Ctrl + i`) 按单词边界选中内容, 连续按则父级的块作用域选中
- `Alt + /` (在`macos`中是`Ctrl + /`) 注释当前行
- `Ctrl + Shift + k` (在`macos`中是`Cmd + Shift + k`) 删除当前行
- `Ctrl + Shift + \` (在`macos`中是`Cmd + Shift + \`) 在成对的符号前后移动光标
- `Tab`  增加缩进
- `Shift + Tab` 减少缩进
