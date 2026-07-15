document.addEventListener('DOMContentLoaded', () => {
  // Sticky Header scroll effect via IntersectionObserver
  const header = document.querySelector('header');
  if (header) {
    const sentinel = document.createElement('div');
    sentinel.style.position = 'absolute';
    sentinel.style.top = '50px'; // Scroll threshold
    sentinel.style.height = '1px';
    sentinel.style.width = '100%';
    sentinel.style.pointerEvents = 'none';
    document.body.prepend(sentinel);

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    });
    headerObserver.observe(sentinel);
  }

  // Scroll to Top Button visibility via IntersectionObserver
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  const scrollTarget = document.querySelector('.projects-header') || document.querySelector('.hero-section');
  if (scrollToTopBtn && scrollTarget) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Show scroll-to-top button once the top hero / header leaves viewport
        if (!entry.isIntersecting) {
          scrollToTopBtn.classList.add('visible');
        } else {
          scrollToTopBtn.classList.remove('visible');
        }
      });
    }, {
      threshold: 0.1
    });
    scrollObserver.observe(scrollTarget);

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll spy for navigation via IntersectionObserver
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
  if (sections.length > 0 && navLinks.length > 0) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentSectionId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px' // Triggers when section is in the active reading area
    });

    sections.forEach(section => spyObserver.observe(section));
  }

  // Dynamic system diagnostics simulator
  const viewports = document.querySelectorAll('.diagnostic-viewport');
  viewports.forEach((viewport, index) => {
    const textContainer = viewport.querySelector('.diagnostic-text-container');
    if (textContainer) {
      const dynamicLine = document.createElement('div');
      dynamicLine.style.fontFamily = 'var(--font-mono)';
      dynamicLine.style.fontSize = '9px';
      dynamicLine.style.color = 'rgba(167, 139, 250, 0.4)';
      dynamicLine.style.marginTop = '10px';
      dynamicLine.style.minHeight = '14px';
      textContainer.appendChild(dynamicLine);

      const logMessages = [
        'SYS_LOAD: PASS',
        'SIG_STRENGTH: 98%',
        'PORT_SCAN: CLR',
        'BUF_ADDR: 0x7FFF3B',
        'HW_TEMP: 32C',
        'MEM_ALLOC: OK',
        'SEC_MODE: ACTV',
        'INTEGRITY: 100%'
      ];

      let messageIndex = index % logMessages.length;
      
      setInterval(() => {
        messageIndex = (messageIndex + 1) % logMessages.length;
        dynamicLine.textContent = `[ ${logMessages[messageIndex]} ]`;
      }, 2500 + (index * 400));
    }
  });

  // Copy Email to Clipboard helper
  const emailVal = 'harinandankedambi@gmail.com';
  const copyElements = document.querySelectorAll('.copy-email');

  copyElements.forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      
      navigator.clipboard.writeText(emailVal).then(() => {
        showToast('Email copied! Opening Gmail...');
        setTimeout(() => {
          window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailVal}`, '_blank');
        }, 500);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        const textArea = document.createElement('textarea');
        textArea.value = emailVal;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          showToast('Email copied! Opening Gmail...');
          setTimeout(() => {
            window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailVal}`, '_blank');
          }, 500);
        } catch (copyErr) {
          showToast('Opening Gmail...');
          window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${emailVal}`, '_blank');
        }
        document.body.removeChild(textArea);
      });
    });
  });

  // Create & Show Toast Message
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- Scroll Reveal Animations System ---
  document.querySelectorAll('section').forEach(sec => {
    const tag = sec.querySelector('.section-tag');
    const title = sec.querySelector('.section-title');
    if (tag) tag.classList.add('scroll-reveal');
    if (title) title.classList.add('scroll-reveal');
  });

  const personnelCard = document.querySelector('.personnel-card');
  if (personnelCard) personnelCard.classList.add('scroll-reveal');

  const profileGrid = document.querySelector('.profile-grid');
  if (profileGrid) {
    profileGrid.classList.add('scroll-reveal-container');
    profileGrid.querySelectorAll('.profile-left, .profile-right').forEach(el => el.classList.add('scroll-reveal-item'));
  }

  const stackGrid = document.querySelector('.stack-grid');
  if (stackGrid) {
    stackGrid.classList.add('scroll-reveal-container');
    stackGrid.querySelectorAll('.stack-card').forEach(el => el.classList.add('scroll-reveal-item'));
  }

  const projectList = document.querySelector('.project-list');
  if (projectList) {
    projectList.classList.add('scroll-reveal-container');
    projectList.querySelectorAll('.project-item').forEach(el => el.classList.add('scroll-reveal-item'));
  }

  const expTimelines = document.querySelectorAll('.experience-timeline');
  expTimelines.forEach(timeline => {
    timeline.classList.add('scroll-reveal-container');
    timeline.querySelectorAll('.exp-timeline-item').forEach(el => el.classList.add('scroll-reveal-item'));
  });
  
  const publications = document.querySelectorAll('.publications-grid, .certifications-grid');
  publications.forEach(pub => {
    pub.classList.add('scroll-reveal-container');
    pub.querySelectorAll('.pub-card').forEach(el => el.classList.add('scroll-reveal-item'));
  });
  
  const publicationsTitles = document.querySelectorAll('.publications-title');
  publicationsTitles.forEach(title => {
    title.classList.add('scroll-reveal');
  });

  const tabContainer = document.querySelector('.experience-tabs-container');
  if (tabContainer) {
    tabContainer.classList.add('scroll-reveal');
  }

  const contactCard = document.querySelector('.contact-card');
  if (contactCard) {
    contactCard.classList.add('scroll-reveal-container');
    contactCard.querySelectorAll('.contact-left, .contact-right').forEach(el => el.classList.add('scroll-reveal-item'));
  }

  // Set stagger delays inline
  document.querySelectorAll('.scroll-reveal-container').forEach(container => {
    const items = container.querySelectorAll('.scroll-reveal-item');
    items.forEach((item, idx) => {
      item.style.transitionDelay = `${idx * 80}ms`;
    });
  });

  // Observe reveal elements
  const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-item');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('revealed');
        obs.unobserve(target);
        
        setTimeout(() => {
          target.style.transitionDelay = '';
          target.classList.remove('scroll-reveal', 'scroll-reveal-item', 'revealed');
        }, 1200);
      }
    });
  }, {
    threshold: 0.05,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // --- Experience Tab Switcher Controller ---
  const tabButtons = document.querySelectorAll('.exp-tab-btn');
  const tabContents = document.querySelectorAll('.experience-tab-content');
  const indicator = document.querySelector('.exp-tab-indicator');

  function updateIndicator(btn) {
    if (!indicator || !btn) return;
    indicator.style.width = `${btn.offsetWidth}px`;
    indicator.style.height = `${btn.offsetHeight}px`;
    indicator.style.transform = `translate3d(${btn.offsetLeft}px, ${btn.offsetTop}px, 0)`;
  }

  // Initialize indicator position
  const activeBtn = document.querySelector('.exp-tab-btn.active');
  if (activeBtn) {
    // Timeout and font load fallback to guarantee dimensions are exact
    setTimeout(() => updateIndicator(activeBtn), 50);
    setTimeout(() => updateIndicator(activeBtn), 300);
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateIndicator(activeBtn);
      });
    }
  }

  // Update position on window resize for responsiveness
  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.exp-tab-btn.active');
    if (currentActive) {
      updateIndicator(currentActive);
    }
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateIndicator(btn);

      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('id') === `exp-tab-${tabId}`) {
          content.classList.add('active');
        }
      });
    });
  });
});
