function throttle(func, limit) {
    let lastFunc;
    let lastRan;

    return function(...args) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function showDateTime() {
    const now = new Date();
    const datetimeStr = now.toLocaleString();
    console.log(datetimeStr);
}

const throttledShowDateTime = throttle(showDateTime, 1000);


setInterval(throttledShowDateTime, 100);