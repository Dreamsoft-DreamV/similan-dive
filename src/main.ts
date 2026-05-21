import './index.css';
import * as echarts from 'echarts';
import { initApp, handleRouteChange } from './main';

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

// 监听 hash 变化
window.addEventListener('hashchange', handleRouteChange);

interface DiveSite {
  name: string;
  depth: string;
  level: string;
  description: string;
  highlight: string[];
  image: string;
}

interface LiveAboard {
  title: string;
  description: string;
  features: { icon: string; text: string }[];
  image: string;
}

const diveSites: DiveSite[] = [
  {
    name: '达差岛 (Koh Tachai)',
    depth: '5-30米',
    level: '适合各级别潜水员',
    description: '达差岛是斯米兰群岛中最具代表性的潜水点之一，以其壮观的软珊瑚花园和丰富的海洋生物闻名。水下能见度常年保持在25-30米，是泰国最佳的潜水胜地之一。',
    highlight: ['软珊瑚花园', '海狼风暴', '玳瑁海龟'],
    image: '/images/dachai.png'
  },
  {
    name: '苏林岛 (Surin)',
    depth: '10-40米',
    level: '中级至高级潜水员',
    description: '苏林岛周围的水域生活着大量的豹纹鲨和巨型石斑鱼。这里有着保存完好的原始珊瑚礁系统，是观赏大型海洋生物的绝佳地点。',
    highlight: ['豹纹鲨', '巨型石斑', '珊瑚墙'],
    image: '/images/surin.png'
  },
  {
    name: '象头岩 (Elephant Head)',
    depth: '15-35米',
    level: '有经验潜水员',
    description: '象头岩因其水下岩石形态酷似大象头而得名。这里水流较为复杂，但正因如此，可以看到各种洄游鱼类和大型海洋生物。',
    highlight: ['巨型海狼', '鹰鳐', '竹鲨'],
    image: '/images/Elephant.png'
  },
  {
    name: 'Richelieu Rock',
    depth: '20-45米',
    level: '中级至高级潜水员',
    description: '这是泰国最著名的潜水点之一，位于斯米兰群岛的最北端。以鲸鲨频繁出没而闻名，是世界上最佳的鲸鲨观测点之一。',
    highlight: ['鲸鲨', '麒麟鱼', '微距生物'],
    image: '/images/Richelieu.png'
  }
];

const liveAboards: LiveAboard[] = [
  {
    title: '豪华船宿体验',
    description: '我们的船宿提供舒适的住宿、美味的餐食和完善的潜水装备。每一艘船都配备专业船长、经验丰富的潜水教练和贴心的服务人员。',
    features: [
      { icon: '🛏️', text: '空调舱室' },
      { icon: '🍽️', text: '每日三餐' },
      { icon: '🤿', text: '全套潜水装备' },
      { icon: '📚', text: '专业潜导服务' }
    ],
    image: '/images/chuanqian.png'
  },
  {
    title: '每日潜水行程',
    description: '每天安排3-4次潜水，包括晨潜、上午潜、下午潜和夜潜。充分利用每一刻，探索斯米兰海底世界的神奇与美丽。',
    features: [
      { icon: '🌅', text: '晨潜6:00' },
      { icon: '☀️', text: '上午潜9:00' },
      { icon: '🌊', text: '下午潜14:00' },
      { icon: '🌙', text: '夜潜20:00' }
    ],
    image: '/images/surin.png'
  }
];

function renderHero(): string {
  return `
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 via-ocean-blue/70 to-ocean-deep/90 z-10"></div>
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1920&q=80')] bg-cover bg-center"></div>
      
      <div class="relative z-20 text-center text-white px-6 max-w-5xl mx-auto">
        <div class="mb-6">
          <span class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm tracking-wider mb-6">
            🌊 THAILAND'S BEST DIVE DESTINATION
          </span>
        </div>
        <h1 class="text-5xl md:text-7xl font-bold mb-6 text-shadow">
          斯米兰船潜之旅
        </h1>
        <p class="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          探索安达曼海的梦幻海底世界<br/>
          追逐鲸鲨、邂逅海龟、与珊瑚共舞
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#dive-sites" class="gradient-coral text-white px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity">
            探索潜水点
          </a>
          <a href="#booking" class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-colors border border-white/30">
            立即预订
          </a>
        </div>
      </div>
      
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 float-animation">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  `;
}

function renderAbout(): string {
  return `
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-ocean-blue font-semibold text-sm tracking-wider">关于斯米兰</span>
            <h2 class="text-4xl font-bold text-gray-900 mt-2 mb-6">世界级潜水胜地</h2>
            <p class="text-gray-600 text-lg leading-relaxed mb-6">
              斯米兰群岛位于泰国普吉岛西北90公里的安达曼海上，由9座岛屿组成。这里拥有世界上最美的珊瑚礁系统之一，1982年被指定为国家公园，是泰国最受欢迎的潜水目的地。
            </p>
            <p class="text-gray-600 text-lg leading-relaxed mb-8">
              每年11月至次年4月是最佳潜水季节，水温25-29°C，能见度30米以上。丰富多样的海洋生物、壮观的珊瑚礁和相对较少的人流，使其成为潜水爱好者的天堂。
            </p>
            <div class="grid grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-ocean-blue">9</div>
                <div class="text-gray-500 text-sm">岛屿组成</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-ocean-blue">30m+</div>
                <div class="text-gray-500 text-sm">能见度</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-ocean-blue">6</div>
                <div class="text-gray-500 text-sm">月开放期</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80" 
                 alt="斯米兰海底世界" 
                 class="rounded-2xl shadow-2xl w-full" />
            <div class="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div class="text-ocean-blue font-bold text-2xl">5月-10月</div>
              <div class="text-gray-500">闭岛保护期</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderDiveSites(): string {
  return `
    <section id="dive-sites" class="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-coral font-semibold text-sm tracking-wider">推荐潜水点</span>
          <h2 class="text-4xl font-bold text-gray-900 mt-2">不可错过的潜水胜地</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
            从入门级到专业级，每个潜水点都有独特的魅力，等待你来探索
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          ${diveSites.map(site => `
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg card-hover">
              <div class="relative aspect-[3/2]">
                <img src="${site.image}" alt="${site.name}" class="w-full h-full object-cover" />
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-ocean-deep">
                  ${site.depth}
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${site.name}</h3>
                <p class="text-gray-600 mb-4">${site.description}</p>
                <div class="flex flex-wrap gap-2">
                  ${site.highlight.map(h => `
                    <span class="px-3 py-1 bg-ocean-light/20 text-ocean-deep rounded-full text-sm">
                      ${h}
                    </span>
                  `).join('')}
                </div>
                <div class="mt-4 pt-4 border-t border-gray-100">
                  <span class="text-sm text-gray-400">难度：</span>
                  <span class="text-sm text-ocean-blue font-medium">${site.level}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderLiveAboard(): string {
  return `
    <section class="py-24 gradient-ocean text-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-ocean-light font-semibold text-sm tracking-wider">船宿体验</span>
          <h2 class="text-4xl font-bold mt-2">开启你的船宿之旅</h2>
          <p class="text-white/70 mt-4 max-w-2xl mx-auto">
            住在船上，深入体验斯米兰的每一个美好时刻
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 gap-8">
          ${liveAboards.map(aboard => `
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20">
              <img src="${aboard.image}" alt="${aboard.title}" class="w-full h-56 object-cover" />
              <div class="p-6">
                <h3 class="text-2xl font-bold mb-3">${aboard.title}</h3>
                <p class="text-white/80 mb-6">${aboard.description}</p>
                <div class="grid grid-cols-2 gap-4">
                  ${aboard.features.map(f => `
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">${f.icon}</span>
                      <span class="text-white/90">${f.text}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderMarineLife(): string {
  return `
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <span class="text-coral font-semibold text-sm tracking-wider">海洋生物</span>
          <h2 class="text-4xl font-bold text-gray-900 mt-2">遇见海底居民</h2>
          <p class="text-gray-500 mt-4 max-w-2xl mx-auto">
            斯米兰群岛栖息着超过200种鱼类和100种珊瑚
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          ${[
            { name: '鲸鲨', emoji: '🦈', desc: '世界最大的鱼类' },
            { name: '玳瑁海龟', emoji: '🐢', desc: '常在这里筑巢' },
            { name: '豹纹鲨', emoji: '🦭', desc: '底栖明星物种' },
            { name: '蝠鲼', emoji: '🦋', desc: '优雅的海洋舞者' },
            { name: '海狼风暴', emoji: '🐟', desc: '壮观的鱼群' },
            { name: '小丑鱼', emoji: '🐠', desc: '珊瑚礁精灵' },
            { name: '章鱼', emoji: '🐙', desc: '智慧的无脊椎动物' },
            { name: '海马', emoji: '🦑', desc: '微距摄影宠儿' }
          ].map(creature => `
            <div class="bg-gray-50 rounded-xl p-6 text-center hover:bg-ocean-light/10 transition-colors">
              <div class="text-5xl mb-3">${creature.emoji}</div>
              <h4 class="font-bold text-gray-900">${creature.name}</h4>
              <p class="text-gray-500 text-sm mt-1">${creature.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderBooking(): string {
  return `
    <section id="booking" class="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-ocean-blue font-semibold text-sm tracking-wider">预订咨询</span>
            <h2 class="text-4xl font-bold text-gray-900 mt-2 mb-6">开启你的潜水之旅</h2>
            <p class="text-gray-600 text-lg mb-8">
              无论你是初次尝试潜水的新手，还是经验丰富的老手，我们都能为你定制专属的斯米兰之旅。欢迎填写表单或直接联系我们。
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-ocean-light/20 rounded-full flex items-center justify-center">
                  <span class="text-xl">📍</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900">出发港口</div>
                  <div class="text-gray-500">泰国普吉岛寇立码头 (Khao Lak)</div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-ocean-light/20 rounded-full flex items-center justify-center">
                  <span class="text-xl">📅</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900">船期安排</div>
                  <div class="text-gray-500">每周一、周四出发（11月-4月）</div>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-ocean-light/20 rounded-full flex items-center justify-center">
                  <span class="text-xl">⏱️</span>
                </div>
                <div>
                  <div class="font-semibold text-gray-900">行程时长</div>
                  <div class="text-gray-500">3天2晚 / 4天3晚 / 5天4晚</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl shadow-xl p-8">
            <h3 class="text-xl font-bold text-gray-900 mb-6">快速咨询</h3>
            <form id="booking-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">您的姓名</label>
                <input type="text" name="name" required
                       class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none transition-all"
                       placeholder="请输入您的姓名" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">联系电话</label>
                <input type="tel" name="phone" required
                       class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none transition-all"
                       placeholder="请输入您的联系电话" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">潜水经验</label>
                <select name="experience" required
                        class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none transition-all">
                  <option value="">请选择</option>
                  <option value="none">无潜水经验</option>
                  <option value="ow">开放水域潜水员 (OW)</option>
                  <option value="aow">进阶开放水域潜水员 (AOW)</option>
                  <option value="rescue">救援潜水员</option>
                  <option value="divemaster">潜水长以上</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">预计出发日期</label>
                <input type="date" name="date"
                       class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none transition-all" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">其他需求</label>
                <textarea name="message" rows="3"
                          class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none transition-all resize-none"
                          placeholder="请描述您的其他需求或问题..."></textarea>
              </div>
              <button type="submit" 
                      class="w-full gradient-coral text-white py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity">
                提交咨询
              </button>
            </form>
            <div id="form-message" class="mt-4 hidden"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFooter(): string {
  return `
    <footer class="bg-slate-800 text-gray-100 py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-12">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-bold mb-4 text-white">斯米兰船潜</h3>
            <p class="text-gray-300 mb-6 max-w-md">
              专注于斯米兰群岛船宿潜水服务多年，为潜水爱好者提供安全、专业、难忘的潜水体验。
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors text-gray-200">
                <span>WeChat</span>
              </a>
              <a href="#" class="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors text-gray-200">
                <span>Line</span>
              </a>
            </div>
          </div>
          <div>
            <h4 class="font-bold mb-4 text-white">快速链接</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#dive-sites" class="hover:text-white transition-colors">潜水点介绍</a></li>
              <li><a href="#booking" class="hover:text-white transition-colors">预订咨询</a></li>
              <li><a href="#" class="hover:text-white transition-colors">常见问题</a></li>
              <li><a href="#" class="hover:text-white transition-colors">装备指南</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-4 text-white">联系方式</h4>
            <ul class="space-y-2 text-gray-300">
              <li>📧 info@similandive.com</li>
              <li>📱 +66 89 123 4567</li>
              <li>📍 泰国普吉岛</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-slate-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          © 2024 斯米兰船潜. 保留所有权利.
          <br/>
          <a href="#/login" class="mt-2 inline-block text-slate-400 hover:text-white transition-colors cursor-pointer">
            管理后台
          </a>
        </div>
      </div>
    </footer>
  `;
}

function renderNavigation(): string {
  return `
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div class="max-w-7xl mx-auto px-6">
        <div class="flex items-center justify-between h-16">
          <a href="#" class="text-xl font-bold text-ocean-deep">
            🤿 斯米兰船潜
          </a>
          <div class="hidden md:flex items-center gap-8">
            <a href="#about" class="text-gray-600 hover:text-ocean-deep transition-colors">关于斯米兰</a>
            <a href="#dive-sites" class="text-gray-600 hover:text-ocean-deep transition-colors">潜水点</a>
            <a href="#booking" class="text-gray-600 hover:text-ocean-deep transition-colors">预订</a>
          </div>
          <a href="#booking" class="gradient-coral text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            立即咨询
          </a>
        </div>
      </div>
    </nav>
  `;
}

export function initApp(): void {
  const app = document.getElementById('app');

  if (!app) {
    console.error('App element not found');
    return;
  }

  // 路由处理
  const hash = window.location.hash;
  const isLoggedIn = localStorage.getItem('admin_logged_in') === 'true';
  
  if (hash === '#/login') {
    // 登录页
    if (isLoggedIn) {
      window.location.hash = '#/admin';
      return;
    }
    app.innerHTML = renderLoginPage();
    initLoginPage();
  } else if (hash === '#/admin') {
    // 管理后台 - 需要登录
    if (!isLoggedIn) {
      window.location.hash = '#/login';
      return;
    }
    app.innerHTML = renderAdminLayout();
    initAdminPage();
  } else if (hash === '#/analytics') {
    // 数据看板 - 需要登录
    if (!isLoggedIn) {
      window.location.hash = '#/login';
      return;
    }
    app.innerHTML = renderAnalyticsLayout();
    initAnalyticsPage();
  } else {
    // 首页
    app.innerHTML = `
      ${renderNavigation()}
      <main>
        ${renderHero()}
        ${renderAbout()}
        ${renderDiveSites()}
        ${renderLiveAboard()}
        ${renderMarineLife()}
        ${renderBooking()}
      </main>
      ${renderFooter()}
    `;
    initBookingForm();
  }
}

// 导出路由变化处理函数
export function handleRouteChange(): void {
  const app = document.getElementById('app');
  if (!app) return;
  initApp();
}

// ==================== 登录页面 ====================

function renderLoginPage(): string {
  return `
    <div class="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div class="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="text-5xl mb-4">🤿</div>
          <h1 class="text-2xl font-bold text-gray-900">斯米兰船潜 - 管理后台</h1>
          <p class="text-gray-500 mt-2">请登录以查看预订记录</p>
        </div>
        
        <form id="login-form" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">管理员账号</label>
            <input 
              type="text" 
              id="login-username" 
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
              placeholder="请输入账号"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
            <input 
              type="password" 
              id="login-password" 
              required
              class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
              placeholder="请输入密码"
            />
          </div>
          
          <div id="login-error" class="hidden text-red-500 text-sm text-center"></div>
          
          <button 
            type="submit" 
            class="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors"
          >
            登录
          </button>
        </form>
        
        <div class="mt-6 text-center">
          <a href="#/" class="text-gray-500 hover:text-slate-600 text-sm">
            ← 返回首页
          </a>
        </div>
      </div>
    </div>
  `;
}

function initLoginPage(): void {
  const form = document.getElementById('login-form') as HTMLFormElement;
  const errorDiv = document.getElementById('login-error');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const username = (document.getElementById('login-username') as HTMLInputElement).value;
      const password = (document.getElementById('login-password') as HTMLInputElement).value;
      
      // 验证账号密码
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('admin_logged_in', 'true');
        window.location.hash = '#/admin';
        window.location.reload();
      } else {
        if (errorDiv) {
          errorDiv.textContent = '账号或密码错误，请重试';
          errorDiv.classList.remove('hidden');
        }
      }
    });
  }
}

// ==================== 管理后台 ====================

function renderAdminLayout(): string {
  return `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a href="#" class="text-xl font-bold text-ocean-deep">
              🤿 斯米兰船潜 - 管理后台
            </a>
            <a href="#/" class="text-gray-500 hover:text-ocean-deep text-sm">
              ← 返回首页
            </a>
          </div>
          <button id="logout-btn" class="text-gray-500 hover:text-red-500 text-sm">
            退出管理
          </button>
        </div>
      </nav>
      
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- 统计分析 -->
        <div id="stats-section" class="mb-8">
          <div class="text-center py-8 text-gray-400">
            统计加载中...
          </div>
        </div>

        <!-- 预订列表标题 -->
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900">预订列表</h2>
          <div class="text-sm text-gray-500">
            共 <span id="booking-count" class="font-bold text-ocean-blue">0</span> 条预订
          </div>
        </div>

        <!-- 高级筛选 -->
        <div class="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
            <div>
              <label class="block text-xs text-gray-500 mb-1">姓名</label>
              <input id="filter-name" type="text" placeholder="搜索姓名" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">潜水经验</label>
              <select id="filter-exp" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none">
                <option value="">全部</option>
                <option value="none">无经验</option>
                <option value="ow">开放水域 (OW)</option>
                <option value="aow">进阶开放水域 (AOW)</option>
                <option value="rescue">救援潜水员</option>
                <option value="divemaster">潜水长以上</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">预约日期起</label>
              <input id="filter-date-from" type="date" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">预约日期止</label>
              <input id="filter-date-to" type="date" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none" />
            </div>
            <div>
              <label class="block text-xs text-gray-500 mb-1">提交日期起</label>
              <input id="filter-submit-from" type="date" class="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none" />
            </div>
          </div>
          <div class="flex items-center justify-between">
            <!-- 状态筛选 -->
            <div id="status-filter" class="flex flex-wrap gap-2">
              <button class="filter-btn px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-white text-gray-600 border border-gray-200 hover:border-ocean-blue" data-status="all">
                全部
              </button>
              <button class="filter-btn px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-white text-gray-600 border border-gray-200 hover:border-yellow-400" data-status="pending">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-yellow-400 mr-1"></span>
                待处理
              </button>
              <button class="filter-btn px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-white text-gray-600 border border-gray-200 hover:border-blue-400" data-status="contacted">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 mr-1"></span>
                已联系
              </button>
              <button class="filter-btn px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-white text-gray-600 border border-gray-200 hover:border-green-400" data-status="confirmed">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1"></span>
                已确认
              </button>
              <button class="filter-btn px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-white text-gray-600 border border-gray-200 hover:border-gray-400" data-status="cancelled">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-gray-400 mr-1"></span>
                已取消
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button id="filter-reset" class="px-4 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                重置
              </button>
              <button id="filter-apply" class="px-4 py-1.5 text-xs font-medium text-white bg-ocean-blue hover:bg-ocean-blue/80 rounded-lg transition-colors">
                筛选
              </button>
            </div>
          </div>
        </div>
        
        <div id="admin-content" class="space-y-4">
          <div class="text-center py-12 text-gray-500">
            加载中...
          </div>
        </div>
      </div>

      <!-- 状态更新弹窗 -->
      <div id="status-modal" class="fixed inset-0 z-50 flex items-center justify-center hidden">
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" id="modal-overlay"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all">
          <div class="flex items-center justify-between mb-5">
            <h3 class="text-lg font-bold text-gray-900">更新状态</h3>
            <button id="modal-close" class="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div id="modal-body">
            <div class="mb-5">
              <div class="text-sm text-gray-500 mb-1">客户信息</div>
              <div class="text-gray-900 font-medium" id="modal-customer-name"></div>
            </div>
            <div class="mb-5">
              <span class="text-sm font-medium text-gray-700 block mb-3">选择状态</span>
              <div class="grid grid-cols-2 gap-3" id="modal-status-options"></div>
            </div>
            <div class="mb-6">
              <label class="text-sm font-medium text-gray-700 block mb-2">处理备注 <span class="text-gray-400 font-normal">（可选）</span></label>
              <textarea id="modal-remark" class="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-ocean-light focus:border-ocean-light outline-none transition-all" rows="3" placeholder="填写处理备注..."></textarea>
            </div>
          </div>
          <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
            <button id="modal-cancel" class="flex-1 px-4 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
              取消
            </button>
            <button id="modal-save" class="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-ocean-blue hover:bg-ocean-blue/80 rounded-xl transition-colors">
              确认更新
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getStatusLabel(status: string): { text: string; color: string } {
  const statusMap: Record<string, { text: string; color: string }> = {
    pending: { text: '待处理', color: 'bg-yellow-100 text-yellow-800' },
    contacted: { text: '已联系', color: 'bg-blue-100 text-blue-800' },
    confirmed: { text: '已确认', color: 'bg-green-100 text-green-800' },
    cancelled: { text: '已取消', color: 'bg-gray-100 text-gray-800' },
  };
  return statusMap[status] || { text: status, color: 'bg-gray-100 text-gray-800' };
}

function getExperienceLabel(exp: string): string {
  const expMap: Record<string, string> = {
    none: '无经验',
    ow: '开放水域 (OW)',
    aow: '进阶开放水域 (AOW)',
    rescue: '救援潜水员',
    divemaster: '潜水长以上',
  };
  return expMap[exp] || exp;
}

function renderBookingCard(booking: any): string {
  const status = getStatusLabel(booking.status);
  const experience = getExperienceLabel(booking.experience);
  const createdAt = new Date(booking.created_at).toLocaleString('zh-CN');
  
  return `
    <div class="bg-white rounded-xl shadow-sm p-4 booking-card hover:shadow-md transition-shadow" data-id="${booking.id}">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-gradient-to-br from-ocean-blue to-ocean-light flex items-center justify-center text-white font-bold text-sm shrink-0">
            ${booking.name.charAt(0)}
          </div>
          <div class="min-w-0">
            <h3 class="text-sm font-bold text-gray-900 truncate">${booking.name}</h3>
            <p class="text-gray-400 text-xs">${booking.phone}</p>
          </div>
        </div>
        <span class="status-badge px-2.5 py-0.5 rounded-full text-xs font-medium ${status.color} shadow-sm shrink-0 ml-3">
          ${status.text}
        </span>
      </div>
      
      <div class="grid grid-cols-3 gap-2 my-3 text-xs bg-gray-50 rounded-lg px-3 py-2">
        <div>
          <span class="text-gray-400">潜水经验</span>
          <p class="text-gray-900 font-medium mt-0.5">${experience}</p>
        </div>
        <div>
          <span class="text-gray-400">预约日期</span>
          <p class="text-gray-900 font-medium mt-0.5">${booking.booking_date || '未指定'}</p>
        </div>
        <div>
          <span class="text-gray-400">提交时间</span>
          <p class="text-gray-900 font-medium mt-0.5">${createdAt}</p>
        </div>
      </div>
      
      ${booking.message ? `
        <div class="mb-2 p-2 bg-amber-50 border border-amber-100 rounded-lg text-xs text-amber-800">
          <span class="font-medium">客户备注：</span>${booking.message}
        </div>
      ` : ''}

      ${booking.remark ? `
        <div class="mb-2 p-2 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-800">
          <span class="font-medium">处理备注：</span>${booking.remark}
        </div>
      ` : ''}
      
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="text-xs text-gray-400 font-mono">#${booking.id}</div>
        <div class="flex items-center gap-2">
          <button class="edit-status-btn px-3 py-1 text-xs font-medium text-ocean-blue bg-ocean-light/10 hover:bg-ocean-light/20 rounded-lg transition-colors" data-id="${booking.id}">
            <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            处理
          </button>
          <button class="delete-btn p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" data-id="${booking.id}" title="删除预订">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// 当前筛选条件
let currentFilter = 'all';
let filterName = '';
let filterExp = '';
let filterDateFrom = '';
let filterDateTo = '';
let filterSubmitFrom = '';

function applyFilters(bookings: any[]): any[] {
  return bookings.filter(b => {
    // 状态筛选
    if (currentFilter !== 'all' && b.status !== currentFilter) return false;
    // 姓名搜索
    if (filterName && !b.name.toLowerCase().includes(filterName.toLowerCase())) return false;
    // 潜水经验
    if (filterExp && b.experience !== filterExp) return false;
    // 预约日期范围
    if (filterDateFrom && b.booking_date && b.booking_date < filterDateFrom) return false;
    if (filterDateTo && b.booking_date && b.booking_date > filterDateTo) return false;
    // 提交日期范围
    if (filterSubmitFrom) {
      const submitDate = b.created_at.slice(0, 10);
      if (submitDate < filterSubmitFrom) return false;
    }
    return true;
  });
}

function readFilterValues(): void {
  const nameEl = document.getElementById('filter-name') as HTMLInputElement;
  const expEl = document.getElementById('filter-exp') as HTMLSelectElement;
  const dateFromEl = document.getElementById('filter-date-from') as HTMLInputElement;
  const dateToEl = document.getElementById('filter-date-to') as HTMLInputElement;
  const submitFromEl = document.getElementById('filter-submit-from') as HTMLInputElement;

  filterName = nameEl?.value?.trim() || '';
  filterExp = expEl?.value || '';
  filterDateFrom = dateFromEl?.value || '';
  filterDateTo = dateToEl?.value || '';
  filterSubmitFrom = submitFromEl?.value || '';
}

function resetFilters(): void {
  const nameEl = document.getElementById('filter-name') as HTMLInputElement;
  const expEl = document.getElementById('filter-exp') as HTMLSelectElement;
  const dateFromEl = document.getElementById('filter-date-from') as HTMLInputElement;
  const dateToEl = document.getElementById('filter-date-to') as HTMLInputElement;
  const submitFromEl = document.getElementById('filter-submit-from') as HTMLInputElement;

  if (nameEl) nameEl.value = '';
  if (expEl) expEl.value = '';
  if (dateFromEl) dateFromEl.value = '';
  if (dateToEl) dateToEl.value = '';
  if (submitFromEl) submitFromEl.value = '';

  filterName = '';
  filterExp = '';
  filterDateFrom = '';
  filterDateTo = '';
  filterSubmitFrom = '';
  currentFilter = 'all';

  // 重置状态按钮样式
  const allBtn = document.querySelector<HTMLElement>('.filter-btn[data-status="all"]');
  const otherBtns = document.querySelectorAll('.filter-btn[data-status]:not([data-status="all"])');
  if (allBtn) {
    allBtn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
    allBtn.classList.add('bg-ocean-blue', 'text-white', 'border-ocean-blue');
  }
  otherBtns.forEach(b => {
    b.classList.remove('bg-ocean-blue', 'text-white', 'border-ocean-blue');
    b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
  });

  loadBookings();
}

function renderEmptyState(): string {
  return `
    <div class="bg-white rounded-xl shadow-sm p-12 text-center">
      <div class="text-6xl mb-4">🤿</div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">暂无预订</h3>
      <p class="text-gray-500">当有用户提交预订时，会显示在这里</p>
    </div>
  `;
}

// ==================== 统计分析 ====================

function renderStatsSection(stats: any): string {
  const cards = [
    { label: '总预订', value: stats.total, color: 'from-ocean-blue to-ocean-light', icon: '📋' },
    { label: '今日新增', value: stats.todayNew, color: 'from-green-500 to-green-400', icon: '🆕' },
    { label: '本周新增', value: stats.weekNew, color: 'from-coral to-orange-400', icon: '📈' },
    { label: '待处理', value: stats.pending, color: 'from-yellow-500 to-yellow-400', icon: '⏳' },
  ];

  return `
    <div class="flex items-center gap-4 mb-4">
      <div class="flex-1 grid grid-cols-4 gap-4">
        ${cards.map(c => `
          <div class="bg-white rounded-xl shadow-sm p-4 flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white text-lg shrink-0">
              ${c.icon}
            </div>
            <div>
              <div class="text-xl font-bold text-gray-900">${c.value}</div>
              <div class="text-xs text-gray-400">${c.label}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <a href="#/analytics" class="shrink-0 px-5 py-3 bg-white rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-ocean-blue transition-all group">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          </div>
          <div>
            <div class="text-sm font-semibold text-gray-900 group-hover:text-ocean-blue transition-colors">数据看板</div>
            <div class="text-xs text-gray-400">深入分析</div>
          </div>
        </div>
      </a>
    </div>
  `;
}

async function loadStats(): Promise<void> {
  const section = document.getElementById('stats-section');
  if (!section) return;

  try {
    const response = await fetch('/api/bookings/stats');
    const result = await response.json();

    if (result.success && result.data) {
      section.innerHTML = renderStatsSection(result.data);
    } else {
      section.innerHTML = `<div class="text-center py-4 text-red-400">统计加载失败</div>`;
    }
  } catch {
    section.innerHTML = `<div class="text-center py-4 text-red-400">统计加载失败</div>`;
  }
}

async function loadBookings(): Promise<void> {
  const content = document.getElementById('admin-content');
  const countEl = document.getElementById('booking-count');
  
  if (!content) return;
  
  try {
    const response = await fetch('/api/bookings');
    const result = await response.json();
    
    if (result.success && result.data) {
      let filtered = applyFilters(result.data);
      const count = filtered.length;
      if (countEl) countEl.textContent = String(count);
      
      if (count === 0) {
        content.innerHTML = renderEmptyState();
      } else {
        content.innerHTML = filtered.map(renderBookingCard).join('');
        initAdminEventListeners();
      }
    } else {
      throw new Error(result.error || '加载失败');
    }
  } catch (err) {
    content.innerHTML = `
      <div class="bg-white rounded-xl shadow-sm p-12 text-center text-red-500">
        加载失败：${err instanceof Error ? err.message : '未知错误'}
      </div>
    `;
  }
}

// ==================== 状态更新弹窗 ====================

let modalBookingId: string | null = null;

function openStatusModal(booking: any): void {
  const modal = document.getElementById('status-modal');
  const overlay = document.getElementById('modal-overlay');
  if (!modal) return;

  modalBookingId = booking.id;
  document.getElementById('modal-customer-name')!.textContent = `${booking.name} — ${booking.phone}`;

  const optionsContainer = document.getElementById('modal-status-options')!;
  const statusOpts = [
    { value: 'pending', label: '待处理', color: 'bg-yellow-400', ring: 'ring-yellow-300' },
    { value: 'contacted', label: '已联系', color: 'bg-blue-400', ring: 'ring-blue-300' },
    { value: 'confirmed', label: '已确认', color: 'bg-green-400', ring: 'ring-green-300' },
    { value: 'cancelled', label: '已取消', color: 'bg-gray-400', ring: 'ring-gray-300' },
  ];

  optionsContainer.innerHTML = statusOpts.map(opt => `
    <label class="relative flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-200 status-option ${booking.status === opt.value ? 'border-ocean-blue bg-ocean-light/5' : 'border-gray-100 bg-white hover:border-gray-200'}" data-value="${opt.value}">
      <input type="radio" name="modal-status" value="${opt.value}" ${booking.status === opt.value ? 'checked' : ''} class="sr-only">
      <div class="w-10 h-10 rounded-lg ${opt.color} flex items-center justify-center text-white text-xs font-bold">
        ${opt.label.charAt(0)}
      </div>
      <div>
        <div class="text-sm font-medium text-gray-900">${opt.label}</div>
        <div class="text-xs text-gray-400">${opt.value === 'pending' ? '新预订待跟进' : opt.value === 'contacted' ? '已与客户沟通' : opt.value === 'confirmed' ? '预订已确认' : '预订已取消'}</div>
      </div>
      ${booking.status === opt.value ? '<div class="ml-auto text-ocean-blue"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div>' : ''}
    </label>
  `).join('');

  // 状态选择切换样式
  optionsContainer.querySelectorAll('.status-option').forEach(el => {
    el.addEventListener('click', () => {
      optionsContainer.querySelectorAll('.status-option').forEach(o => {
        o.classList.remove('border-ocean-blue', 'bg-ocean-light/5');
        o.classList.add('border-gray-100', 'bg-white');
        const check = o.querySelector('.ml-auto');
        if (check) check.remove();
      });
      el.classList.remove('border-gray-100', 'bg-white');
      el.classList.add('border-ocean-blue', 'bg-ocean-light/5');
      const radio = el.querySelector('input[type="radio"]') as HTMLInputElement;
      if (radio) radio.checked = true;
      const checkHtml = '<div class="ml-auto text-ocean-blue"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/></svg></div>';
      if (!el.querySelector('.ml-auto')) {
        el.insertAdjacentHTML('beforeend', checkHtml);
      }
    });
  });

  const remarkInput = document.getElementById('modal-remark') as HTMLTextAreaElement;
  if (remarkInput) remarkInput.value = booking.remark || '';

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
}

function closeStatusModal(): void {
  const modal = document.getElementById('status-modal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  modalBookingId = null;
}

function initAdminEventListeners(): void {
  // 打开弹窗
  document.querySelectorAll('.edit-status-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.currentTarget as HTMLElement;
      const id = target.dataset.id;
      if (!id) return;

      try {
        // 重新获取最新数据
        const response = await fetch('/api/bookings');
        const result = await response.json();
        if (result.success && result.data) {
          const booking = result.data.find((b: any) => String(b.id) === id);
          if (booking) {
            openStatusModal(booking);
          }
        }
      } catch {
        alert('获取预订信息失败');
      }
    });
  });

  // 弹窗确认保存
  document.getElementById('modal-save')?.addEventListener('click', async () => {
    if (!modalBookingId) return;

    const selectedRadio = document.querySelector<HTMLInputElement>('input[name="modal-status"]:checked');
    if (!selectedRadio) {
      alert('请选择一个状态');
      return;
    }

    const newStatus = selectedRadio.value;
    const remarkInput = document.getElementById('modal-remark') as HTMLTextAreaElement;
    const remark = remarkInput?.value?.trim() || '';
    const saveBtn = document.getElementById('modal-save') as HTMLButtonElement;
    saveBtn.disabled = true;
    saveBtn.textContent = '保存中...';

    try {
      const response = await fetch(`/api/bookings/${modalBookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, remark }),
      });

      const result = await response.json();

      if (result.success) {
        const card = document.querySelector<HTMLElement>(`.booking-card[data-id="${modalBookingId}"]`);
        if (card) {
          // 更新状态标签
          const statusEl = card.querySelector('.status-badge');
          if (statusEl) {
            const newLabel = getStatusLabel(newStatus);
            statusEl.textContent = newLabel.text;
            statusEl.className = `status-badge px-3 py-1 rounded-full text-sm font-medium ${newLabel.color} shadow-sm`;
          }

          // 更新备注区域
          const existingRemark = card.querySelector('.bg-blue-50');
          const msgDiv = card.querySelector('.bg-amber-50');
          const gridSection = card.querySelector('.grid');

          // 移除旧的备注
          if (existingRemark) existingRemark.remove();

          // 添加新的备注
          if (remark) {
            const remarkHtml = `
              <div class="mb-3 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-800">
                <span class="font-medium">处理备注：</span>${remark}
              </div>
            `;
            if (msgDiv) {
              msgDiv.insertAdjacentHTML('afterend', remarkHtml);
            } else if (gridSection) {
              gridSection.insertAdjacentHTML('afterend', remarkHtml);
            }
          }
        }

        closeStatusModal();
        loadStats();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      alert('更新失败：' + (err instanceof Error ? err.message : '未知错误'));
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = '确认更新';
    }
  });

  // 关闭弹窗
  document.getElementById('modal-close')?.addEventListener('click', closeStatusModal);
  document.getElementById('modal-cancel')?.addEventListener('click', closeStatusModal);
  document.getElementById('modal-overlay')?.addEventListener('click', closeStatusModal);

  // ESC 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeStatusModal();
  });

  // 删除
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const target = e.currentTarget as HTMLElement;
      const id = target.dataset.id;

      if (!id) return;
      if (!confirm('确定要删除这条预订吗？')) return;

      try {
        const response = await fetch(`/api/bookings/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        if (result.success) {
          loadBookings();
          loadStats();
        } else {
          throw new Error(result.error);
        }
      } catch (err) {
        alert('删除失败：' + (err instanceof Error ? err.message : '未知错误'));
      }
    });
  });
}

function initFilterEventListeners(): void {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const status = (btn as HTMLElement).dataset.status || 'all';
      if (status === currentFilter) return;

      currentFilter = status;

      filterBtns.forEach(b => {
        b.classList.remove('bg-ocean-blue', 'text-white', 'border-ocean-blue');
        b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
      });
      btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
      btn.classList.add('bg-ocean-blue', 'text-white', 'border-ocean-blue');

      loadBookings();
    });
  });

  // 筛选按钮
  document.getElementById('filter-apply')?.addEventListener('click', () => {
    readFilterValues();
    loadBookings();
  });

  // 重置按钮
  document.getElementById('filter-reset')?.addEventListener('click', resetFilters);

  // 回车搜索
  document.getElementById('filter-name')?.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter') {
      readFilterValues();
      loadBookings();
    }
  });

  // 经验/日期变更自动筛选
  ['filter-exp', 'filter-date-from', 'filter-date-to', 'filter-submit-from'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', () => {
      readFilterValues();
      loadBookings();
    });
  });
}

function initAdminPage(): void {
  // 初始化筛选按钮样式 — 默认选中"全部"
  const allBtn = document.querySelector<HTMLElement>('.filter-btn[data-status="all"]');
  if (allBtn) {
    allBtn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
    allBtn.classList.add('bg-ocean-blue', 'text-white', 'border-ocean-blue');
  }

  currentFilter = 'all';
  filterName = '';
  filterExp = '';
  filterDateFrom = '';
  filterDateTo = '';
  filterSubmitFrom = '';

  loadBookings();
  loadStats();
  initFilterEventListeners();
  
  // 退出管理
  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('admin_logged_in');
    window.location.hash = '#/login';
    window.location.reload();
  });
}

// ==================== 数据看板 ====================

let analyticsCharts: Record<string, any> = {};
let analyticsData: { stats: any; bookings: any[] } | null = null;
let monthlyTimeRange: 'month' | 'quarter' | 'year' = 'month';
let weeklyTimeRange: '7d' | '30d' | '1y' | '3y' = '7d';

function renderAnalyticsLayout(): string {
  return `
    <div class="min-h-screen bg-gray-100">
      <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <a href="#/admin" class="text-xl font-bold text-ocean-deep">
              🤿 斯米兰船潜 - 数据看板
            </a>
            <a href="#/admin" class="text-gray-500 hover:text-ocean-deep text-sm">
              ← 返回管理
            </a>
          </div>
          <button id="logout-btn" class="text-gray-500 hover:text-red-500 text-sm">
            退出管理
          </button>
        </div>
      </nav>
      <div class="max-w-7xl mx-auto px-6 py-8">
        <div id="analytics-content">
          <div class="text-center py-12 text-gray-500">加载中...</div>
        </div>
      </div>
    </div>
  `;
}

function renderAnalyticsDashboard(): string {
  return `
    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <div id="metric-total" class="text-2xl font-bold text-gray-900">—</div>
        <div class="text-xs text-gray-400 mt-1">总预订</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <div id="metric-rate" class="text-2xl font-bold text-green-600">—</div>
        <div class="text-xs text-gray-400 mt-1">确认率</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <div id="metric-lead" class="text-2xl font-bold text-ocean-blue">—</div>
        <div class="text-xs text-gray-400 mt-1">平均提前(天)</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <div id="metric-today" class="text-2xl font-bold text-coral">—</div>
        <div class="text-xs text-gray-400 mt-1">今日新增</div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-4 text-center">
        <div id="metric-pending" class="text-2xl font-bold text-yellow-500">—</div>
        <div class="text-xs text-gray-400 mt-1">待处理</div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-sm font-bold text-gray-700 mb-2">预订状态分布</h3>
        <div id="chart-status" class="h-72"></div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-sm font-bold text-gray-700 mb-2">转化漏斗</h3>
        <div id="chart-funnel" class="h-72"></div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-sm font-bold text-gray-700 mb-2">潜水经验分布</h3>
        <div id="chart-exp" class="h-72"></div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-bold text-gray-700">确认出行分析</h3>
          <div id="monthly-range-btns" class="flex gap-1">
            <button class="monthly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="month">月度</button>
            <button class="monthly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="quarter">季度</button>
            <button class="monthly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="year">年度</button>
          </div>
        </div>
        <div id="chart-monthly" class="h-72"></div>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mb-6">
      <div class="bg-white rounded-xl shadow-sm p-6">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-bold text-gray-700">新增趋势</h3>
          <div id="weekly-range-btns" class="flex gap-1">
            <button class="weekly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="7d">近7日</button>
            <button class="weekly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="30d">近30日</button>
            <button class="weekly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="1y">近一年</button>
            <button class="weekly-range-btn px-2.5 py-1 text-xs rounded-md transition-colors" data-range="3y">近三年</button>
          </div>
        </div>
        <div id="chart-weekly" class="h-72"></div>
      </div>
      <div class="bg-white rounded-xl shadow-sm p-6">
        <h3 class="text-sm font-bold text-gray-700 mb-2">数据洞察</h3>
        <div id="insights-container" class="space-y-3 mt-4"></div>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6">
      <h3 class="text-sm font-bold text-gray-700 mb-4">最近预订</h3>
      <div id="recent-container" class="space-y-3"></div>
    </div>
  `;
}

function initStatusChart(data: { name: string; value: number }[]): void {
  const el = document.getElementById('chart-status');
  if (!el) return;
  const chart = echarts.init(el);
  analyticsCharts.status = chart;

  const colors = ['#eab308', '#3b82f6', '#22c55e', '#9ca3af'];
  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    series: [{
      type: 'pie',
      radius: ['45%', '72%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 6, borderColor: '#fff', borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}\n{c} ({d}%)',
        fontSize: 12,
        lineHeight: 16,
      },
      labelLine: { length: 10, length2: 15 },
      emphasis: { label: { show: true, fontWeight: 'bold' } },
      data: data.map((d, i) => ({ ...d, itemStyle: { color: colors[i] } })),
    }],
  });
}

function initFunnelChart(data: { name: string; value: number }[]): void {
  const el = document.getElementById('chart-funnel');
  if (!el) return;
  const chart = echarts.init(el);
  analyticsCharts.funnel = chart;

  const total = data[0]?.value || 1;
  chart.setOption({
    tooltip: { trigger: 'item', formatter: '{b}: {c}' },
    series: [{
      type: 'funnel',
      left: '5%', right: '5%', top: 10, bottom: 10,
      width: '90%', min: 0, max: total,
      minSize: '0%', maxSize: '100%',
      sort: 'descending',
      gap: 3,
      label: {
        show: true,
        position: 'inside',
        formatter: (p: any) => {
          const rate = ((p.value / total) * 100).toFixed(0);
          return `${p.name}\n${p.value}\n占比 ${rate}%`;
        },
        fontSize: 11,
        lineHeight: 16,
      },
      itemStyle: { borderColor: '#fff', borderWidth: 2, borderRadius: 4 },
      data: data.map((d, i) => ({
        ...d,
        itemStyle: { color: ['#0369a1', '#38bdf8', '#22c55e'][i] },
      })),
    }],
  });
}

function initExpChart(data: { name: string; value: number }[]): void {
  const el = document.getElementById('chart-exp');
  if (!el) return;
  const chart = echarts.init(el);
  analyticsCharts.exp = chart;

  chart.setOption({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 80, right: 20, top: 10, bottom: 30 },
    xAxis: { type: 'value', axisLine: { show: false }, axisTick: { show: false }, splitLine: { lineStyle: { type: 'dashed' } } },
    yAxis: { type: 'category', data: data.map(d => d.name).reverse(), axisLine: { show: false }, axisTick: { show: false } },
    series: [{
      type: 'bar',
      data: data.map(d => d.value).reverse(),
      itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: '#0369a1' },
        { offset: 1, color: '#38bdf8' },
      ]), borderRadius: [0, 4, 4, 0] },
      barWidth: 20,
      label: { show: true, position: 'right', fontSize: 12 },
    }],
  });
}

function initLineChart(elementId: string, data: { name: string; value: number }[], areaColor: string, showDataZoom: boolean = false): void {
  const el = document.getElementById(elementId);
  if (!el) return;
  const chart = echarts.init(el);
  analyticsCharts[elementId] = chart;

  const showLabels = data.length <= 30;
  const rotateLabels = data.length > 30 ? 45 : data.length > 12 ? 30 : 0;

  const option: any = {
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 20, top: 10, bottom: showLabels ? 30 : 50 },
    xAxis: {
      type: 'category',
      data: data.map(d => d.name),
      axisLine: { lineStyle: { color: '#e5e7eb' } },
      axisTick: { show: false },
      axisLabel: { fontSize: 11, rotate: rotateLabels, show: showLabels },
    },
    yAxis: { type: 'value', splitLine: { lineStyle: { type: 'dashed' } }, axisLabel: { fontSize: 11 } },
    series: [{
      type: 'line',
      data: data.map(d => d.value),
      smooth: true,
      symbol: 'circle',
      symbolSize: data.length > 100 ? 0 : data.length > 30 ? 2 : 6,
      lineStyle: { width: data.length > 100 ? 1.5 : 3, color: '#0369a1' },
      itemStyle: { color: '#0369a1' },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: areaColor },
        { offset: 1, color: 'rgba(3, 105, 161, 0.02)' },
      ]) },
    }],
  };

  if (showDataZoom) {
    option.dataZoom = [{
      type: 'inside',
      start: Math.max(0, 100 - (30 / data.length) * 100),
      end: 100,
    }, {
      type: 'slider',
      bottom: 5,
      height: 16,
      start: Math.max(0, 100 - (30 / data.length) * 100),
      end: 100,
    }];
    option.grid.bottom = 50;
  }

  chart.setOption(option);
}

function getConfirmedData(bookings: any[], range: 'month' | 'quarter' | 'year'): { name: string; value: number }[] {
  const confirmed = bookings.filter((b: any) => b.status === 'confirmed' && b.booking_date);
  if (confirmed.length === 0) return [];

  if (range === 'month') {
    const months: Record<string, number> = {};
    confirmed.forEach((b: any) => {
      const key = b.booking_date.slice(0, 7);
      months[key] = (months[key] || 0) + 1;
    });
    return Object.entries(months).sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => ({ name, value }));
  }

  if (range === 'quarter') {
    const quarters: Record<string, number> = {};
    confirmed.forEach((b: any) => {
      const [y, m] = b.booking_date.split('-');
      const q = Math.ceil(parseInt(m, 10) / 3);
      const key = `${y}Q${q}`;
      quarters[key] = (quarters[key] || 0) + 1;
    });
    return Object.entries(quarters).sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => ({ name, value }));
  }

  const years: Record<string, number> = {};
  confirmed.forEach((b: any) => {
    const y = b.booking_date.slice(0, 4);
    years[y] = (years[y] || 0) + 1;
  });
  return Object.entries(years).sort(([a], [b]) => a.localeCompare(b)).map(([name, value]) => ({ name, value }));
}

function getWeeklyData(bookings: any[], range: '7d' | '30d' | '1y' | '3y'): { name: string; value: number }[] {
  const daysMap: Record<string, number> = { '7d': 7, '30d': 30, '1y': 365, '3y': 1095 };
  const days = daysMap[range];
  const now = new Date();
  const result: { name: string; value: number }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const count = bookings.filter((b: any) => b.created_at.startsWith(dateStr)).length;
    const label = range === '1y' || range === '3y'
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      : `${d.getMonth() + 1}/${d.getDate()}`;
    result.push({ name: label, value: count });
  }

  return result;
}

function renderInsights(stats: any, bookings: any[]): string[] {
  const insights: string[] = [];
  const total = stats.total;

  // 1. 待处理 vs 已确认
  if (stats.pending > stats.confirmed) {
    insights.push(`⚠️ 待处理(${stats.pending})超过已确认(${stats.confirmed})，建议加快跟进速度`);
  }

  // 2. 今日新增
  if (stats.todayNew > 0) {
    insights.push(`📈 今日新增 ${stats.todayNew} 条预订`);
  }

  // 3. 本周趋势
  if (stats.weekNew > 5) {
    insights.push(`🔥 本周新增 ${stats.weekNew} 条，注意船位安排`);
  }

  // 4. 无经验客户占比
  const noExpCount = stats.experienceDistribution?.none || 0;
  if (total > 0 && noExpCount > total * 0.3) {
    insights.push(`💡 无经验客户占比 ${((noExpCount / total) * 100).toFixed(0)}%，建议加强新手指引`);
  }

  // 5. 取消率
  const cancelRate = total > 0 ? (stats.cancelled / total) * 100 : 0;
  if (cancelRate > 15) {
    insights.push(`📉 取消率 ${cancelRate.toFixed(0)}% 偏高，建议优化预订流程`);
  }

  // 6. 平均提前天数
  const leadDays = bookings
    .filter((b: any) => b.booking_date)
    .map((b: any) => Math.max(0, Math.round((new Date(b.booking_date).getTime() - new Date(b.created_at).getTime()) / (1000 * 60 * 60 * 24))));
  if (leadDays.length > 0) {
    const avg = Math.round(leadDays.reduce((a: number, b: number) => a + b, 0) / leadDays.length);
    if (avg < 14) {
      insights.push(`⏰ 平均提前 ${avg} 天预订，建议提前推广吸引早鸟预订`);
    } else {
      insights.push(`✅ 平均提前 ${avg} 天预订，客户计划性良好`);
    }
  }

  // 7. 确认率
  const confirmed = stats.confirmed;
  const rate = total > 0 ? ((confirmed / total) * 100).toFixed(0) : '0';
  if (parseInt(rate, 10) < 30) {
    insights.push(`📊 确认率 ${rate}% 偏低，建议优化转化流程`);
  } else if (parseInt(rate, 10) > 50) {
    insights.push(`🎯 确认率 ${rate}% 表现优秀`);
  }

  if (insights.length === 0) {
    insights.push('📊 当前数据正常，继续保持');
  }

  return insights;
}

async function initAnalyticsPage(): Promise<void> {
  const content = document.getElementById('analytics-content');
  if (!content) return;

  content.innerHTML = renderAnalyticsDashboard();

  try {
    const [statsRes, bookingsRes] = await Promise.all([
      fetch('/api/bookings/stats'),
      fetch('/api/bookings'),
    ]);
    const [statsResult, bookingsResult] = await Promise.all([
      statsRes.json(),
      bookingsRes.json(),
    ]);

    if (!statsResult.success || !bookingsResult.success) {
      content.innerHTML = '<div class="text-center py-12 text-red-500">数据加载失败</div>';
      return;
    }

    const stats = statsResult.data;
    const bookings = bookingsResult.data;
    analyticsData = { stats, bookings };

    // 核心指标
    const total = stats.total;
    const confirmed = stats.confirmed;
    const conversionRate = total > 0 ? ((confirmed / total) * 100).toFixed(1) + '%' : '0%';
    const avgLeadDays = bookings
      .filter((b: any) => b.booking_date)
      .map((b: any) => Math.max(0, Math.round((new Date(b.booking_date).getTime() - new Date(b.created_at).getTime()) / (1000 * 60 * 60 * 24))));
    const avgLead = avgLeadDays.length > 0 ? Math.round(avgLeadDays.reduce((a: number, b: number) => a + b, 0) / avgLeadDays.length) : '—';

    document.getElementById('metric-total')!.textContent = String(total);
    document.getElementById('metric-rate')!.textContent = conversionRate;
    document.getElementById('metric-lead')!.textContent = String(avgLead);
    document.getElementById('metric-today')!.textContent = String(stats.todayNew);
    document.getElementById('metric-pending')!.textContent = String(stats.pending);

    // 图表
    initStatusChart([
      { name: '待处理', value: stats.pending },
      { name: '已联系', value: stats.contacted },
      { name: '已确认', value: stats.confirmed },
      { name: '已取消', value: stats.cancelled },
    ]);
    initFunnelChart([
      { name: '总咨询', value: total },
      { name: '已联系', value: stats.contacted + stats.confirmed },
      { name: '已确认', value: stats.confirmed },
    ]);
    const expMap: Record<string, string> = { none: '无经验', ow: 'OW', aow: 'AOW', rescue: '救援', divemaster: '潜水长' };
    initExpChart(Object.entries(stats.experienceDistribution || {}).map(([key, count]) => ({
      name: expMap[key] || key,
      value: count as number,
    })));
    initLineChart('chart-monthly', getConfirmedData(bookings, monthlyTimeRange), 'rgba(3, 105, 161, 0.3)');
    const weeklyData = getWeeklyData(bookings, weeklyTimeRange);
    initLineChart('chart-weekly', weeklyData, 'rgba(249, 115, 22, 0.3)', weeklyData.length > 60);

    // 数据洞察
    const insightsEl = document.getElementById('insights-container');
    if (insightsEl) {
      insightsEl.innerHTML = renderInsights(stats, bookings).map(i => `<div class="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">${i}</div>`).join('');
    }

    // 最近活动
    const recent = bookings.slice(0, 5);
    const recentEl = document.getElementById('recent-container');
    if (recentEl) {
      recentEl.innerHTML = recent.map((b: any) => {
        const status = getStatusLabel(b.status);
        const time = new Date(b.created_at).toLocaleString('zh-CN');
        return `
          <div class="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-gradient-to-br from-ocean-blue to-ocean-light flex items-center justify-center text-white text-xs font-bold">
                ${b.name.charAt(0)}
              </div>
              <div>
                <div class="text-sm font-medium text-gray-900">${b.name}</div>
                <div class="text-xs text-gray-400">${time}</div>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded-full text-xs font-medium ${status.color}">${status.text}</span>
          </div>
        `;
      }).join('');
    }

    // 月度范围切换
    document.querySelectorAll('.monthly-range-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        monthlyTimeRange = (btn as HTMLElement).dataset.range as 'month' | 'quarter' | 'year';
        document.querySelectorAll('.monthly-range-btn').forEach(b => {
          b.classList.remove('bg-ocean-blue', 'text-white');
          b.classList.add('bg-gray-100', 'text-gray-600');
        });
        btn.classList.remove('bg-gray-100', 'text-gray-600');
        btn.classList.add('bg-ocean-blue', 'text-white');
        if (analyticsData) {
          initLineChart('chart-monthly', getConfirmedData(analyticsData.bookings, monthlyTimeRange), 'rgba(3, 105, 161, 0.3)');
        }
      });
    });
    // 默认选中月度
    const defaultMonthlyBtn = document.querySelector<HTMLElement>('.monthly-range-btn[data-range="month"]');
    if (defaultMonthlyBtn) {
      defaultMonthlyBtn.classList.add('bg-ocean-blue', 'text-white');
      defaultMonthlyBtn.classList.remove('bg-gray-100', 'text-gray-600');
    }

    // 周范围切换
    document.querySelectorAll('.weekly-range-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        weeklyTimeRange = (btn as HTMLElement).dataset.range as '7d' | '30d' | '1y' | '3y';
        document.querySelectorAll('.weekly-range-btn').forEach(b => {
          b.classList.remove('bg-ocean-blue', 'text-white');
          b.classList.add('bg-gray-100', 'text-gray-600');
        });
        btn.classList.remove('bg-gray-100', 'text-gray-600');
        btn.classList.add('bg-ocean-blue', 'text-white');
        if (analyticsData) {
          const wd = getWeeklyData(analyticsData.bookings, weeklyTimeRange);
          initLineChart('chart-weekly', wd, 'rgba(249, 115, 22, 0.3)', wd.length > 60);
        }
      });
    });
    const defaultWeeklyBtn = document.querySelector<HTMLElement>('.weekly-range-btn[data-range="7d"]');
    if (defaultWeeklyBtn) {
      defaultWeeklyBtn.classList.add('bg-ocean-blue', 'text-white');
      defaultWeeklyBtn.classList.remove('bg-gray-100', 'text-gray-600');
    }

    window.addEventListener('resize', () => {
      Object.values(analyticsCharts).forEach(chart => chart.resize());
    });

  } catch {
    content.innerHTML = '<div class="text-center py-12 text-red-500">数据加载失败</div>';
  }

  document.getElementById('logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('admin_logged_in');
    window.location.hash = '#/login';
    window.location.reload();
  });
}

// ==================== 表单处理 ====================

function initBookingForm(): void {
  const form = document.getElementById('booking-form') as HTMLFormElement;
  const messageDiv = document.getElementById('form-message');

  if (form && messageDiv) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const submitBtn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = '提交中...';
      }
      
      try {
        const response = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          messageDiv.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg';
          messageDiv.textContent = result.message || '感谢您的咨询！我们将尽快与您联系。';
          form.reset();
        } else {
          throw new Error(result.error || '提交失败');
        }
      } catch (err) {
        messageDiv.className = 'mt-4 p-4 bg-red-100 text-red-700 rounded-lg';
        messageDiv.textContent = err instanceof Error ? err.message : '提交失败，请稍后重试';
      } finally {
        messageDiv.classList.remove('hidden');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = '提交咨询';
        }
      }
    });
  }
}
