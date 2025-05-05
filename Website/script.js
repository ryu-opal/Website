// 用 fetch 加载 JSON
fetch('blog.json')
    .then(response => response.json())
    .then(posts => {
        // 找到 HTML 中的 posts 容器
        const postsContainer = document.getElementById('blog');
        // 遍历 JSON 数据，生成 HTML
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-output';
            postElement.innerHTML = `
                <img src="${post.cover}" alt="${post.title}的封面图">
                <div class="blog-txt">
                    <h2>${post.title}</h2>
                    <p><strong>作者:</strong> ${post.author}</p>
                    <p>${post.content}</p>
                    <p><strong>日期:</strong> ${post.date}</p>
                </div>
            `;
            postsContainer.appendChild(postElement);
        });
    })
    .catch(error => console.error('加载 JSON 失败:', error));