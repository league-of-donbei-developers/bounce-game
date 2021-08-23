# bounce-game

- 一个弹球小游戏，灵感来自b站上较火的游戏‘弹弹球’。我们希望将这款简单有趣易上手的小游戏实现在浏览器端并实现多人对战模式，并添加更多丰富的道具。
- 目前由于时间紧张，我们仅设计并实现了单人模式及双人模式联机的小demo。后续还会进一步的完善

## demo展示

### 单人模式demo
![1%_416 H( VUZQ$9}_7E%9B](https://user-images.githubusercontent.com/61442002/130409676-2d7748d0-4fbd-486d-8934-c82bdba4ac58.jpg)
![U`ABD6N11WH(5D0AH(0N2L1](https://user-images.githubusercontent.com/61442002/130410538-557ddb76-07a0-416f-af7c-c0d4ab518575.jpg)


### 双人模式demo

![DB7BT@`45N}@) WAQ@CX9X2](https://user-images.githubusercontent.com/61442002/130408671-1d7fc068-ed60-4942-af7f-4ee07a33d5a9.jpg)



## 难点分析
- 高可扩展性的游戏逻辑设计实现
  - 便于多种道具效果的引入与实现
  - 便于多人联机实现
- 联机模式的通信问题
  - 通过什么样的方式，实现两个浏览器之间进行实时通信
- 联机状态下的性能与同步问题
  - 怎样保证双方在游戏过程中能够同步游戏状态且保证游戏性能  


## 游戏逻辑架构

### 初始方案

- 直接分别设计弹球，砖块，板块，道具等实体类，在每次游戏循环中计算碰撞及效果渲染。
- 这样的方案存在一个问题，计算和渲染过程耦合，不便于游戏功能的拓展，也不便于双人模式的实现。

### 优化方案

- 将游戏中的位置计算、状态改变及渲染三个步骤解耦。
- 将位置移动以及其他途径产生的会使游戏实体状态改变的行为抽象为事件。使用事件队列进行缓冲
- 将每一帧的行为抽象成三个步骤：计算位置并产生事件，处理事件，渲染
- 事件的来源可以是本地用户的操作，也可以是来自服务器转发的对方操作，可以借此实现联机互动

![image](https://user-images.githubusercontent.com/61442002/130063883-f6c28a07-5b1d-4bed-8afa-238d923c441d.png)

### class Game 

Game类是游戏的核心对象，包含：

- 游戏中的实体列表
  - 弹球列表
  - 砖块列表
  - 道具列表
  - 板块
  - 道具生效列表
  - 游戏事件队列

- 游戏中全局属性
  - 球加速倍率
  - 板加速倍率
  - 道具加速倍率
  - 得分
  - 分数倍率
  - 帧数计数

- 事件处理方法
  - 弹球消失
  - 砖块消失
  - 道具消失
  - 道具生效
  - 道具失效
  - 弹球转向
  - 键盘输入
  - 得分
  - 弹球改变所属方
  - ...
  
- 道具效果方法
  - 双倍得分激活
  - 双倍得分结束
  - 增加弹球
  - 立即分
  - 双倍球速激活
  - 双倍球速结束
  - 双倍板速激活
  - 双倍板速结束
  - 板长增加
  - 板长减小
  - ...

### 游戏循环
 
每一帧游戏循环，需经过以下步骤：
- 计算
  - 弹球，道具，板块的新位置
  - 弹球，道具，板块之间的碰撞（生成事件）
  - 查看道具效果列表，清除超时道具效果（生成事件）  
- 处理事件
  - 顺序处理事件队列中的所有事件，根据事件更新游戏实体属性
- 渲染
  - 清除上一帧画面  
  - 将新的游戏实体数据渲染到画面上



## 联机机制

- 使用websocket技术，经由服务端转发实现游戏同步
- 服务端采用nodejs编写，部署在云服务器上
- 双人模式游戏角色
  - host，代号1
  - guest，代号0
- 连接规则
  1. 浏览器向服务端发起websocket连接
  2. 输入房间名称和游戏昵称，发送消息1进行注册
  3. 若该房间名称已经被他人使用并配对成功，则注册失败，返回步骤2
  4. 若该房间名称无人使用，则注册成功，发送消息5，等待配对
  5. 若该房间名称已有一人注册，则注册成功，发送消息5且双方配对成功，随机双方身份并向双方发送消息4。
  6. 配对成功后，若一方连接关闭，则向对方发送消息6；对方继续占用房间回到步骤4，等待配对。在此期间，服务端不再处理任意一方的消息1，且任意一方消息2都会被直接处理为消息3转发给对方

- 通信约定(CLIENT/SERVER 表示该消息应由浏览器还是服务其发出)
  - CLIENT '1;房间名;昵称'
  - CLIENT '2;消息'
  - SERVER '3;消息'
  - SERVER '4;对方昵称;0/1'  (配对成功消息)
  - SERVER '5;'              (注册成功消息)
  - SERVER '6;'              (对方下线消息) 
  - SERVER '7;'              (注册失败消息)    
## 同步机制

### 失败方案
  - guest只需要传递其键盘输入信息
  - host接受guest方的操作，并承担逐帧计算的任务，在计算结束后，将整个游戏镜像传递给对方，双方进行渲染。
  - 失败原因：
    -  游戏镜像在60fps情况下传递数据存在明显延迟，会导致严重游戏不同步。 

### 现采取方案
  - 游戏开始时，由host端负责生成地图并初始化。之后将游戏镜像传递给guest，双方开始读秒进入游戏
  - 进入游戏后，双方浏览器各自独立进行游戏时间计算处理，画面渲染
  - 双方键盘输入事件，除在本机处理同时，转发给对方
  - 每间隔若干帧后，由host发起，将游戏该帧镜像转发给guest，对方接受后，根据该镜像修正或覆盖游戏数据完成同步     


## 游戏实体设计

### 游戏难度控制因素

- 板长
  - 初始长度
  - 最大长度
- 球速
- 道具概率
- 砖块血量
- 黑洞块数量


### 弹球

- 普通弹球
  - 普通弹球有伤害属性，当碰撞砖块时造成伤害并反弹
- 超级弹球
  - 超级弹球仅在碰撞墙壁、板块和墙块时反弹，碰撞砖块时直接打掉不改变方向。


### 砖块

- 砖块形状
  - 正方形
  - 长方形
- 砖块类型
  - 普通砖
    - 普通砖有血量属性，当血量将至0及以下时砖块消失
    - 血量范围1-6
  - 道具砖（待定）
    - 道具砖在被打碎后一定会产生道具
  - 陷阱砖（待定）
    - 弹球碰到陷阱砖后砖块消失，留下一个黑洞，之后弹球经过黑洞会消失
  - 墙壁砖
    - 墙壁砖是固定地形砖，碰撞后弹走小球，砖块不消失

### 板块

##### 操作方式

- pc端操作时使用方向键←→或a、d，控制板子左右移动。
- 移动端待定

##### 长度

- 上下限
  - 最短：
  - 最长：

##### 速度

- 移动方式是匀加速运动

- 板子有最大速度
- 加速度为最大速度/30,即30帧加满

##### 反弹

- 方案一
  - 板速为$v_b$
  - 接到球($v_x,v_y$)后，球速为:($v_x+v_b,-v_y$)
- 方案二
  - 撞击时重置球的水平速度，速度大小与撞击点据板中心距离正相关，垂直速度不变

##### 发球

- 小球初始水平速度为0，随机一个垂直速度

### 道具

道具由被打掉的砖块随机生成，生成后向玩家匀速掉落。玩家接住道具后，道具产生效果。

##### 具体道具

- 增加球数
  - 从板块上发射出若干
    - 1-4个
- 增加板长
- 双倍分数
- 改变球速
  - 加快
  - 减缓
- 改变伤害
- 改变板速
  - 加快
  - 减缓
- 超级弹球
  - 将玩家所有普通弹球改变为超级弹球一段时间


## 团队分工
- 李唯聪：服务端设计与实现，通信规则设计，部分游戏逻辑设计
- 张轶博：游戏逻辑设计与实现
- 郑修远：游戏界面与多媒体元素完善与美化
- 李一淼：服务端设计，游戏与通信测试
- 张越：服务端设计，游戏与通信测试
