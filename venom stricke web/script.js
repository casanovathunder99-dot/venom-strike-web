/* script.js – simple client-side demo data & interactions */
const samplePostsUrl = 'posts/sample-post.json';

const postsGrid = document.getElementById('postsGrid');
const searchInput = document.getElementById('searchInput');
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

menuToggle?.addEventListener('click', ()=> {
  navList.classList.toggle('show');
});

// Load sample data (local JSON)
async function loadPosts() {
  try {
    const res = await fetch(samplePostsUrl);
    const posts = await res.json();
    renderPosts(posts);
  } catch (err) {
    // fallback: simple demo posts
    const fallback = [
      {id:1,title:"Blague du jour",excerpt:"Un dev dit à sa cafetière...",cat:"fun",date:"2025-10-07"},
      {id:2,title:"Routine matinale",excerpt:"5 étapes pour booster ta productivité",cat:"motivation",date:"2025-10-06"},
      {id:3,title:"Mini animation CSS",excerpt:"Créer un loader néon en 5 lignes",cat:"animation",date:"2025-10-05"},
      {id:4,title:"Truc dev : vite.config",excerpt:"Astuce pour Vite + React",cat:"tech",date:"2025-10-04"}
    ];
    renderPosts(fallback);
  }
}

function renderPosts(posts){
  postsGrid.innerHTML = '';
  posts.forEach(p=>{
    const el = document.createElement('article');
    el.className = 'post';
    el.innerHTML = `
      <h4>${escapeHtml(p.title)}</h4>
      <p>${escapeHtml(p.excerpt)}</p>
      <div class="meta">${escapeHtml(p.cat)} • ${escapeHtml(p.date)} • <a href="post.html?sample">Lire</a></div>
    `;
    postsGrid.appendChild(el);
  });
}

function escapeHtml(s){ return (s||'').replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }

searchInput?.addEventListener('input', (e)=>{
  const q = e.target.value.toLowerCase().trim();
  if(!q){ loadPosts(); return; }
  // naive filter: fetch and filter
  fetch(samplePostsUrl).then(r=>r.json()).then(posts=>{
    const filtered = posts.filter(p=> (p.title+p.excerpt+p.cat).toLowerCase().includes(q));
    renderPosts(filtered);
  }).catch(()=>{ /* ignore */ });
});

// contact form demo
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', (ev)=>{
  ev.preventDefault();
  alert('Merci ! (formulaire demo — connecte un backend pour production)');
});

// bootstrap
loadPosts();
