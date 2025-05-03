const apiKey = '81ac4c8bb4ab483aa11da3032808a2b4'; // 替换为你的 API 密钥
const url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.articles); // 输出新闻数据到控制台，便于调试
    const container = document.getElementById('news'); // 获取容器
    container.innerHTML = ''; // 清空容器，避免新闻累积
    
    // 确保只显示最多20条新闻
    const newsToShow = data.articles.slice(0, 20);
    newsToShow.forEach(article => {
      // 为每条新闻创建一个 div
      container.innerHTML += `
        <div class="news-item">
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News Image">` : ''}
          <h3>${article.title}</h3>
          <p>${article.description || '无描述'}</p>
          <a href="${article.url}" target="_blank">阅读更多</a>
        </div>`;
    });
  })
  .catch(error => console.error('错误:', error));