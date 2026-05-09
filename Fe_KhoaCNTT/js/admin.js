/* ============================================================
   ADMIN JS – CRUD, dashboard, auth guard
   js/admin.js
   ============================================================ */

/* ---------- Admin Sidebar Helper ---------- */
function getAdminSidebarHTML(activePage) {
  const links = [
    { href: 'dashboard.html', icon: '📊', label: 'Dashboard', id: 'dashboard' },
    { href: 'posts.html', icon: '📝', label: 'Bài viết', id: 'posts' },
    { href: 'faculty-mgmt.html', icon: '👩‍🏫', label: 'Giảng viên', id: 'faculty' },
    { href: 'categories.html', icon: '🏷️', label: 'Danh mục', id: 'categories' },
  ];

  const navHTML = links.map(l => `
    <a href="${l.href}" class="sidebar-link ${activePage === l.id ? 'active' : ''}">
      <span class="icon">${l.icon}</span> ${l.label}
    </a>`).join('');

  const session = (typeof dbGet !== 'undefined' ? dbGet(DB_KEYS.session) : null) || { username: 'Admin' };

  return `
  <aside class="admin-sidebar" id="admin-sidebar">
    <div class="sidebar-header">
      <img src="${BASE_PATH}assets/logo-tlu.svg" alt="Đại học Thăng Long" class="logo-img" onerror="this.src='';this.style.display='none'">
      <div>
        <div class="sidebar-title">Quản trị Khoa</div>
        <span class="sidebar-subtitle">Khoa Công nghệ Thông tin</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-title">Quản lý nội dung</div>
      ${navHTML}
      <div class="sidebar-section-title" style="margin-top:1.5rem">Công cụ</div>
      <a href="../trangchu.html" class="sidebar-link" target="_blank">
        <span class="icon">🌐</span> Xem website
      </a>
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">${session.username ? session.username[0].toUpperCase() : 'A'}</div>
        <div>
          <div class="sidebar-user-name">${session.username || 'Admin'}</div>
          <div class="sidebar-user-role">Quản trị viên</div>
        </div>
      </div>
      <button class="sidebar-logout" onclick="adminLogout()">🚪 Đăng xuất</button>
    </div>
  </aside>`;
}

function getAdminTopbarHTML(title) {
  return `
  <div class="admin-topbar">
    <div>
      <div class="topbar-title">${title}</div>
    </div>
    <div class="topbar-right">
      <button class="topbar-btn" title="Thông báo">🔔</button>
      <span class="topbar-user-name">Xin chào, Admin</span>
    </div>
  </div>`;
}

/* ---------- Inject admin layout ---------- */
function injectAdminLayout(activePage, pageTitle) {
  const wrapper = document.getElementById('admin-wrapper');
  if (!wrapper) return;
  const sidebarEl = wrapper.querySelector('#sidebar-placeholder');
  const topbarEl = wrapper.querySelector('#topbar-placeholder');
  if (sidebarEl) sidebarEl.outerHTML = getAdminSidebarHTML(activePage);
  if (topbarEl) topbarEl.outerHTML = getAdminTopbarHTML(pageTitle);
}

/* ---------- Dashboard Stats ---------- */
function renderDashboardStats() {
  const posts = getAll(DB_KEYS.posts);
  const faculty = getAll(DB_KEYS.faculty);
  const categories = getAll(DB_KEYS.categories);
  const announcements = getAll(DB_KEYS.announcements);
  const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);

  function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }
  setEl('stat-posts', posts.length);
  setEl('stat-faculty', faculty.length);
  setEl('stat-categories', categories.length);
  setEl('stat-announcements', announcements.length);
  setEl('stat-views', totalViews.toLocaleString('vi-VN'));
}

/* ---------- Dashboard Bar Chart ---------- */
function renderBarChart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const posts = getAll(DB_KEYS.posts);
  // Monthly posts for last 6 months (mock)
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push({ label: d.toLocaleDateString('vi-VN', { month: 'short' }), count: Math.floor(Math.random() * 8) + 2 });
  }
  const maxCount = Math.max(...months.map(m => m.count));
  container.innerHTML = months.map(m => `
    <div class="bar-item">
      <div class="bar-value">${m.count}</div>
      <div class="bar" style="height:${(m.count / maxCount) * 120}px" title="${m.count} bài"></div>
      <div class="bar-label">${m.label}</div>
    </div>`).join('');
}

/* ---------- POSTS CRUD ---------- */
let currentPostPage = 1;
const POSTS_PER_PAGE = 8;

function renderPostsTable(filter = '', page = 1) {
  const tbody = document.getElementById('posts-tbody');
  if (!tbody) return;
  let posts = getAll(DB_KEYS.posts);
  if (filter) posts = posts.filter(p =>
    p.title.toLowerCase().includes(filter.toLowerCase()) ||
    p.categoryName?.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const sliced = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  if (!sliced.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem">Không có bài viết nào</td></tr>`;
  } else {
    tbody.innerHTML = sliced.map(p => `
      <tr>
        <td><strong>${p.title}</strong></td>
        <td><span class="badge badge-secondary">${p.categoryName || '–'}</span></td>
        <td>${formatDate(p.date)}</td>
        <td>${p.author || 'Admin'}</td>
        <td><span style="color:#64748b;font-size:0.8rem">👁 ${p.views || 0}</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn edit" onclick="openEditPost(${p.id})" title="Sửa">✏️</button>
            <button class="action-btn delete" onclick="confirmDeletePost(${p.id})" title="Xóa">🗑️</button>
          </div>
        </td>
      </tr>`).join('');
  }

  const countEl = document.getElementById('posts-count');
  if (countEl) countEl.textContent = `Hiển thị ${sliced.length}/${posts.length} bài viết`;
  renderPagination(document.getElementById('posts-pagination'), page, totalPages, (p) => {
    currentPostPage = p; renderPostsTable(filter, p);
  });
}

function populateCategorySelect(selectId, selectedSlug = '') {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  const cats = getAll(DB_KEYS.categories);
  sel.innerHTML = cats.map(c =>
    `<option value="${c.slug}" data-name="${c.name}" ${c.slug === selectedSlug ? 'selected' : ''}>${c.name}</option>`
  ).join('');
}

function openAddPost() {
  document.getElementById('post-modal-title').textContent = 'Thêm bài viết mới';
  document.getElementById('post-form').reset();
  document.getElementById('post-id').value = '';
  document.getElementById('post-img-preview').classList.remove('show');
  populateCategorySelect('post-category');
  openModal('post-modal');
}

function openEditPost(id) {
  const p = getById(DB_KEYS.posts, id);
  if (!p) return;
  document.getElementById('post-modal-title').textContent = 'Chỉnh sửa bài viết';
  document.getElementById('post-id').value = p.id;
  document.getElementById('post-title').value = p.title;
  document.getElementById('post-content').value = p.content || '';
  document.getElementById('post-excerpt').value = p.excerpt || '';
  document.getElementById('post-image').value = p.image || '';
  document.getElementById('post-date').value = p.date || '';
  document.getElementById('post-author').value = p.author || 'Admin';
  populateCategorySelect('post-category', p.category);
  const prev = document.getElementById('post-img-preview');
  if (p.image) { prev.src = p.image; prev.classList.add('show'); } else prev.classList.remove('show');
  openModal('post-modal');
}

function savePost() {
  const idVal = document.getElementById('post-id').value;
  const catSel = document.getElementById('post-category');
  const catSlug = catSel.value;
  const catName = catSel.options[catSel.selectedIndex]?.dataset.name || catSlug;
  const data = {
    title: document.getElementById('post-title').value.trim(),
    content: document.getElementById('post-content').value.trim(),
    excerpt: document.getElementById('post-excerpt').value.trim(),
    image: document.getElementById('post-image').value.trim(),
    category: catSlug, categoryName: catName,
    date: document.getElementById('post-date').value || new Date().toISOString().split('T')[0],
    author: document.getElementById('post-author').value.trim() || 'Admin',
    views: 0
  };
  if (!data.title) { showToast('Vui lòng nhập tiêu đề bài viết', 'error'); return; }

  if (idVal) {
    update(DB_KEYS.posts, parseInt(idVal), data);
    showToast('Đã cập nhật bài viết thành công!', 'success');
  } else {
    create(DB_KEYS.posts, data);
    showToast('Đã thêm bài viết thành công!', 'success');
  }
  closeModal('post-modal');
  renderPostsTable('', currentPostPage);
  renderDashboardStats && renderDashboardStats();
}

function confirmDeletePost(id) {
  if (confirm('Bạn có chắc muốn xóa bài viết này không?')) {
    remove(DB_KEYS.posts, id);
    showToast('Đã xóa bài viết', 'warning');
    renderPostsTable('', currentPostPage);
  }
}

/* ---------- FACULTY CRUD ---------- */
function renderFacultyTable(filter = '') {
  const tbody = document.getElementById('faculty-tbody');
  if (!tbody) return;
  let list = getAll(DB_KEYS.faculty);
  if (filter) list = list.filter(f =>
    f.name.toLowerCase().includes(filter.toLowerCase()) ||
    f.position?.toLowerCase().includes(filter.toLowerCase()) ||
    f.specialization?.toLowerCase().includes(filter.toLowerCase())
  );
  list.sort((a, b) => (a.order || 99) - (b.order || 99));

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:2rem">Không có giảng viên nào</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(f => `
    <tr>
      <td><img src="${f.image}" alt="${f.name}" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #e2e8f0"></td>
      <td><strong>${f.name}</strong></td>
      <td><span class="badge badge-primary">${f.degree || '–'}</span></td>
      <td>${f.position || '–'}</td>
      <td style="font-size:0.8rem;color:#64748b">${f.specialization || '–'}</td>
      <td>
        <div class="action-btns">
          <button class="action-btn edit" onclick="openEditFaculty(${f.id})" title="Sửa">✏️</button>
          <button class="action-btn delete" onclick="confirmDeleteFaculty(${f.id})" title="Xóa">🗑️</button>
        </div>
      </td>
    </tr>`).join('');
  const countEl = document.getElementById('faculty-count');
  if (countEl) countEl.textContent = `Tổng: ${list.length} giảng viên`;
}

function openAddFaculty() {
  document.getElementById('faculty-modal-title').textContent = 'Thêm giảng viên mới';
  document.getElementById('faculty-form').reset();
  document.getElementById('faculty-id').value = '';
  document.getElementById('faculty-img-preview').classList.remove('show');
  openModal('faculty-modal');
}

function openEditFaculty(id) {
  const f = getById(DB_KEYS.faculty, id);
  if (!f) return;
  document.getElementById('faculty-modal-title').textContent = 'Chỉnh sửa giảng viên';
  document.getElementById('faculty-id').value = f.id;
  document.getElementById('faculty-name').value = f.name || '';
  document.getElementById('faculty-degree').value = f.degree || '';
  document.getElementById('faculty-position').value = f.position || '';
  document.getElementById('faculty-specialization').value = f.specialization || '';
  document.getElementById('faculty-email').value = f.email || '';
  document.getElementById('faculty-image').value = f.image || '';
  const prev = document.getElementById('faculty-img-preview');
  if (f.image) { prev.src = f.image; prev.classList.add('show'); } else prev.classList.remove('show');
  openModal('faculty-modal');
}

function saveFaculty() {
  const idVal = document.getElementById('faculty-id').value;
  const data = {
    name: document.getElementById('faculty-name').value.trim(),
    degree: document.getElementById('faculty-degree').value.trim(),
    position: document.getElementById('faculty-position').value.trim(),
    specialization: document.getElementById('faculty-specialization').value.trim(),
    email: document.getElementById('faculty-email').value.trim(),
    image: document.getElementById('faculty-image').value.trim() ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(document.getElementById('faculty-name').value)}&background=1e3a8a&color=fff&size=200`
  };
  if (!data.name) { showToast('Vui lòng nhập tên giảng viên', 'error'); return; }

  if (idVal) {
    update(DB_KEYS.faculty, parseInt(idVal), data);
    showToast('Đã cập nhật thông tin giảng viên!', 'success');
  } else {
    create(DB_KEYS.faculty, data);
    showToast('Đã thêm giảng viên thành công!', 'success');
  }
  closeModal('faculty-modal');
  renderFacultyTable();
}

function confirmDeleteFaculty(id) {
  if (confirm('Bạn có chắc muốn xóa giảng viên này không?')) {
    remove(DB_KEYS.faculty, id);
    showToast('Đã xóa giảng viên', 'warning');
    renderFacultyTable();
  }
}

/* ---------- CATEGORIES CRUD ---------- */
function renderCategoriesTable(filter = '') {
  const tbody = document.getElementById('cat-tbody');
  if (!tbody) return;
  let list = getAll(DB_KEYS.categories);
  if (filter) list = list.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  const posts = getAll(DB_KEYS.posts);

  if (!list.length) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:2rem">Không có danh mục nào</td></tr>`;
    return;
  }
  tbody.innerHTML = list.map(c => {
    const count = posts.filter(p => p.category === c.slug).length;
    return `
      <tr>
        <td><span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${c.color || '#3b82f6'};margin-right:0.5rem;vertical-align:middle"></span><strong>${c.name}</strong></td>
        <td style="font-family:monospace;font-size:0.82rem;color:#64748b">${c.slug}</td>
        <td><span class="badge badge-secondary">${count} bài</span></td>
        <td>
          <div class="action-btns">
            <button class="action-btn edit" onclick="openEditCategory(${c.id})" title="Sửa">✏️</button>
            <button class="action-btn delete" onclick="confirmDeleteCategory(${c.id})" title="Xóa">🗑️</button>
          </div>
        </td>
      </tr>`;
  }).join('');
  const countEl = document.getElementById('cat-count');
  if (countEl) countEl.textContent = `Tổng: ${list.length} danh mục`;
}

function openAddCategory() {
  document.getElementById('cat-modal-title').textContent = 'Thêm danh mục mới';
  document.getElementById('cat-form').reset();
  document.getElementById('cat-id').value = '';
  openModal('cat-modal');
}

function openEditCategory(id) {
  const c = getById(DB_KEYS.categories, id);
  if (!c) return;
  document.getElementById('cat-modal-title').textContent = 'Chỉnh sửa danh mục';
  document.getElementById('cat-id').value = c.id;
  document.getElementById('cat-name').value = c.name || '';
  document.getElementById('cat-slug').value = c.slug || '';
  document.getElementById('cat-color').value = c.color || '#3b82f6';
  openModal('cat-modal');
}

function saveCategory() {
  const idVal = document.getElementById('cat-id').value;
  const name = document.getElementById('cat-name').value.trim();
  const slug = document.getElementById('cat-slug').value.trim() ||
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  const color = document.getElementById('cat-color').value;
  if (!name) { showToast('Vui lòng nhập tên danh mục', 'error'); return; }

  const data = { name, slug, color };
  if (idVal) {
    update(DB_KEYS.categories, parseInt(idVal), data);
    showToast('Đã cập nhật danh mục!', 'success');
  } else {
    create(DB_KEYS.categories, data);
    showToast('Đã thêm danh mục thành công!', 'success');
  }
  closeModal('cat-modal');
  renderCategoriesTable();
}

function confirmDeleteCategory(id) {
  if (confirm('Bạn có chắc muốn xóa danh mục này không?')) {
    remove(DB_KEYS.categories, id);
    showToast('Đã xóa danh mục', 'warning');
    renderCategoriesTable();
  }
}

/* ---------- Auto-generate slug ---------- */
document.addEventListener('input', e => {
  if (e.target.id === 'cat-name') {
    const slugEl = document.getElementById('cat-slug');
    if (slugEl && !document.getElementById('cat-id').value) {
      slugEl.value = e.target.value.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/gi, 'd').replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    }
  }
  // Post image preview
  if (e.target.id === 'post-image' || e.target.id === 'faculty-image') {
    const prevId = e.target.id === 'post-image' ? 'post-img-preview' : 'faculty-img-preview';
    const prev = document.getElementById(prevId);
    if (prev && e.target.value) { prev.src = e.target.value; prev.classList.add('show'); }
    else if (prev) prev.classList.remove('show');
  }
});
