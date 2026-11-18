<template>
    <div class="container-fluid min-vh-100" id="landing">
        <div class="container">
            <div class="row row-cols-1 row-cols-md-2 min-vh-100">
                <div class="col mb-5 my-auto mb-md-auto">
                    <p class="small fw-lighter text-center text-md-start text-uppercase">
                        pens&pages — home
                    </p>
                    <p class="fs-1 text-center text-md-start landing-header">
                        Everyday tools for Thought & Making
                    </p>
                    <p class="fw-lighter text-center text-md-start mb-4">
                        From everyday pens to notebooks and stationery essentials, find the little things that make every day more productive.
                    </p>
                    <div class="text-center text-md-start">
                        <router-link :to="{ name: 'Products' }" class="btn p-3 px-5 shop-now-btn">
                            <span class="d-flex gap-2">
                                Shop Now
                                <i class="bi bi-bag"></i>
                            </span>
                        </router-link>
                    </div>
                </div>
                <div class="col text-center my-0 my-md-auto p-2 p-md-4">
                    <img src="https://picsum.photos/id/20/600/400" alt="..." class="img-fluid landing-img">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#landing {
    background: #301912;
    background: linear-gradient(45deg, rgba(48, 25, 18, 1) 0%, rgba(48, 27, 17, 1) 9%, rgba(46, 35, 24, 1) 27%, rgba(59, 48, 44, 1) 62%, rgba(74, 60, 50, 1) 80%, rgba(102, 82, 71, 1) 92%, rgba(128, 98, 87, 1) 100%);
    color: #F5EFE6;
}

.landing-img {
    border: 8px solid #140d06;
    border-radius: 10px;
}

.landing-header {
    font-family: 'Playfair Display', 'sans-serif';
}

.shop-now-btn {
    background: #C8B496;
    border-radius: 0;
}

.shop-now-btn:hover {
    background: #9c8c74;
    color: rgb(5, 5, 5);
}
</style>