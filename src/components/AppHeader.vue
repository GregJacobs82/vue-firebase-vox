<template>
    <header>
        <!-- Fixed navbar -->
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-fluid">
                <router-link :to="{ name: 'Home' }" class="text-decoration-none navbar-brand">
                    <div class="d-flex align-items-center">
                        <div class="px-3 text-white-50">
                            <i class="fas fa-microphone" style="font-size:1.65em;"></i>
                        </div>
                        <div>
                            <div>Vue Voxer</div>
                            <div style="font-size:.65em;">Realtime Voice Chat</div>
                        </div>
                    </div>
                </router-link>
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse" id="navbarCollapse" style="">
                    <ul class="navbar-nav ms-auto mb-2 mb-md-0 text-end">
                        <li class="nav-item active">
                            <a class="nav-link" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>