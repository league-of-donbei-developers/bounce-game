# bounce-game
一个弹球小游戏



## 游戏规则背景介绍



# 待完成事项

- 逻辑代码计算与渲染解耦（0817）
  - 页面状态对象
- 服务端搭建（0817）
  - 匹配算法
  - 帧同步转发





## 若干问题（0816）

### 游戏模式

#### 单人模式

##### 游戏规则

总体为无尽模式，在已有关卡中随机进入，当清空所有砖块获胜，失去所有弹球失败。

获胜时保留分数，重置状态，进入下一关卡。

#### 双人模式



### 游戏过程

### 开局

​	开局时由板块承载一个初始普通球，按下“发射键”发球



### 暂停



### 游戏难度

#### 控制因素

- 板长
  - 初始长度
  - 最大长度
- 球速
- 道具概率
- 砖块血量
- 黑洞块数量



### 弹球

- 普通弹球
  - 普通弹球有伤害属性，当碰撞砖块时造成对应伤害
  - 伤害范围:1-6
- 超级弹球
  - 超级弹球仅在碰撞墙壁和板块时反弹，碰撞砖块时直接打掉不改变方向。



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



### 地图

##### 尺寸

- pc端高度100%，宽度为800px
- 移动端网页全屏占满



### 板子

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

