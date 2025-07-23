// 状态栏组件
function createStatusBar() {
    const statusBar = document.createElement('div');
    statusBar.className = 'status-bar';
    
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    statusBar.innerHTML = `
        <div class="status-bar-left">
            ${time}
        </div>
        <div class="status-bar-center">
            
        </div>
        <div class="status-bar-right">
            <i class="fas fa-signal mr-2"></i>
            <i class="fas fa-wifi mr-2"></i>
            <i class="fas fa-battery-three-quarters"></i>
        </div>
    `;
    
    return statusBar;
}

// 底部导航栏组件
function createTabBar(activeTab) {
    const tabBar = document.createElement('div');
    tabBar.className = 'tab-bar';
    
    const tabs = [
        { id: 'camera', icon: 'fa-camera', label: '相机' },
        { id: 'presets', icon: 'fa-sliders', label: '预设' },
        { id: 'community', icon: 'fa-compass', label: '社区' },
        { id: 'profile', icon: 'fa-user', label: '我的' }
    ];
    
    tabs.forEach(tab => {
        const tabItem = document.createElement('div');
        tabItem.className = `tab-item ${tab.id === activeTab ? 'active' : ''}`;
        tabItem.innerHTML = `
            <i class="fas ${tab.icon} tab-icon"></i>
            <span>${tab.label}</span>
        `;
        
        tabItem.addEventListener('click', () => {
            if (tab.id !== activeTab) {
                window.location.href = `${tab.id}.html`;
            }
        });
        
        tabBar.appendChild(tabItem);
    });
    
    return tabBar;
}

// 初始化页面基础结构
function initPage(title, activeTab) {
    document.body.appendChild(createStatusBar());
    
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-container';
    document.body.appendChild(contentContainer);
    
    document.body.appendChild(createTabBar(activeTab));
    
    return contentContainer;
}

// 创建参数调节滑块
function createSlider(name, min, max, value, step = 1, unit = '') {
    const container = document.createElement('div');
    container.className = 'slider-container';
    
    const label = document.createElement('div');
    label.className = 'slider-label';
    label.innerHTML = `
        <span>${name}</span>
        <span>${value}${unit}</span>
    `;
    
    const slider = document.createElement('input');
    slider.type = 'range';
    slider.className = 'slider';
    slider.min = min;
    slider.max = max;
    slider.value = value;
    slider.step = step;
    
    slider.addEventListener('input', () => {
        label.querySelector('span:last-child').textContent = `${slider.value}${unit}`;
    });
    
    container.appendChild(label);
    container.appendChild(slider);
    
    return container;
}

// 创建预设项
function createPresetItem(preset) {
    const item = document.createElement('div');
    item.className = 'preset-item';
    
    item.innerHTML = `
        <div class="preset-thumbnail">
            <img src="${preset.thumbnail}" alt="${preset.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div class="preset-info">
            <div style="font-weight: 600; margin-bottom: 4px;">${preset.name}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${preset.description}</div>
            <div style="margin-top: 4px; display: flex; flex-wrap: wrap;">
                ${preset.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
        <div class="preset-actions">
            <button class="btn-secondary" style="width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-arrow-down"></i>
            </button>
        </div>
    `;
    
    return item;
}

// 创建社区帖子项
function createPostItem(post) {
    const item = document.createElement('div');
    item.className = 'card';
    
    item.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
            <div class="avatar">
                <img src="${post.author.avatar}" alt="${post.author.name}">
            </div>
            <div style="margin-left: 12px;">
                <div style="font-weight: 600;">${post.author.name}</div>
                <div style="font-size: 12px; color: var(--text-secondary);">${post.time}</div>
            </div>
        </div>
        <div style="margin-bottom: 12px;">
            ${post.content}
        </div>
        <div style="border-radius: 8px; overflow: hidden; margin-bottom: 12px;">
            <img src="${post.image}" alt="Post image" style="width: 100%;">
        </div>
        <div style="display: flex; justify-content: space-between; color: var(--text-secondary);">
            <div>
                <i class="far fa-heart"></i> ${post.likes}
            </div>
            <div>
                <i class="far fa-comment"></i> ${post.comments}
            </div>
            <div>
                <i class="fas fa-arrow-down"></i> 获取参数
            </div>
        </div>
    `;
    
    return item;
} 