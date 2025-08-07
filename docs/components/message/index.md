# Message 消息提示

<script setup lang="ts">
import DemoContent from './demo-content.vue'
import DemoType from './demo-type.vue'
import DemoDuration from './demo-duration.vue'
import DemoKeepAliveOnHover from './demo-keep-alive-on-hover.vue'
import DemoChangetype from './demo-changetype.vue'
import DemoPlacement from './demo-placement.vue'
</script>

<yy-p>用于全局展示操作反馈信息 支持多种类型, 持续时间, 内容自定义等</yy-p>

<yy-p>建议在使用内置的 <yy-text code>messageWithInstall</yy-text> 全局注册这个组件, 这样 <yy-text code>Message</yy-text> 就可以获取正确的实例</yy-p>

<yy-p>在以后的迭代中会在 <yy-text code>config-provider</yy-text> 中进行全局配置, 也会考虑将 <yy-text code>Message</yy-text> 代理到全局的 <yy-text code>$message</yy-text></yy-p>

<yy-p> <yy-text code>Message</yy-text> 通过 <yy-text code>render</yy-text> 并使用 <yy-text code>appendChild</yy-text> 的方式进行渲染, 并不在全局的组件树中, 因此它可能不能接收到祖先组件发送的 <yy-text code>provide</yy-text> 中的数据</yy-p>

## 内容

<yy-p>设置消息内容, 支持字符串或渲染函数</yy-p>

<DemoContent />

::: details 查看示例

<<< ./demo-content.vue

:::

## 消息的类型

<yy-p>第二个参数中的 <yy-text code>type</yy-text> 设置消息类型 可选值有 <yy-text code>success</yy-text> <yy-text code>warning</yy-text> <yy-text code>error</yy-text> <yy-text code>info</yy-text> <yy-text code>loading</yy-text></yy-p>

<DemoType />

::: details 查看示例

<<< ./demo-type.vue

:::

## 持续时间和手动关闭

<yy-p>第二个参数中的 <yy-text code>duration</yy-text> 设置消息持续显示的时间</yy-p>

<yy-p>设置消息持续显示的时间设为 0 则不会自动关闭</yy-p>

<DemoDuration />

::: details 查看示例

<<< ./demo-duration.vue

:::

## 显示状态

<yy-p>设置第二个参数中的 <yy-text code>keep-alive-on-hover</yy-text> 为 <yy-text code>true</yy-text> 可以在鼠标悬停时消息不消失</yy-p>

<DemoKeepAliveOnHover />

::: details 查看示例

<<< ./demo-keep-alive-on-hover.vue

:::

## 修改类型

<yy-p>你可以在任意时候修改创建的消息(虚拟dom同样适用)</yy-p>

<DemoChangetype />

::: details 查看示例

<<< ./demo-changetype.vue

:::

## 创建不同位置的消息

<yy-p>可以通过第二个参数的 <yy-text code>placement</yy-text> 属性选择消息出现的位置</yy-p>

<DemoPlacement />

::: details 查看示例

<<< ./demo-placement.vue

:::

## 上下文

<yy-p><yy-text code>useMessage</yy-text> 支持一个上下文参数, 如果你全局注册了它, 那么它将会自动获取全局上下文 </yy-p>

```ts
import { getCurrentInstance } from 'vue'
import { useMessage } from 'yui-vue'

const { appContext } = getCurrentInstance()

useMessage(appContext)
```

## API

| 参数             | 说明             | 类型                                                     | 默认值 |
| ---------------- | ---------------- | -------------------------------------------------------- | ------ |
| id               | 消息唯一标识     | string                                                   | -      |
| content          | 消息内容         | string \| () => VNodeChild                               | ''     |
| type             | 消息类型         | 'success' \| 'warning' \| 'error' \| 'info' \| 'loading' | -      |
| duration         | 持续时间（毫秒） | number                                                   | 3000   |
| keepAliveOnHover | 鼠标悬停时不消失 | boolean                                                  | -      |
| placement        | 显示位置         | DefaultPlacement                                         | 'top'  |
