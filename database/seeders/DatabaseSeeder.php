<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'System Admin',
            'email' => 'admin@core.sys',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Elena Rostova',
            'email' => 'elena.r@cyberluxury.io',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Marcus Vance',
            'email' => 'mvance@nexus.net',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'Sarah Chen',
            'email' => 'schen.ops@aether.org',
            'password' => bcrypt('password'),
        ]);

        User::factory()->create([
            'name' => 'David Kim',
            'email' => 'dkim_99@cyberluxury.io',
            'password' => bcrypt('password'),
        ]);
    }
}
