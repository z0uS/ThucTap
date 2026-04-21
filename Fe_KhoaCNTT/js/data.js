/* ============================================================
   MOCK DATA & LOCALSTORAGE HELPERS
   js/data.js
   ============================================================ */

const DB_KEYS = {
  posts: 'cit_posts',
  faculty: 'cit_faculty',
  categories: 'cit_categories',
  announcements: 'cit_announcements',
  session: 'cit_admin_session',
  views: 'cit_post_views'
};

/* ---------- Default Data ---------- */
const DEFAULT_CATEGORIES = [
  { id: 1, name: 'Tin tức khoa', slug: 'tin-tuc', color: '#3b82f6' },
  { id: 2, name: 'Hoạt động sinh viên', slug: 'hoat-dong-sv', color: '#10b981' },
  { id: 3, name: 'Hội thảo & Sự kiện', slug: 'hoi-thao', color: '#8b5cf6' },
  { id: 4, name: 'Tuyển sinh', slug: 'tuyen-sinh', color: '#f59e0b' },
  { id: 5, name: 'Nghiên cứu khoa học', slug: 'nghien-cuu', color: '#ef4444' }
];

const DEFAULT_FACULTY = [
  {
    id: 1,
    name: 'TS. Nguyễn Doãn Cường',
    degree: 'TS',
    position: 'Trưởng khoa',
    specialization: 'Công nghệ Phần mềm, Kỹ thuật phần mềm',
    email: 'cuongnd@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Nguyen+Doan+Cuong&background=1e3a8a&color=fff&size=200',
    order: 1
  },
  {
    id: 2,
    name: 'ThS. Nguyễn Quốc Việt',
    degree: 'ThS',
    position: 'Phó trưởng khoa',
    specialization: 'Cơ sở dữ liệu, Quản trị hệ thống',
    email: 'vietnq2@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Nguyen+Quoc+Viet&background=7c3aed&color=fff&size=200',
    order: 2
  },
  {
    id: 3,
    name: 'ThS. Nguyễn Hùng Cường',
    degree: 'ThS',
    position: 'Trưởng khoa Khoa học máy tính',
    specialization: 'Lập trình Web, App, Phát triển phần mềm',
    email: 'cuongnh@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Nguyen+Hung+Cuong&background=0891b2&color=fff&size=200',
    order: 3
  },
  {
    id: 4,
    name: 'ThS. Đinh Thị Thuý',
    degree: 'ThS',
    position: 'Giảng viên',
    specialization: 'Khoa học Dữ liệu, Big Data',
    email: 'thuydt@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Dinh+Thi+Thuy&background=059669&color=fff&size=200',
    order: 4
  },
  {
    id: 5,
    name: 'ThS. Tân Văn Sơn',
    degree: 'ThS',
    position: 'Giảng viên',
    specialization: 'Mạng máy tính, Điện toán đám mây',
    email: 'sontv@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Tan+Van+Son&background=dc2626&color=fff&size=200',
    order: 5
  },
  {
    id: 6,
    name: 'TS. Lê Phế Đô',
    degree: 'TS',
    position: 'Giảng viên',
    specialization: 'Lập trình web, ReactJS, NodeJS',
    email: 'dolp@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Le+Phe+Do&background=d97706&color=fff&size=200',
    order: 6
  },
  {
    id: 7,
    name: 'PGS.TS. Hoàng Trọng Minh',
    degree: 'PGS.TS',
    position: 'Giảng viên',
    specialization: 'Cơ sở dữ liệu, SQL, NoSQL',
    email: 'minhht@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Hoang+Trong+Minh&background=be185d&color=fff&size=200',
    order: 7
  },
  {
    id: 8,
    name: 'ThS. Nguyễn Xuân Thanh',
    degree: 'ThS',
    position: 'Giảng viên',
    specialization: 'Điện toán đám mây, DevOps',
    email: 'thanhnx@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Nguyen+Xuan+Thanh&background=4338ca&color=fff&size=200',
    order: 8
  },
  {
    id: 9,
    name: 'Cao Đình Hoàng Minh',
    degree: 'CN',
    position: 'Giảng viên',
    specialization: 'Học máy, Deep Learning',
    email: 'minhcdh@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Cao+Dinh+Hoang+Minh&background=047857&color=fff&size=200',
    order: 9
  },
  {
    id: 10,
    name: 'Nguyễn Thị Nhung',
    degree: 'CN',
    position: 'Giảng viên',
    specialization: 'Phát triển Phần mềm, Agile/Scrum',
    email: 'nhungnt2@thanglong.edu.vn',
    image: 'https://ui-avatars.com/api/?name=Nguyen+Thi+Nhung&background=1d4ed8&color=fff&size=200',
    order: 10
  }
];

const DEFAULT_POSTS = [
  {
    id: 1, title: 'Sinh viên CNTT đạt giải Nhất cuộc thi AI Hackathon Toàn quốc 2025',
    content: 'Nhóm sinh viên Khoa Công nghệ Thông tin đã xuất sắc giành giải Nhất tại cuộc thi AI Hackathon Toàn quốc 2025 tổ chức tại Hà Nội. Đây là thành tích đáng tự hào, thể hiện chất lượng đào tạo của Khoa trong lĩnh vực trí tuệ nhân tạo và lập trình.',
    excerpt: 'Nhóm sinh viên Khoa CNTT xuất sắc giành giải Nhất tại AI Hackathon Toàn quốc 2025, khẳng định chất lượng đào tạo của Khoa.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
    category: 'tin-tuc', categoryName: 'Tin tức khoa',
    date: '2025-11-15', author: 'Admin', views: 1245
  },
  {
    id: 2, title: 'Hội thảo Quốc tế về Trí tuệ Nhân tạo và Ứng dụng trong Giáo dục',
    content: 'Khoa Công nghệ Thông tin phối hợp với các trường đại học hàng đầu tổ chức Hội thảo Quốc tế về Trí tuệ Nhân tạo và Ứng dụng trong Giáo dục. Sự kiện thu hút hơn 200 nhà khoa học và chuyên gia công nghệ từ 15 quốc gia tham dự.',
    excerpt: 'Hội thảo quốc tế thu hút hơn 200 nhà khoa học từ 15 quốc gia, trao đổi về ứng dụng AI trong lĩnh vực giáo dục.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
    category: 'hoi-thao', categoryName: 'Hội thảo & Sự kiện',
    date: '2025-10-28', author: 'Admin', views: 892
  },
  {
    id: 3, title: 'Khoa CNTT ký kết hợp tác chiến lược với FPT Software và VNG Corporation',
    content: 'Lễ ký kết biên bản ghi nhớ hợp tác giữa Khoa Công nghệ Thông tin với FPT Software và VNG Corporation đã được tổ chức long trọng. Chương trình hợp tác bao gồm đào tạo thực tế, học bổng và cơ hội việc làm cho sinh viên.',
    excerpt: 'Khoa CNTT ký kết hợp tác với FPT Software và VNG Corporation, mở ra nhiều cơ hội thực tập và việc làm cho sinh viên.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80',
    category: 'tin-tuc', categoryName: 'Tin tức khoa',
    date: '2025-10-10', author: 'Admin', views: 756
  },
  {
    id: 4, title: 'Cuộc thi Lập trình Sinh viên 2025 – Đăng ký tham gia ngay!',
    content: 'Khoa Công nghệ Thông tin tổ chức Cuộc thi Lập trình Sinh viên 2025 với tổng giải thưởng lên đến 50 triệu đồng. Cuộc thi mở rộng cho tất cả sinh viên các trường đại học trên toàn quốc, với nhiều bảng thi đa dạng.',
    excerpt: 'Cuộc thi lập trình với tổng giải thưởng 50 triệu đồng dành cho sinh viên toàn quốc. Hạn đăng ký: 30/11/2025.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    category: 'hoat-dong-sv', categoryName: 'Hoạt động sinh viên',
    date: '2025-09-20', author: 'Admin', views: 634
  },
  {
    id: 5, title: 'Seminar Blockchain, Web3 và Tương lai của Internet',
    content: 'Buổi seminar chuyên đề về Blockchain, Web3 và tương lai của Internet được tổ chức với sự tham gia của các chuyên gia hàng đầu từ ngành công nghiệp. Sinh viên có cơ hội tìm hiểu về các công nghệ tiên tiến và xu hướng phát triển trong tương lai.',
    excerpt: 'Seminar chuyên đề thu hút hàng trăm sinh viên tham dự, tìm hiểu về Blockchain và Web3 cùng các chuyên gia hàng đầu.',
    image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80',
    category: 'hoi-thao', categoryName: 'Hội thảo & Sự kiện',
    date: '2025-09-05', author: 'Admin', views: 523
  },
  {
    id: 6, title: 'Lễ Tốt nghiệp Đợt 2 Năm học 2024-2025 – Chúc mừng 320 Tân Kỹ sư CNTT',
    content: 'Lễ trao bằng tốt nghiệp đợt 2 năm học 2024-2025 đã diễn ra trang trọng với 320 tân kỹ sư và cử nhân Công nghệ Thông tin nhận bằng. Đây là dấu mốc quan trọng trong hành trình học tập và khởi nghiệp của các bạn sinh viên.',
    excerpt: '320 tân kỹ sư CNTT chính thức nhận bằng tốt nghiệp trong lễ trao bằng đợt 2 năm học 2024-2025.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
    category: 'tin-tuc', categoryName: 'Tin tức khoa',
    date: '2025-08-15', author: 'Admin', views: 445
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: 1, title: 'Thông báo lịch thi học kỳ II năm học 2025-2026',
    content: 'Phòng Đào tạo thông báo lịch thi kết thúc học phần học kỳ II năm học 2025-2026. Sinh viên vui lòng kiểm tra lịch thi trên hệ thống quản lý đào tạo và chuẩn bị đầy đủ giấy tờ cần thiết.',
    type: 'hoc-tap', typeName: 'Học tập',
    date: '2026-03-10', priority: 'high'
  },
  {
    id: 2, title: 'Thông báo đăng ký thực tập tốt nghiệp Hè 2026',
    content: 'Khoa CNTT thông báo sinh viên năm 4 đăng ký thực tập tốt nghiệp hè 2026. Danh sách doanh nghiệp tiếp nhận thực tập đã được cập nhật trên cổng thông tin Khoa. Hạn nộp hồ sơ: 15/04/2026.',
    type: 'thuc-tap', typeName: 'Thực tập',
    date: '2026-03-05', priority: 'high'
  },
  {
    id: 3, title: 'Thông báo thu học phí học kỳ II năm học 2025-2026',
    content: 'Phòng Tài chính – Kế toán thông báo thời gian thu học phí học kỳ II năm học 2025-2026 từ ngày 01/03/2026 đến 20/03/2026. Sinh viên có thể nộp học phí qua hệ thống ngân hàng điện tử hoặc tại phòng tài chính.',
    type: 'hoc-phi', typeName: 'Học phí',
    date: '2026-02-28', priority: 'normal'
  },
  {
    id: 4, title: 'Thông báo thi lại và học lại học kỳ I năm học 2025-2026',
    content: 'Danh sách sinh viên đủ điều kiện thi lại và học lại học kỳ I năm học 2025-2026 đã được công bố. Sinh viên vui lòng kiểm tra danh sách và đăng ký theo hướng dẫn từ Phòng Đào tạo.',
    type: 'thi-lai', typeName: 'Thi lại',
    date: '2026-02-20', priority: 'normal'
  },
  {
    id: 5, title: 'Thông báo xét đủ điều kiện tốt nghiệp đợt tháng 6/2026',
    content: 'Phòng Đào tạo thông báo lịch xét đủ điều kiện tốt nghiệp đợt tháng 6/2026. Sinh viên dự kiến tốt nghiệp cần nộp hồ sơ xét tốt nghiệp trước ngày 30/04/2026.',
    type: 'tot-nghiep', typeName: 'Tốt nghiệp',
    date: '2026-02-15', priority: 'normal'
  },
  {
    id: 6, title: 'Thông báo chương trình thực tập doanh nghiệp Hè 2026 cùng VinAI và MISA',
    content: 'Khoa CNTT phối hợp tổ chức chương trình thực tập doanh nghiệp hè 2026 tại VinAI Research và MISA JSC. Đây là cơ hội quý báu để sinh viên trải nghiệm môi trường làm việc thực tế. Hạn đăng ký: 10/04/2026.',
    type: 'thuc-tap', typeName: 'Thực tập',
    date: '2026-02-10', priority: 'high'
  }
];

/* ---------- LocalStorage Helpers ---------- */
function dbGet(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function dbSet(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function dbInit() {
  // Version key: thay đổi khi cập nhật DEFAULT_FACULTY để tự động reset
  const FACULTY_VERSION = 'v2_thanglong';
  const storedVersion = localStorage.getItem('cit_faculty_version');
  if (!dbGet(DB_KEYS.categories)) dbSet(DB_KEYS.categories, DEFAULT_CATEGORIES);
  // Reset faculty nếu version thay đổi hoặc chưa có dữ liệu
  if (storedVersion !== FACULTY_VERSION || !dbGet(DB_KEYS.faculty)) {
    dbSet(DB_KEYS.faculty, DEFAULT_FACULTY);
    localStorage.setItem('cit_faculty_version', FACULTY_VERSION);
  }
  if (!dbGet(DB_KEYS.posts)) dbSet(DB_KEYS.posts, DEFAULT_POSTS);
  if (!dbGet(DB_KEYS.announcements)) dbSet(DB_KEYS.announcements, DEFAULT_ANNOUNCEMENTS);
  if (!dbGet(DB_KEYS.views)) dbSet(DB_KEYS.views, {});
}

/* ---------- CRUD Helpers ---------- */
function getAll(key) { return dbGet(key) || []; }
function getById(key, id) { return getAll(key).find(x => x.id === id) || null; }

function create(key, item) {
  const list = getAll(key);
  const newId = list.length ? Math.max(...list.map(x => x.id)) + 1 : 1;
  const newItem = { ...item, id: newId };
  list.unshift(newItem);
  dbSet(key, list);
  return newItem;
}

function update(key, id, data) {
  const list = getAll(key);
  const idx = list.findIndex(x => x.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...data };
  dbSet(key, list);
  return list[idx];
}

function remove(key, id) {
  const list = getAll(key).filter(x => x.id !== id);
  dbSet(key, list);
}

/* ---------- View Tracking ---------- */
function trackView(postId) {
  const views = dbGet(DB_KEYS.views) || {};
  views[postId] = (views[postId] || 0) + 1;
  dbSet(DB_KEYS.views, views);
  // Also update in posts
  const posts = getAll(DB_KEYS.posts);
  const idx = posts.findIndex(p => p.id === postId);
  if (idx !== -1) { posts[idx].views = (posts[idx].views || 0) + 1; dbSet(DB_KEYS.posts, posts); }
}

/* ---------- Auth ---------- */
function adminLogin(username, password) {
  if (username === 'admin' && password === 'admin123') {
    dbSet(DB_KEYS.session, { username, loginTime: Date.now() });
    return true;
  }
  return false;
}

function adminLogout() {
  localStorage.removeItem(DB_KEYS.session);
  window.location.href = 'login.html';
}

function isAdminLoggedIn() {
  const session = dbGet(DB_KEYS.session);
  if (!session) return false;
  // Session expires in 8 hours
  return (Date.now() - session.loginTime) < 8 * 60 * 60 * 1000;
}

function requireAdmin() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'login.html'; return false;
  }
  return true;
}

/* ---------- Search ---------- */
function searchAll(query) {
  const q = String(query).toLowerCase().trim();
  if (!q) return [];
  const results = [];

  getAll(DB_KEYS.posts).forEach(p => {
    const title = String(p.title || '').toLowerCase();
    const content = String(p.content || '').toLowerCase();
    if (title.includes(q) || content.includes(q)) {
      results.push({ type: 'post', typeLabel: 'Bài viết', item: p, url: `tintuc.html?id=${p.id}` });
    }
  });

  getAll(DB_KEYS.announcements).forEach(a => {
    const title = String(a.title || '').toLowerCase();
    const content = String(a.content || '').toLowerCase();
    if (title.includes(q) || content.includes(q)) {
      results.push({ type: 'announcement', typeLabel: 'Thông báo', item: a, url: `thongbao.html?id=${a.id}` });
    }
  });

  getAll(DB_KEYS.faculty).forEach(f => {
    const name = String(f.name || '').toLowerCase();
    const spec = String(f.specialization || '').toLowerCase();
    if (name.includes(q) || spec.includes(q)) {
      results.push({ type: 'faculty', typeLabel: 'Giảng viên', item: f, url: `giangvien.html` });
    }
  });

  return results;
}

/* ---------- Date Formatting ---------- */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateLong(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function timeAgo(dateStr) {
  const now = new Date(); const d = new Date(dateStr);
  const diff = Math.floor((now - d) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
  return formatDate(dateStr);
}

/* ---------- Initialize on load ---------- */
dbInit();
