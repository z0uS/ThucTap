/* ============================================================
   MAIN JS – Shared header/footer, utilities
   js/main.js
   ============================================================ */

/* ---------- Detect path depth ---------- */
const IS_ADMIN = window.location.pathname.includes('/admin/');
const BASE_PATH = IS_ADMIN ? '../' : '';

/* ---------- Header HTML ---------- */
function getHeaderHTML() {
  const navLinks = [
    { href: 'trangchu.html', label: 'Trang chủ' },
    { href: 'gioithieu.html', label: 'Giới thiệu' },
    { href: 'giangvien.html', label: 'Giảng viên' },
    { href: 'daotao.html', label: 'Đào tạo' },
    { href: 'tintuc.html', label: 'Tin tức' },
    { href: 'thongbao.html', label: 'Thông báo' },
    { href: 'tuyensinh.html', label: 'Tuyển sinh' },
    { href: 'lienhe.html', label: 'Liên hệ' }
  ];

  const currentPath = window.location.pathname.split('/').pop();
  const navHTML = navLinks.map(link => {
    const isActive = currentPath === link.href ? 'active' : '';
    return `<a href="${BASE_PATH}${link.href}" class="nav-link ${isActive}">${link.label}</a>`;
  }).join('');

  return `
  <header id="site-header">
    <div class="container">
      <div class="header-inner">
        <a href="${BASE_PATH}trangchu.html" class="header-logo">
          <img src="${BASE_PATH}assets/logo-tlu.svg" alt="Đại học Thăng Long" class="logo-img" onerror="this.src='';this.style.display='none'">
          <div class="logo-text">
            <span class="school">Trường Đại học Thăng Long</span>
            <span class="faculty">Khoa Công nghệ Thông tin</span>
          </div>
        </a>
        <nav class="main-nav">${navHTML}</nav>
        <div class="header-actions">
          <a href="${BASE_PATH}timkiem.html" class="search-btn" title="Tìm kiếm">🔍</a>
          <a href="${isAdminLoggedIn() ? BASE_PATH + 'admin/dashboard.html' : BASE_PATH + 'admin/login.html'}" class="admin-btn" title="Quản trị">
            ${isAdminLoggedIn() ? 'Đăng nhập' : 'Quản trị'}
          </a>
          <div class="hamburger" id="hamburger" onclick="toggleMobileNav()">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <!-- Mobile Nav -->
  <nav class="mobile-nav" id="mobile-nav">
    ${navLinks.map(link => {
    const isActive = currentPath === link.href ? 'active' : '';
    return `<a href="${BASE_PATH}${link.href}" class="nav-link ${isActive}">${link.label}</a>`;
  }).join('')}
    <a href="${BASE_PATH}timkiem.html" class="nav-link">🔍 Tìm kiếm</a>
    <a href="${BASE_PATH}admin/login.html" class="nav-link" style="margin-top:auto;opacity:0.5;font-size:0.8rem">Quản trị</a>
  </nav>`;
}

/* ---------- Footer HTML ---------- */
function getFooterHTML() {
  return `
  <footer id="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="header-logo">
            <img src="${BASE_PATH}assets/logo-tlu.svg" alt="Đại học Thăng Long" class="logo-img" style="filter:brightness(0) invert(1);height:40px;background:transparent;padding:0;border-radius:0;max-width:130px">
            <div class="logo-text">
              <span class="school">Trường Đại học Thăng Long</span>
              <span class="faculty">Khoa CNTT</span>
            </div>
          </div>
          <p class="footer-desc">Đào tạo nguồn nhân lực CNTT chất lượng cao, đáp ứng nhu cầu của xã hội và đóng góp cho sự phát triển khoa học – công nghệ của đất nước.</p>
          <div class="footer-social" style="margin-top:1rem">
            <a href="#" class="social-btn" title="Facebook">f</a>
            <a href="#" class="social-btn" title="YouTube">▶</a>
            <a href="#" class="social-btn" title="Email">✉</a>
            <a href="#" class="social-btn" title="LinkedIn">in</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">Liên kết nhanh</div>
          <div class="footer-links">
            <a href="${BASE_PATH}gioithieu.html"         class="footer-link">Giới thiệu khoa</a>
            <a href="${BASE_PATH}giangvien.html"       class="footer-link">Đội ngũ giảng viên</a>
            <a href="${BASE_PATH}daotao.html"      class="footer-link">Chương trình đào tạo</a>
            <a href="${BASE_PATH}tintuc.html"          class="footer-link">Tin tức – sự kiện</a>
            <a href="${BASE_PATH}thongbao.html" class="footer-link">Thông báo</a>
            <a href="${BASE_PATH}lienhe.html"       class="footer-link">Liên hệ</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">Chương trình đào tạo</div>
          <div class="footer-links">
            <a href="${BASE_PATH}daotao.html" class="footer-link">Công nghệ thông tin</a>
            <a href="${BASE_PATH}daotao.html" class="footer-link">Khoa học Máy tính</a>
            <a href="${BASE_PATH}daotao.html" class="footer-link">Hệ thống Thông tin</a>
            <a href="${BASE_PATH}daotao.html" class="footer-link">Mạng máy tính và TT dữ liệu</a>
            <a href="${BASE_PATH}daotao.html" class="footer-link">Trí tuệ Nhân tạo</a>
          </div>
        </div>
        <div>
          <div class="footer-heading">Liên hệ</div>
          <div class="footer-contact-item">
            <span class="icon">📍</span>
            <span>Đường Nghiêm Xuân Yêm, Phường Định Công, Thành phố Hà Nội</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">📞</span><span>1900 23 24 22</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">✉</span><span>info@thanglong.edu.vn</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">🕐</span><span>T2–T6: 07:30–17:00 | T7: 07:30–11:30</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-bottom">
        <span>© 2025 Khoa Công nghệ Thông tin – Trường Đại học Thăng Long. Bảo lưu mọi quyền.</span>
      </div>
    </div>
  </footer>`;
}

/* ---------- Inject Header & Footer ---------- */
function injectLayout() {
  const hEl = document.getElementById('header');
  const fEl = document.getElementById('footer');
  if (hEl) hEl.outerHTML = getHeaderHTML();
  if (fEl) fEl.outerHTML = getFooterHTML();
}

/* ---------- Mobile Nav Toggle ---------- */
function toggleMobileNav() {
  const nav = document.getElementById('mobile-nav');
  const burger = document.getElementById('hamburger');
  if (!nav || !burger) return;
  nav.classList.toggle('open');
  burger.classList.toggle('open');
}

/* ---------- Scroll effects ---------- */
function initScrollEffects() {
  const header = document.getElementById('site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ---------- Animated Counter ---------- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target || el.textContent);
  const duration = 1800; const step = 16;
  const increment = target / (duration / step);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = Math.floor(current).toLocaleString('vi-VN');
    if (current >= target) clearInterval(timer);
  }, step);
}

function initCounters() {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        animateCounter(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObs.observe(el));
}

/* ---------- Toast ---------- */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span style="font-size:1rem">${icons[type] || '✅'}</span><span class="toast-msg">${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.style.opacity = '0', 3000);
  setTimeout(() => toast.remove(), 3400);
}

/* ---------- Modal Helper ---------- */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('open');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('open');
}
// Close modal on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});
// Close modal on ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
});

/* ---------- Filter Tabs ---------- */
function initFilterTabs(options) {
  // options: { tabsSelector, itemsSelector, attr }
  const tabs = document.querySelectorAll(options.tabsSelector);
  const items = document.querySelectorAll(options.itemsSelector);
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      items.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset[options.attr || 'category'] === filter) ? '' : 'none';
      });
    });
  });
}

/* ---------- Accordion ---------- */
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      // Close all
      document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
      document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
      if (!isOpen) { body.classList.add('open'); header.classList.add('active'); }
    });
  });
}

/* ---------- Tab Switcher ---------- */
function initTabs(tabsSelector, contentSelector) {
  const tabBtns = document.querySelectorAll(tabsSelector);
  const tabContents = document.querySelectorAll(contentSelector);
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const target = document.getElementById(btn.dataset.tab);
      if (target) target.classList.add('active');
    });
  });
}

/* ---------- Pagination ---------- */
function renderPagination(container, currentPage, totalPages, onPageChange) {
  if (!container || totalPages <= 1) return;
  container.innerHTML = '';
  const prev = document.createElement('button');
  prev.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
  prev.textContent = '‹';
  prev.onclick = () => { if (currentPage > 1) onPageChange(currentPage - 1); };
  container.appendChild(prev);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    btn.textContent = i;
    btn.onclick = () => onPageChange(i);
    container.appendChild(btn);
  }

  const next = document.createElement('button');
  next.className = `page-btn ${currentPage === totalPages ? 'disabled' : ''}`;
  next.textContent = '›';
  next.onclick = () => { if (currentPage < totalPages) onPageChange(currentPage + 1); };
  container.appendChild(next);
}

/* ---------- Highlight search keyword ---------- */
function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark class="search-highlight">$1</mark>');
}

/* ---------- URL Params ---------- */
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  injectLayout();
  initScrollEffects();
  setTimeout(() => {
    initReveal();
    initCounters();
    initAccordion();
  }, 50);
});
