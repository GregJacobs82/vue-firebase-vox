<template>
    <footer class="footer mt-auto px-3 py-2 bg-dark text-white-50" style="font-size:.75em;">
        <div class="d-flex align-items-center justify-content-between text-w35 w-100 fs-65rem">
            <div class="d-flex flex-column align-items-center align-items-sm-start">
                    <span class="mr-md-1">
                        &copy; <span class="d-none d-md-inline-block">Copyright</span> {{ new Date().getFullYear() }}
                        <a href="https://www.gregjacobs.com" target="_blank" class="text-decoration-none">GregJacobs.com</a>
                    </span>
                <span class="d-none d-md-inline-block">All Rights Reserved.</span>
            </div>
            <div class="text-right">
                <a href="https://github.com/GregJacobs82/vue-firebase-vox" target="_blank" class="d-flex align-items-center d-md-block text-nowrap text-decoration-none">
                    <span class="d-none d-md-inline-block"><i class="fas fa-microphone pe-1"></i> Vue Voxer on </span> Github
                </a>
            </div>
        </div>
    </footer>
</template>