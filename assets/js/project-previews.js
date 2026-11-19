(() => {
  const videos = [...document.querySelectorAll('.paper-thumb-video')];
  // The linked poster remains usable without scripting or visibility observers.
  if (!videos.length || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const nearby = new Set();
  const visible = new Set();
  const failed = new WeakSet();

  function load(video) {
    if (reducedMotion.matches || failed.has(video)) return;
    if (!video.hasAttribute('src')) {
      video.muted = true;
      video.poster = video.parentElement.querySelector('img').src;
      video.preload = 'auto';
      video.src = video.dataset.src;
      video.load();
    }
  }

  function update(video) {
    if (reducedMotion.matches || document.hidden || !visible.has(video)) {
      video.pause();
      return;
    }
    load(video);
    if (failed.has(video)) return;
    video.hidden = false;
    video.play().catch((error) => {
      // Scrolling away or switching motion settings can cancel a pending play.
      if (error.name !== 'AbortError') video.hidden = true;
    });
  }

  const loadingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector('video');
      if (entry.isIntersecting) {
        nearby.add(video);
        if (!document.hidden) load(video);
      } else {
        nearby.delete(video);
      }
    });
  }, { rootMargin: '300px 0px' });

  const playbackObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target.querySelector('video');
      if (entry.isIntersecting) visible.add(video);
      else visible.delete(video);
      update(video);
    });
  }, { threshold: 0.01 });

  videos.forEach((video) => {
    // Visibility observers own playback, including browsers that autoplay offscreen.
    video.autoplay = false;
    video.addEventListener('error', () => {
      failed.add(video);
      video.hidden = true;
    });
    loadingObserver.observe(video.parentElement);
    playbackObserver.observe(video.parentElement);
  });

  reducedMotion.addEventListener('change', () => {
    videos.forEach((video) => {
      if (reducedMotion.matches) {
        video.pause();
        video.hidden = true;
        video.removeAttribute('src');
        video.removeAttribute('poster');
        video.load();
      } else {
        if (nearby.has(video) && !document.hidden) load(video);
        update(video);
      }
    });
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) nearby.forEach(load);
    videos.forEach(update);
  });
})();
