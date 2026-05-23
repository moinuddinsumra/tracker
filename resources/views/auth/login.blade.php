<!DOCTYPE html>
<html class="dark" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>Login - SECURE TERMINAL</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "inverse-primary": "#00677f",
                        "outline-variant": "#3c494e",
                        "on-tertiary-container": "#4d4c63",
                        "surface-container-high": "#002a55",
                        "secondary": "#e5b5ff",
                        "surface-dim": "#00132d",
                        "secondary-fixed": "#f4d9ff",
                        "outline": "#859399",
                        "surface-bright": "#163966",
                        "surface": "#00132d",
                        "surface-variant": "#103561",
                        "error-container": "#93000a",
                        "tertiary": "#dcdaf6",
                        "on-tertiary-fixed-variant": "#45455b",
                        "on-tertiary-fixed": "#1a1a2e",
                        "tertiary-fixed-dim": "#c6c4df",
                        "secondary-container": "#633480",
                        "primary-fixed-dim": "#47d6ff",
                        "primary-container": "#00d2ff",
                        "surface-container-low": "#001b3c",
                        "on-secondary-fixed": "#30004b",
                        "primary-fixed": "#b6ebff",
                        "secondary-fixed-dim": "#e5b5ff",
                        "surface-container-highest": "#103561",
                        "on-surface-variant": "#bbc9cf",
                        "on-surface": "#d5e3ff",
                        "background": "#00132d",
                        "primary": "#a5e7ff",
                        "on-error-container": "#ffdad6",
                        "surface-tint": "#47d6ff",
                        "on-background": "#d5e3ff",
                        "surface-container-lowest": "#000e24",
                        "on-primary-fixed-variant": "#004e60",
                        "tertiary-container": "#c0bed9",
                        "inverse-on-surface": "#09305c",
                        "inverse-surface": "#d5e3ff",
                        "surface-container": "#001f43",
                        "on-primary-fixed": "#001f28",
                        "error": "#ffb4ab",
                        "on-primary": "#003543",
                        "tertiary-fixed": "#e2e0fc",
                        "on-tertiary": "#2f2e43",
                        "on-secondary-fixed-variant": "#60327d",
                        "on-primary-container": "#00566a",
                        "on-secondary-container": "#d9a4f8",
                        "on-secondary": "#481965",
                        "on-error": "#690005"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "container-padding-desktop": "64px",
                        "container-padding-mobile": "20px",
                        "gutter": "24px",
                        "base": "8px",
                        "section-gap": "120px"
                    },
                    "fontFamily": {
                        "headline-lg-mobile": ["Space Grotesk"],
                        "label-sm": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-lg": ["Space Grotesk"],
                        "headline-xl": ["Space Grotesk"],
                        "headline-md": ["Space Grotesk"],
                        "body-lg": ["Inter"],
                        "body-md": ["Inter"]
                    },
                    "fontSize": {
                        "headline-lg-mobile": ["32px", {"lineHeight": "1.2", "fontWeight": "600"}],
                        "label-sm": ["12px", {"lineHeight": "1", "fontWeight": "500"}],
                        "label-md": ["14px", {"lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600"}],
                        "headline-lg": ["40px", {"lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600"}],
                        "headline-xl": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700"}],
                        "headline-md": ["24px", {"lineHeight": "1.4", "fontWeight": "500"}],
                        "body-lg": ["18px", {"lineHeight": "1.6", "fontWeight": "400"}],
                        "body-md": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}]
                    }
                }
            }
        }
    </script>
    <style>
        .cyber-grid {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
        }
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid;
            border-image-source: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100\x25);
            border-image-slice: 1;
        }
        .input-glass {
            background: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }
        .input-glass:focus {
            border-color: #00d2ff;
            box-shadow: inset 0 0 10px rgba(0, 210, 255, 0.2), 0 0 15px rgba(0, 210, 255, 0.1);
            outline: none;
        }
        .btn-glow {
            background: #00d2ff;
            color: #1a1a2e;
            box-shadow: 0 0 20px rgba(0, 210, 255, 0.5);
            transition: all 0.3s ease;
        }
        .btn-glow:hover {
            box-shadow: 0 0 30px rgba(0, 210, 255, 0.8);
            transform: translateY(-1px);
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen flex flex-col relative overflow-hidden">
    <!-- Atmospheric Background -->
    <div class="absolute inset-0 z-0">
        <div class="absolute inset-0 cyber-grid"></div>
        <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-container rounded-full opacity-[0.03] blur-[120px]"></div>
        <div class="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary-container rounded-full opacity-[0.02] blur-[150px]"></div>
    </div>
    
    <!-- Main Content Area -->
    <main class="flex-grow flex items-center justify-center relative z-10 px-container-padding-mobile md:px-container-padding-desktop py-12">
        <div class="glass-panel w-full max-w-md p-8 md:p-10 rounded-2xl relative overflow-hidden">
            <!-- Subtle Inner Sheen -->
            <div class="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>
            
            <div class="text-center mb-8">
                <h1 class="font-headline-lg text-headline-lg text-primary tracking-tighter mb-2 hidden md:block">SECURE TERMINAL</h1>
                <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tighter mb-2 md:hidden">SECURE TERMINAL</h1>
                <p class="font-body-md text-body-md text-on-surface-variant">System Authentication Required</p>
            </div>
            
            <!-- Error Block -->
            @if ($errors->any() || session('status'))
                <div class="mb-6 bg-error-container/20 border border-error/30 rounded-lg p-4 flex items-start gap-3 backdrop-blur-md">
                    <span class="material-symbols-outlined text-error mt-0.5">warning</span>
                    <div>
                        <p class="font-label-md text-label-md text-error mb-1">
                            {{ $errors->any() ? 'Access Denied' : 'Session Expired' }}
                        </p>
                        <p class="font-label-sm text-label-sm text-error/80">
                            {{ $errors->first('email') ?: session('status') }}
                        </p>
                    </div>
                </div>
            @endif
            
            <form action="{{ url('/login') }}" class="space-y-6" method="POST">
                @csrf
                <!-- Email Field -->
                <div>
                    <label class="block font-label-md text-label-md text-on-surface-variant mb-2" for="email">Email Address</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="material-symbols-outlined text-outline">mail</span>
                        </div>
                        <input class="input-glass w-full rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder-outline-variant focus:ring-0" 
                               id="email" name="email" value="{{ old('email') }}" placeholder="operator@core.sys" type="email" required autofocus/>
                    </div>
                </div>
                
                <!-- Password Field -->
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <label class="block font-label-md text-label-md text-on-surface-variant" for="password">Password</label>
                    </div>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span class="material-symbols-outlined text-outline">lock</span>
                        </div>
                        <input class="input-glass w-full rounded-lg py-3 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder-outline-variant focus:ring-0" 
                               id="password" name="password" placeholder="••••••••" type="password" required/>
                    </div>
                </div>
                
                <!-- Remember Me -->
                <div class="flex items-center">
                    <input class="h-4 w-4 rounded border-outline-variant bg-surface/50 text-primary-container focus:ring-primary-container focus:ring-offset-background" 
                           id="remember" name="remember" type="checkbox"/>
                    <label class="ml-2 block font-label-sm text-label-sm text-on-surface-variant" for="remember">
                        Retain session clearance
                    </label>
                </div>
                
                <!-- Submit Button -->
                <button class="btn-glow w-full flex justify-center py-3 px-4 rounded-lg font-label-md text-label-md uppercase tracking-wider" type="submit">
                    Authenticate
                </button>
            </form>
            
            <div class="mt-8 text-center border-t border-white/5 pt-6">
                <p class="font-label-sm text-label-sm text-on-surface-variant">
                    Require access? <span class="text-primary opacity-80">Clearance codes managed by System Admin.</span>
                </p>
            </div>
        </div>
    </main>
    
    <!-- Footer Component -->
    <footer class="w-full py-8 bg-transparent border-t border-white/5 flex flex-col md:flex-row justify-between items-center px-container-padding-desktop z-10 relative">
        <p class="font-label-sm text-label-sm text-outline mb-4 md:mb-0">
            © 2026 SECURE TERMINAL ENCRYPTION SYSTEMS
        </p>
        <div class="flex space-x-6">
            <a class="font-label-sm text-label-sm text-outline-variant hover:text-on-surface transition-colors opacity-80" href="#">Privacy Protocol</a>
            <a class="font-label-sm text-label-sm text-outline-variant hover:text-on-surface transition-colors opacity-80" href="#">Security Whitepaper</a>
        </div>
    </footer>
</body>
</html>
