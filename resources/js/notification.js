Echo.private('product-channel')
    .listen('ProductNotification', (e) => {
        console.log(e);
    });
