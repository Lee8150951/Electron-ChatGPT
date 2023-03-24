/* 处理页面逻辑 */
(() => {
  try {
    // 获取sticky及text元素
    const sticky = document.querySelector('.sticky');
    const text = document.querySelector('.text-xs');

    // 创建IntersectionObserver
    const observer = new IntersectionObserver(function (entries, observer) {
      entries.forEach(entry => {
        // 监控到元素进入视口
        if (entry.isIntersecting) {
          sticky.style.setProperty('display', 'none', 'important');
          text.innerHTML = '';
          text.style.padding = '4px';

          // 配置command/ctrl + enter提交
          const textarea = document.querySelector('textarea');
          textarea.addEventListener('keydown', function(event) {
            if (event.keyCode === 13) {
              if (event.metaKey || event.ctrlKey) {
                // 模拟触发按钮的click事件
                const btn = document.querySelectorAll('button')[5];
                btn.click();
              }
            }
          });
        }
      });
    });

    // 监控sticky
    observer.observe(sticky);
  } catch (_) {}
})();