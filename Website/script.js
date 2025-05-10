let allPosts = []; // 保存所有文章

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('blog');
    const searchInputElement = document.getElementById('searchInput');
    const searchIconElement = document.querySelector('.search-icon');

    if (!postsContainer) {
        console.error('错误：未能找到ID为 "blog" 的文章容器。');
    }

    // 显示文章的函数
    function displayPosts(postsToDisplay) {
        if (!postsContainer) return; // 如果容器不存在，则不执行任何操作
        postsContainer.innerHTML = ''; // 清空现有文章

        postsToDisplay.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-output';
            postElement.innerHTML = `
                <a href="detail.html?id=${post.id}">
                    <img src="${post.cover}" alt="${post.title}的封面图">
                    <div class="blog-txt">
                        <h2>${post.title}</h2>
                        <p><strong>作者:</strong> ${post.author}</p>
                        <p>${post.hook}</p>
                        <p><strong>日期:</strong> ${post.date}</p>
                    </div>
                </a>
            `;
            // 假设 showDetail 函数在其他地方定义或全局可用
            if (typeof showDetail === 'function') {
                postElement.onclick = () => showDetail(post);
            }
            postsContainer.appendChild(postElement);
        });
    }

    // 加载并显示初始文章
    fetch('blog.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            allPosts = posts;
            displayPosts(allPosts); // 初始显示所有文章
        })
        .catch(error => console.error('加载 blog.json 失败:', error));

    // 搜索功能 (挂载到 window 对象使其全局可用，以防万一，但主要由事件监听器调用)
    window.filterblog = function() {
        if (!searchInputElement) {
            console.error('搜索输入框 #searchInput 未找到。');
            return;
        }
        const searchTerm = searchInputElement.value.toLowerCase();
        const filteredPosts = allPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm) || searchTerm === ''
        );
        displayPosts(filteredPosts);
    }

    // 分类过滤功能 (挂载到 window 对象使其可被 HTML中的 onclick 调用)
    window.filterByCategory = function(category) {
        const filteredPosts = allPosts.filter(post =>
            category === '全部' || (post.catergory && post.catergory.toLowerCase() === category.toLowerCase()) // 确保比较时大小写一致
        );
        displayPosts(filteredPosts);
    }

    // 为搜索输入框添加事件监听器 (Enter 键)
    if (searchInputElement) {
        searchInputElement.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // 防止表单提交（如果输入框在表单内）
                window.filterblog();
            }
        });
    } else {
        console.error('搜索输入框 #searchInput 未找到，无法添加键盘事件监听器。');
    }

    // 为搜索图标添加事件监听器 (点击)
    if (searchIconElement) {
        searchIconElement.addEventListener('click', () => {
            window.filterblog();
        });
    } else {
        console.error('搜索图标 .search-icon 未找到，无法添加点击事件监听器。');
    }
});

// 如果 showDetail 是一个全局函数，请确保它已定义。
// 例如:
// function showDetail(post) {
//     console.log('显示详情:', post);
//     // window.location.href = `detail.html?id=${post.id}`;
// }

document.addEventListener('DOMContentLoaded', () => {
    // 首页最新博客展示
    const latestBlogContainer = document.getElementById('latest-blog');
    if (latestBlogContainer) {
        fetch('blog.json')
            .then(response => {
                if (!response.ok) throw new Error('加载 blog.json 失败');
                return response.json();
            })
            .then(posts => {
                if (!Array.isArray(posts) || posts.length === 0) {
                    latestBlogContainer.innerHTML = '<p>暂无博客内容。</p>';
                    return;
                }
                // 按 id 从大到小排序，取前5篇最新博客
                const latestPosts = posts.sort((a, b) => b.id - a.id).slice(0, 5);
                latestBlogContainer.innerHTML = latestPosts.map(latest => `
                    <div class="blog-output">
                        <a href="detail.html?id=${latest.id}">
                            <img src="${latest.cover}" alt="${latest.title}的封面图">
                            <div class="blog-txt">
                                <h2>${latest.title}</h2>
                                <p><strong>作者:</strong> ${latest.author}</p>
                                <p>${latest.hook}</p>
                                <p><strong>日期:</strong> ${latest.date}</p>
                            </div>
                        </a>
                    </div>
                `).join('');
            })
            .catch(() => {
                latestBlogContainer.innerHTML = '<p>加载最新博客失败。</p>';
            });
    }
    window.addAnimationEffect = function() {
        const elements = document.querySelectorAll('.animate');
        elements.forEach(element => {
            element.style.transition = 'transform 0.5s';
            element.addEventListener('mouseover', () => {
                element.style.transform = 'scale(1.1)';
            });
            element.addEventListener('mouseout', () => {
                element.style.transform = 'scale(1)';
            });
        });
    };
});