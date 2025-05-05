let allPosts = []; // 保存所有文章

// 用 fetch 加载 JSON
fetch('blog.json')
    .then(response => response.json())
    .then(posts => {
        allPosts = posts; // 保存原始数据
        const postsContainer = document.getElementById('blog');
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-output';
            const summary = post.content.substring(0, 20) + (post.content.length > 20 ? '...' : '');
            postElement.innerHTML = `
                <a href="detail.html?id=${post.id}">
                    <img src="${post.cover}" alt="${post.title}的封面图">
                    <div class="blog-txt">
                        <h2>${post.title}</h2>
                        <p><strong>作者:</strong> ${post.author}</p>
                        <p>${summary}</p>
                        <p><strong>日期:</strong> ${post.date}</p>
                    </div>
                </a>
                
            `;
            postElement.onclick = () => showDetail(post);
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('加载 JSON 失败:', error));

function filterblog() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const postsContainer = document.getElementById('blog');
    postsContainer.innerHTML = ''; // 清空

    // 简单搜索标题
    allPosts.forEach(post => {
        if (post.title.toLowerCase().includes(searchInput) || searchInput === '') {
            const postElement = document.createElement('div');
            postElement.className = 'blog-output';
            const summary = post.content.substring(0, 20) + (post.content.length > 20 ? '...' : '');
            postElement.innerHTML = `
                <a href="detail.html?id=${post.id}">
                    <img src="${post.cover}" alt="${post.title}的封面图">
                    <div class="blog-txt">
                        <h2>${post.title}</h2>
                        <p><strong>作者:</strong> ${post.author}</p>
                        <p>${summary}</p>
                        <p><strong>日期:</strong> ${post.date}</p>
                    </div>
                </a>
                
            `;
            postElement.onclick = () => showDetail(post);
            postsContainer.appendChild(postElement);
        }
    });
}
function filterByCategory(category) {
    const postsContainer = document.getElementById('blog');
    postsContainer.innerHTML = ''; // 清空

    allPosts.forEach(post => {
        if (category === '全部' || post.catergory === category) {
            const postElement = document.createElement('div');
            postElement.className = 'blog-output';
            const summary = post.content.substring(0, 20) + (post.content.length > 20 ? '...' : '');
            postElement.innerHTML = `
                <a href="detail.html?id=${post.id}">
                    <img src="${post.cover}" alt="${post.title}的封面图">
                    <div class="blog-txt">
                        <h2>${post.title}</h2>
                        <p><strong>作者:</strong> ${post.author}</p>
                        <p>${summary}</p>
                        <p><strong>日期:</strong> ${post.date}</p>
                    </div>
                </a>
            `;
            postElement.onclick = () => showDetail(post);
            postsContainer.appendChild(postElement);
        }
    });
}