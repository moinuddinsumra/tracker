<!DOCTYPE html>
<html class="dark" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Activity Tracker - AETHER_OS</title>
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
    <script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "inverse-surface": "#d5e3ff",
                        "surface": "#00132d",
                        "on-secondary-fixed-variant": "#60327d",
                        "on-secondary": "#481965",
                        "on-secondary-fixed": "#30004b",
                        "on-tertiary-container": "#4d4c63",
                        "secondary-fixed": "#f4d9ff",
                        "on-surface": "#d5e3ff",
                        "background": "#00132d",
                        "tertiary-fixed": "#e2e0fc",
                        "outline-variant": "#3c494e",
                        "error": "#ffb4ab",
                        "primary-fixed-dim": "#47d6ff",
                        "inverse-on-surface": "#09305c",
                        "on-secondary-container": "#d9a4f8",
                        "tertiary-fixed-dim": "#c6c4df",
                        "surface-container-highest": "#103561",
                        "on-surface-variant": "#bbc9cf",
                        "on-error": "#690005",
                        "surface-container-lowest": "#000e24",
                        "on-tertiary": "#2f2e43",
                        "secondary-container": "#633480",
                        "error-container": "#93000a",
                        "secondary-fixed-dim": "#e5b5ff",
                        "primary-container": "#00d2ff",
                        "primary": "#a5e7ff",
                        "on-tertiary-fixed": "#1a1a2e",
                        "on-background": "#d5e3ff",
                        "surface-container-low": "#001b3c",
                        "surface-bright": "#163966",
                        "surface-tint": "#47d6ff",
                        "surface-container": "#001f43",
                        "on-tertiary-fixed-variant": "#45455b",
                        "tertiary": "#dcdaf6",
                        "surface-container-high": "#002a55",
                        "surface-dim": "#00132d",
                        "outline": "#859399",
                        "on-primary": "#003543",
                        "inverse-primary": "#00677f",
                        "on-error-container": "#ffdad6",
                        "primary-fixed": "#b6ebff",
                        "on-primary-container": "#00566a",
                        "on-primary-fixed": "#001f28",
                        "surface-variant": "#103561",
                        "on-primary-fixed-variant": "#004e60"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    "spacing": {
                        "container-padding-mobile": "20px",
                        "container-padding-desktop": "64px",
                        "section-gap": "120px",
                        "base": "8px",
                        "gutter": "24px"
                    },
                    "fontFamily": {
                        "headline-lg": ["Space Grotesk"],
                        "body-md": ["Inter"],
                        "label-sm": ["Inter"],
                        "headline-lg-mobile": ["Space Grotesk"],
                        "body-lg": ["Inter"],
                        "label-md": ["Inter"],
                        "headline-xl": ["Space Grotesk"],
                        "headline-md": ["Space Grotesk"]
                    },
                    "fontSize": {
                        "headline-lg": ["40px", { "lineHeight": "1.2", "letterSpacing": "-0.01em", "fontWeight": "600" }],
                        "body-md": ["16px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-sm": ["12px", { "lineHeight": "1", "fontWeight": "500" }],
                        "headline-lg-mobile": ["32px", { "lineHeight": "1.2", "fontWeight": "600" }],
                        "body-lg": ["18px", { "lineHeight": "1.6", "fontWeight": "400" }],
                        "label-md": ["14px", { "lineHeight": "1", "letterSpacing": "0.05em", "fontWeight": "600" }],
                        "headline-xl": ["64px", { "lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                        "headline-md": ["24px", { "lineHeight": "1.4", "fontWeight": "500" }]
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #00132d;
            background-image: 
                radial-gradient(circle at 15% 50%, rgba(0, 210, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 85% 30%, rgba(229, 181, 255, 0.05) 0%, transparent 50%);
            background-attachment: fixed;
            min-height: 100vh;
        }
        
        .glass-panel {
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }

        .glass-panel-high {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            overflow: hidden;
        }
        
        .glass-panel-high::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border: 0.5px solid rgba(255, 255, 255, 0.1);
            pointer-events: none;
        }

        .neon-glow-cyan {
            filter: drop-shadow(0 0 15px rgba(0, 210, 255, 0.4));
        }
        
        .neon-glow-purple {
            filter: drop-shadow(0 0 15px rgba(229, 181, 255, 0.4));
        }

        .btn-primary {
            background-color: #00d2ff;
            color: #1a1a2e;
            box-shadow: 0 0 15px rgba(0, 210, 255, 0.4);
            transition: all 0.3s ease;
        }
        .btn-primary:hover {
            box-shadow: 0 0 25px rgba(0, 210, 255, 0.6);
            transform: translateY(-1px);
        }

        /* Custom Scrollbar for tables */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2); 
        }
        ::-webkit-scrollbar-thumb {
            background: rgba(0, 210, 255, 0.3); 
            border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 210, 255, 0.6); 
        }
    </style>
</head>
<body class="text-on-surface antialiased overflow-x-hidden">
    <!-- Hidden Logout Form -->
    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="hidden">
        @csrf
    </form>

    <!-- TopNavBar -->
    <nav class="bg-white/5 dark:bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl flex justify-between items-center px-8 md:px-16 h-20 w-full fixed top-0 z-50">
        <div class="flex items-center gap-4">
            <span class="font-headline-md text-headline-md font-bold text-primary tracking-tighter">AETHER_OS</span>
        </div>
        <div class="flex items-center gap-6">
            <!-- Stitch Sync Status -->
            <div id="stitch-sync-tag" class="flex items-center gap-2 bg-secondary/10 border border-secondary/30 px-3 py-1.5 rounded-full neon-glow-purple">
                <div class="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                <span class="font-label-md text-label-md text-secondary text-xs uppercase font-semibold">Stitch: Active</span>
            </div>
            <!-- Glow Tag -->
            <div class="flex items-center gap-2 bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full neon-glow-cyan">
                <div class="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span class="font-label-md text-label-md text-primary text-xs uppercase font-semibold">Status: Online</span>
            </div>
            
            <div class="flex items-center gap-3 hidden md:flex">
                @if(Auth::user()->avatar)
                    <img src="{{ Auth::user()->avatar }}" alt="{{ Auth::user()->name }}" class="w-8 h-8 rounded-full border border-white/10 object-cover" referrerpolicy="no-referrer">
                @endif
                <span class="font-body-md text-body-md text-on-surface-variant">{{ Auth::user()->email }}</span>
            </div>
            <button onclick="document.getElementById('logout-form').submit();" class="font-label-md text-label-md btn-primary px-6 py-2.5 rounded hover:opacity-90 transition-all scale-95 active:scale-90">
                Logout
            </button>
        </div>
    </nav>
    
    <!-- SideNavBar -->
    <aside class="bg-white/3 dark:bg-white/3 backdrop-blur-2xl border-r border-white/10 shadow-xl fixed left-0 top-0 h-screen w-72 flex flex-col pt-24 pb-8 hidden md:flex z-40">
        <div class="px-6 mb-8 flex flex-col items-center border-b border-white/5 pb-6">
            @if(Auth::user()->avatar)
                <img src="{{ Auth::user()->avatar }}" alt="{{ Auth::user()->name }}" class="w-16 h-16 rounded-full border border-white/20 mb-4 object-cover neon-glow-purple" referrerpolicy="no-referrer">
            @else
                <div class="w-16 h-16 rounded-full bg-surface-container-high border border-white/20 mb-4 flex items-center justify-center neon-glow-purple">
                    <span class="material-symbols-outlined text-3xl text-secondary">admin_panel_settings</span>
                </div>
            @endif
            <h2 class="font-headline-md text-headline-md text-on-surface text-center px-2 truncate max-w-[240px]">{{ Auth::user()->name }}</h2>
            <p class="font-body-md text-body-md text-on-surface-variant text-sm mt-1 truncate max-w-[220px]">{{ Auth::user()->email }}</p>
        </div>
        <nav class="flex-1 flex flex-col gap-2">
            <!-- Active Link -->
            <a class="bg-white/10 text-primary border-l-4 border-primary px-6 py-4 flex items-center gap-4 transition-all" href="#">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">monitoring</span>
                <span class="font-label-md text-label-md">System Monitor</span>
            </a>
            <!-- Links -->
            <a class="text-on-surface-variant px-6 py-4 flex items-center gap-4 hover:bg-white/5 hover:text-primary transition-all duration-200" href="#">
                <span class="material-symbols-outlined">lock_open</span>
                <span class="font-label-md text-label-md">Access Control</span>
            </a>
            <a class="text-on-surface-variant px-6 py-4 flex items-center gap-4 hover:bg-white/5 hover:text-primary transition-all duration-200" href="#">
                <span class="material-symbols-outlined">history_edu</span>
                <span class="font-label-md text-label-md">Activity Logs</span>
            </a>
            <a class="text-on-surface-variant px-6 py-4 flex items-center gap-4 hover:bg-white/5 hover:text-primary transition-all duration-200" href="#">
                <span class="material-symbols-outlined">terminal</span>
                <span class="font-label-md text-label-md">Config Terminal</span>
            </a>
        </nav>
        
        <!-- Live Countdown Timer Display -->
        <div class="px-6 mt-auto">
            <div class="glass-panel p-4 rounded-lg border border-white/10 text-center">
                <p class="text-xs uppercase tracking-widest text-on-surface-variant mb-1">Terminal Session</p>
                <div class="flex items-center justify-center gap-2">
                    <span class="material-symbols-outlined text-primary text-lg">hourglass_empty</span>
                    <span id="countdown-display" class="font-mono font-bold text-lg text-primary">120s</span>
                </div>
                <p class="text-[10px] text-outline mt-1">Auto-logout on inactivity</p>
            </div>
        </div>
    </aside>
    
    <!-- Main Content -->
    <main class="pt-28 pb-12 px-8 md:px-16 md:ml-72 min-h-screen flex flex-col gap-12">
        <!-- Metrics Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Card 1 -->
            <div class="glass-panel p-8 rounded-xl flex flex-col justify-between relative group hover:bg-white/5 transition-colors">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                <div class="flex justify-between items-start mb-6">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Total Users</span>
                    <span class="material-symbols-outlined text-primary neon-glow-cyan" style="font-variation-settings: 'FILL' 1;">group</span>
                </div>
                <div id="stat-total-users" class="font-headline-xl text-4xl text-on-surface font-bold tracking-tighter">
                    {{ $totalUsers }}
                </div>
                <div class="mt-4 flex items-center gap-2 text-primary font-label-sm text-xs">
                    <span class="material-symbols-outlined text-sm">trending_up</span> Registries active
                </div>
            </div>
            <!-- Card 2 -->
            <div class="glass-panel p-8 rounded-xl flex flex-col justify-between relative group hover:bg-white/5 transition-colors">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-transparent opacity-50"></div>
                <div class="flex justify-between items-start mb-6">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Total Logins</span>
                    <span class="material-symbols-outlined text-secondary neon-glow-purple" style="font-variation-settings: 'FILL' 1;">login</span>
                </div>
                <div id="stat-total-logins" class="font-headline-xl text-4xl text-on-surface font-bold tracking-tighter">
                    {{ $totalLogins }}
                </div>
                <div class="mt-4 flex items-center gap-2 text-secondary font-label-sm text-xs">
                    <span class="material-symbols-outlined text-sm">trending_up</span> Terminal access hits
                </div>
            </div>
            <!-- Card 3 -->
            <div class="glass-panel p-8 rounded-xl flex flex-col justify-between relative group hover:bg-white/5 transition-colors">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50"></div>
                <div class="flex justify-between items-start mb-6">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Active Users</span>
                    <span class="material-symbols-outlined text-primary neon-glow-cyan" style="font-variation-settings: 'FILL' 1;">vital_signs</span>
                </div>
                <div id="stat-active-users" class="font-headline-xl text-4xl text-on-surface font-bold tracking-tighter">
                    {{ $activeUsers }}
                </div>
                <div class="mt-4 flex items-center gap-2 text-on-surface-variant font-label-sm text-xs">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Active status records
                </div>
            </div>
            <!-- Card 4 -->
            <div class="glass-panel p-8 rounded-xl flex flex-col justify-between relative group hover:bg-white/5 transition-colors">
                <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-outline to-transparent opacity-50"></div>
                <div class="flex justify-between items-start mb-6">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest text-xs">Last Login</span>
                    <span class="material-symbols-outlined text-outline" style="font-variation-settings: 'FILL' 1;">schedule</span>
                </div>
                <div id="stat-last-login-user" class="font-headline-md text-lg text-on-surface font-medium truncate max-w-[200px]" title="{{ $lastLoginUser }}">
                    {{ $lastLoginUser }}
                </div>
                <div id="stat-last-login-time" class="mt-4 flex items-center gap-2 text-on-surface-variant font-label-sm text-xs">
                    {{ $lastLoginTimeAgo }}
                </div>
            </div>
        </section>
        
        <!-- Data Tables Section -->
        <section class="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <!-- Table 1: Users -->
            <div class="glass-panel rounded-xl overflow-hidden flex flex-col">
                <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 class="font-headline-md text-xl text-on-surface font-semibold">Users Registry</h3>
                    <span class="material-symbols-outlined text-primary text-lg">badge</span>
                </div>
                <div class="overflow-x-auto flex-1 p-2">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="text-on-surface-variant font-label-md text-xs border-b border-white/5 uppercase tracking-wider">
                                <th class="p-4 font-normal">ID</th>
                                <th class="p-4 font-normal">Name</th>
                                <th class="p-4 font-normal">Email</th>
                                <th class="p-4 font-normal">Created At</th>
                            </tr>
                        </thead>
                        <tbody id="users-table-body" class="font-body-md text-sm">
                            @foreach($users as $u)
                                <tr class="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                                    <td class="p-4 text-primary font-mono text-xs">USR-{{ sprintf('%03d', $u->id) }}</td>
                                    <td class="p-4 font-medium">{{ $u->name }}</td>
                                    <td class="p-4 text-on-surface-variant">{{ $u->email }}</td>
                                    <td class="p-4 text-on-surface-variant">{{ $u->created_at ? $u->created_at->format('Y-m-d H:i') : 'N/A' }}</td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Table 2: Login Activities -->
            <div class="glass-panel rounded-xl overflow-hidden flex flex-col">
                <div class="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 class="font-headline-md text-xl text-on-surface font-semibold">Live Activity Stream</h3>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-secondary animate-pulse neon-glow-purple"></span>
                        <span class="font-label-sm text-xs text-secondary uppercase tracking-wider">Live Logs</span>
                    </div>
                </div>
                <div class="overflow-x-auto flex-1 p-2">
                    <table class="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr class="text-on-surface-variant font-label-md text-xs border-b border-white/5 uppercase tracking-wider">
                                <th class="p-4 font-normal">Activity ID</th>
                                <th class="p-4 font-normal">User Email</th>
                                <th class="p-4 font-normal">Login Count</th>
                                <th class="p-4 font-normal">IP Address</th>
                                <th class="p-4 font-normal">Login Time</th>
                                <th class="p-4 font-normal">Logout Time</th>
                                <th class="p-4 font-normal">Status</th>
                            </tr>
                        </thead>
                        <tbody id="activities-table-body" class="font-body-md text-sm">
                            @foreach($activities as $act)
                                <tr class="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                    <td class="p-4 text-secondary font-mono text-xs">ACT-{{ sprintf('%03d', $act->id) }}</td>
                                    <td class="p-4 text-on-surface-variant">{{ $act->email }}</td>
                                    <td class="p-4 font-mono text-xs text-center">{{ $act->login_count }}</td>
                                    <td class="p-4 font-mono text-xs text-on-surface-variant">{{ $act->ip_address }}</td>
                                    <td class="p-4 text-on-surface-variant">{{ $act->login_time ? $act->login_time->format('Y-m-d H:i:s') : 'N/A' }}</td>
                                    <td class="p-4 text-on-surface-variant">{{ $act->logout_time ? $act->logout_time->format('Y-m-d H:i:s') : 'N/A' }}</td>
                                    <td class="p-4">
                                        @if($act->status == 'Active')
                                            <span class="bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold">Active</span>
                                        @else
                                            <span class="bg-white/5 text-on-surface-variant border border-white/10 px-2 py-0.5 rounded-full text-[10px] uppercase">Terminated</span>
                                        @endif
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </main>

    <!-- Auto-Logout & Stitch Integration Script -->
    <script>
        // ==========================================
        // AUTO LOGOUT FEATURE (120 seconds inactivity)
        // ==========================================
        (function() {
            let inactivityLimit = 120; // 120 seconds
            let secondsRemaining = inactivityLimit;
            let countdownInterval;

            const countdownDisplay = document.getElementById('countdown-display');
            const logoutForm = document.getElementById('logout-form');

            function logoutUser() {
                clearInterval(countdownInterval);
                console.log("Inactivity limit reached. Executing terminal auto-logout protocol...");
                logoutForm.submit();
            }

            function updateDisplay() {
                countdownDisplay.textContent = `${secondsRemaining}s`;
                
                // Add red flashing warnings when session is about to expire (< 15s)
                if (secondsRemaining <= 15) {
                    countdownDisplay.classList.remove('text-primary');
                    countdownDisplay.classList.add('text-error', 'animate-pulse');
                } else {
                    countdownDisplay.classList.add('text-primary');
                    countdownDisplay.classList.remove('text-error', 'animate-pulse');
                }
            }

            function resetTimer() {
                secondsRemaining = inactivityLimit;
                updateDisplay();
            }

            function startTimer() {
                resetTimer();
                clearInterval(countdownInterval);
                countdownInterval = setInterval(() => {
                    secondsRemaining--;
                    updateDisplay();
                    if (secondsRemaining <= 0) {
                        logoutUser();
                    }
                }, 1000);
            }

            // Monitor browser activity events
            const activityEvents = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart', 'click'];
            activityEvents.forEach(eventName => {
                document.addEventListener(eventName, resetTimer, true);
            });

            // Start countdown immediately
            startTimer();
        })();

        // ==========================================
        // STITCH MCP DYNAMIC API SYNC INTEGRATION
        // ==========================================
        const StitchClient = {
            config: {
                projectId: "15830368362532184775",
                designSystemId: "assets/1a5c248d90c343568e96885cb6a3397a",
                syncInterval: 5000 // Poll API every 5 seconds
            },
            
            init() {
                console.log("Stitch Client Configured securely for Aether_OS. Linking Project ID: " + this.config.projectId);
                this.startSync();
            },

            async startSync() {
                const syncTag = document.getElementById('stitch-sync-tag');
                
                setInterval(async () => {
                    try {
                        // Dynamically fetch APIs
                        const response = await fetch('/dashboard-data', {
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest',
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (!response.ok) throw new Error('Terminal offline');
                        
                        const payload = await response.json();
                        if (payload.status === 'success') {
                            this.updateDashboardUI(payload.data);
                            
                            // Visual indicator for secure instant sync
                            syncTag.classList.remove('opacity-50', 'border-error/30', 'text-error');
                            syncTag.querySelector('div').className = 'w-2 h-2 rounded-full bg-secondary animate-pulse';
                            syncTag.querySelector('span').textContent = 'Stitch: Sync Active';
                        }
                    } catch (error) {
                        console.error('Stitch synchronization error: ', error);
                        // Status indicator when sync is interrupted
                        syncTag.classList.add('border-error/30', 'text-error');
                        syncTag.querySelector('div').className = 'w-2 h-2 rounded-full bg-error';
                        syncTag.querySelector('span').textContent = 'Stitch: Offline';
                    }
                }, this.config.syncInterval);
            },

            updateDashboardUI(data) {
                // 1. Calculate and update metrics
                let totalLogins = 0;
                let activeCount = 0;
                let lastLoginEmail = 'None';
                let lastLoginTimeVal = null;
                
                const userTableBody = document.getElementById('users-table-body');
                const activitiesTableBody = document.getElementById('activities-table-body');
                
                // Clear and rebuild users table if data changed
                let userRowsHtml = '';
                let activityRowsHtml = '';
                
                data.forEach(row => {
                    const count = parseInt(row.total_login_count) || 0;
                    totalLogins += count;
                    
                    if (row.session_status === 'Active') {
                        activeCount++;
                    }
                    
                    // Track latest login time
                    if (row.latest_login_time) {
                        const rowTime = new Date(row.latest_login_time);
                        if (!lastLoginTimeVal || rowTime > lastLoginTimeVal) {
                            lastLoginTimeVal = rowTime;
                            lastLoginEmail = row.email;
                        }
                    }
                    
                    // Format User table ID
                    const formattedUserId = `USR-${String(row.user_id).padStart(3, '0')}`;
                    
                    // Format created date (simplification)
                    const userDate = row.latest_login_time ? new Date(row.latest_login_time).toISOString().slice(0,10) : 'Registered';
                    
                    userRowsHtml += `
                        <tr class="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                            <td class="p-4 text-primary font-mono text-xs">${formattedUserId}</td>
                            <td class="p-4 font-medium">${row.name}</td>
                            <td class="p-4 text-on-surface-variant">${row.email}</td>
                            <td class="p-4 text-on-surface-variant">${userDate}</td>
                        </tr>
                    `;

                    // Generate activities rows if logged in
                    if (count > 0) {
                        const formattedActId = `ACT-${String(row.user_id).padStart(3, '0')}`;
                        const loginDateStr = row.latest_login_time ? new Date(row.latest_login_time).toISOString().slice(0, 19).replace('T', ' ') : 'N/A';
                        const logoutDateStr = row.session_status === 'Active' ? 'N/A' : (row.latest_login_time ? new Date(row.latest_login_time).toISOString().slice(0, 19).replace('T', ' ') : 'N/A');
                        
                        const statusBadge = row.session_status === 'Active' 
                            ? `<span class="bg-primary/10 text-primary border border-primary/30 px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold">Active</span>`
                            : `<span class="bg-white/5 text-on-surface-variant border border-white/10 px-2 py-0.5 rounded-full text-[10px] uppercase">Terminated</span>`;
                        
                        activityRowsHtml += `
                            <tr class="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer">
                                <td class="p-4 text-secondary font-mono text-xs">${formattedActId}</td>
                                <td class="p-4 text-on-surface-variant">${row.email}</td>
                                <td class="p-4 font-mono text-xs text-center">${count}</td>
                                <td class="p-4 font-mono text-xs text-on-surface-variant">${row.latest_ip_address || '0.0.0.0'}</td>
                                <td class="p-4 text-on-surface-variant">${loginDateStr}</td>
                                <td class="p-4 text-on-surface-variant">${row.session_status === 'Active' ? 'N/A' : logoutDateStr}</td>
                                <td class="p-4">${statusBadge}</td>
                            </tr>
                        `;
                    }
                });

                // Update Metrics Card Values
                document.getElementById('stat-total-users').textContent = data.length;
                document.getElementById('stat-total-logins').textContent = totalLogins;
                document.getElementById('stat-active-users').textContent = activeCount;
                document.getElementById('stat-last-login-user').textContent = lastLoginEmail;
                document.getElementById('stat-last-login-user').title = lastLoginEmail;
                
                if (lastLoginTimeVal) {
                    const secondsAgo = Math.floor((new Date() - lastLoginTimeVal) / 1000);
                    let timeAgoStr = 'Just now';
                    if (secondsAgo >= 60) {
                        const minutesAgo = Math.floor(secondsAgo / 60);
                        timeAgoStr = `${minutesAgo}m ago`;
                        if (minutesAgo >= 60) {
                            const hoursAgo = Math.floor(minutesAgo / 60);
                            timeAgoStr = `${hoursAgo}h ago`;
                        }
                    } else if (secondsAgo > 5) {
                        timeAgoStr = `${secondsAgo}s ago`;
                    }
                    document.getElementById('stat-last-login-time').textContent = timeAgoStr + ' • SECURE';
                } else {
                    document.getElementById('stat-last-login-time').textContent = 'Never';
                }

                // Smoothly update tables HTML if modified
                userTableBody.innerHTML = userRowsHtml;
                if (activityRowsHtml) {
                    activitiesTableBody.innerHTML = activityRowsHtml;
                } else {
                    activitiesTableBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-on-surface-variant opacity-50">No logins detected yet.</td></tr>`;
                }
            }
        };

        // Initialize Stitch Client Integration
        StitchClient.init();
    </script>
</body>
</html>
