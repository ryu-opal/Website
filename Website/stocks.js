document.addEventListener("DOMContentLoaded", function () {
    if (typeof TradingView !== "undefined") {
        new TradingView.widget({
            container_id: "chart", // 指定圖表容器
            autosize: true,
            symbol: "BINANCE:BTCUSDT",
            interval: "240",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            allow_symbol_change: true,
        });
    } else {
        console.error("TradingView widget not loaded. Check if tv.js is included correctly.");
    }
});