/**
 * 像素小动画素材库。
 *
 * 每个 sprite 就是几帧 16x16 的 ASCII 画，按 palette 里的字符上色，
 * 前端用 steps() 逐帧切换 —— 所以是真·像素动画，没有任何图片请求。
 *
 * 字符含义：. 透明 / o 深橙 / a 亮黄 / m 薄荷 / w 米白 / d 深色
 * 想改造型直接改下面这些字符画就行。
 */

export const PALETTE: Record<string, string> = {
  o: '#ca6702',
  a: '#ee9b00',
  m: '#94d2bd',
  w: '#fffaf2',
  d: '#2e2115',
};

export interface Sprite {
  frames: string[][];
  duration: number; // 一轮动画的毫秒数
}

/**
 * 兔子：两只耳朵交替抖一下 + 每轮眨一次眼，屁股后面有个白色小尾巴。
 * 4 帧循环：竖耳 → 右耳歪 → 竖耳并闭眼 → 左耳歪。
 * 睁眼是 1px 的点，闭眼是 3px 的横杠，这样眨眼一眼就能看出来。
 */
const rabbit: Sprite = {
  duration: 1000,
  frames: [
    [
      '.....o....o.....',
      '....oao..oao....',
      '....oao..oao....',
      '....oao..oao....',
      '....ooo..ooo....',
      '....oooooooo....',
      '...oooooooooo...',
      '...oodoooodoo...',
      '...oooommoooo...',
      '...oooooooooo...',
      '..ooooooooooooo.',
      '..oooooooooooww.',
      '..oooooooooooww.',
      '..ooooooooooooo.',
      '..oo.....oo.....',
      '................',
    ],
    [
      '.....o......o...',
      '....oao...oao...',
      '....oao..oao....',
      '....oao..oao....',
      '....ooo..ooo....',
      '....oooooooo....',
      '...oooooooooo...',
      '...oodoooodoo...',
      '...oooommoooo...',
      '...oooooooooo...',
      '..ooooooooooooo.',
      '..oooooooooooww.',
      '..oooooooooooww.',
      '..ooooooooooooo.',
      '..oo.....oo.....',
      '................',
    ],
    [
      '.....o....o.....',
      '....oao..oao....',
      '....oao..oao....',
      '....oao..oao....',
      '....ooo..ooo....',
      '....oooooooo....',
      '...oooooooooo...',
      '...odddoodddo...',
      '...oooommoooo...',
      '...oooooooooo...',
      '..ooooooooooooo.',
      '..oooooooooooww.',
      '..oooooooooooww.',
      '..ooooooooooooo.',
      '..oo.....oo.....',
      '................',
    ],
    [
      '...o......o.....',
      '...oao...oao....',
      '....oao..oao....',
      '....oao..oao....',
      '....ooo..ooo....',
      '....oooooooo....',
      '...oooooooooo...',
      '...oodoooodoo...',
      '...oooommoooo...',
      '...oooooooooo...',
      '..ooooooooooooo.',
      '..oooooooooooww.',
      '..oooooooooooww.',
      '..ooooooooooooo.',
      '..oo.....oo.....',
      '................',
    ],
  ],
};

/** 咖啡：热气一缕缕往上冒 */
const coffee: Sprite = {
  duration: 900,
  frames: [
    [
      '................',
      '................',
      '......m..m......',
      '.....m....m.....',
      '..oooooooooo....',
      '..oaaaaaaaao....',
      '..owwwwwwwwo.oo.',
      '..owwwwwwwwo..oo',
      '..owwwwwwwwo..oo',
      '..owwwwwwwwo.oo.',
      '..oooooooooo....',
      '...oooooooo.....',
      '................',
      '................',
      '................',
      '................',
    ],
    [
      '................',
      '......m..m......',
      '.....m....m.....',
      '......m..m......',
      '..oooooooooo....',
      '..oaaaaaaaao....',
      '..owwwwwwwwo.oo.',
      '..owwwwwwwwo..oo',
      '..owwwwwwwwo..oo',
      '..owwwwwwwwo.oo.',
      '..oooooooooo....',
      '...oooooooo.....',
      '................',
      '................',
      '................',
      '................',
    ],
    [
      '......m..m......',
      '.....m....m.....',
      '......m..m......',
      '.....m....m.....',
      '..oooooooooo....',
      '..oaaaaaaaao....',
      '..owwwwwwwwo.oo.',
      '..owwwwwwwwo..oo',
      '..owwwwwwwwo..oo',
      '..owwwwwwwwo.oo.',
      '..oooooooooo....',
      '...oooooooo.....',
      '................',
      '................',
      '................',
      '................',
    ],
  ],
};

/** 星星：一大一小地闪 */
const star: Sprite = {
  duration: 800,
  frames: [
    [
      '................',
      '................',
      '.......aa.......',
      '......aaaa......',
      '......aaaa......',
      'aaaaaaaaaaaaaaaa',
      '.aaaaaaaaaaaaaa.',
      '..aaaaaaaaaaaa..',
      '...aaaaaaaaaa...',
      '...aaaaaaaaaa...',
      '..aaaaa..aaaaa..',
      '..aaaa....aaaa..',
      '..aa........aa..',
      '................',
      '................',
      '................',
    ],
    [
      '................',
      '................',
      '................',
      '.......aa.......',
      '......aaaa......',
      '.aaaaaaaaaaaaaa.',
      '..aaaaaaaaaaaa..',
      '...aaaaaaaaaa...',
      '...aaaaaaaaaa...',
      '...aaaaaaaaaa...',
      '..aaaa....aaaa..',
      '..aa........aa..',
      '................',
      '................',
      '................',
      '................',
    ],
  ],
};

/** 软盘：指示灯一闪一闪 */
const disk: Sprite = {
  duration: 1000,
  frames: [
    [
      '................',
      '................',
      '..oooooooooooo..',
      '..owwwwwwwwwwo..',
      '..owddddddddwo..',
      '..owddddddddwo..',
      '..owwwwwwwwwwo..',
      '..oooooooooooo..',
      '..owwwwwwwwmmo..',
      '..owwwwwwwwmmo..',
      '..owwaaaaaawwo..',
      '..owwaaaaaawwo..',
      '..owwaaaaaawwo..',
      '..oooooooooooo..',
      '................',
      '................',
    ],
    [
      '................',
      '................',
      '..oooooooooooo..',
      '..owwwwwwwwwwo..',
      '..owddddddddwo..',
      '..owddddddddwo..',
      '..owwwwwwwwwwo..',
      '..oooooooooooo..',
      '..owwwwwwwwddo..',
      '..owwwwwwwwddo..',
      '..owwaaaaaawwo..',
      '..owwaaaaaawwo..',
      '..owwaaaaaawwo..',
      '..oooooooooooo..',
      '................',
      '................',
    ],
  ],
};

/** 小幽灵：飘来飘去（404 页用） */
const ghost: Sprite = {
  duration: 800,
  frames: [
    [
      '................',
      '................',
      '.....mmmmmm.....',
      '....mmmmmmmm....',
      '...mmmmmmmmmm...',
      '...mmdmmmmdmm...',
      '...mmdmmmmdmm...',
      '...mmmmmmmmmm...',
      '...mmmmmmmmmm...',
      '...mmmmmmmmmm...',
      '...mmmmmmmmmm...',
      '...m.mm..mm.m...',
      '................',
      '................',
      '................',
      '................',
    ],
    [
      '................',
      '................',
      '................',
      '.....mmmmmm.....',
      '....mmmmmmmm....',
      '...mmmmmmmmmm...',
      '...mdmmmmmmdm...',
      '...mdmmmmmmdm...',
      '...mmmmmmmmmm...',
      '...mmmmmmmmmm...',
      '...mmmmmmmmmm...',
      '...mmmmmmmmmm...',
      '...mm.mm.mm.m...',
      '................',
      '................',
      '................',
    ],
  ],
};

/** 信封：一开一合（关于页用） */
const mail: Sprite = {
  duration: 1100,
  frames: [
    [
      '................',
      '................',
      '................',
      '..oooooooooooo..',
      '..owwwwwwwwwwo..',
      '..owwooooooowo..',
      '..owwwooooowwo..',
      '..owwwwooowwwo..',
      '..owwwwwowwwwo..',
      '..owwwwwwwwwwo..',
      '..owwwwwwwwwwo..',
      '..oooooooooooo..',
      '................',
      '................',
      '................',
      '................',
    ],
    [
      '................',
      '................',
      '....wwwwwwww....',
      '....waaaaaaw....',
      '..oooooooooooo..',
      '..owwwwwwwwwwo..',
      '..owwwwwwwwwwo..',
      '..owwwwwwwwwwo..',
      '..owwwwwwwwwwo..',
      '..owwwwwwwwwwo..',
      '..owwwwwwwwwwo..',
      '..oooooooooooo..',
      '................',
      '................',
      '................',
      '................',
    ],
  ],
};

export const SPRITES = {
  rabbit,
  coffee,
  star,
  disk,
  ghost,
  mail,
} satisfies Record<string, Sprite>;

export type SpriteName = keyof typeof SPRITES;
