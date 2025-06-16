<?php

return [

    'backup' => [

        /*
         * The name of this application. You can use this name to monitor
         * the backups.
         */
        'name' => env('APP_NAME', 'laravel-backup'),

        'source' => [

            'files' => [

                /*
                 * The list of directories and files that will be included in the backup.
                 */
                'include' => [
                    base_path(),
                ],

                /*
                 * These directories and files will be excluded from the backup.
                 *
                 * Directories used by the backup process will automatically be excluded.
                 */
                'exclude' => [
                    base_path('vendor'),
                    base_path('node_modules'),
                    base_path('storage/app/backup-temp'),
                    base_path('storage/logs'),
                    base_path('.git'),
                ],

                /*
                 * Determines if symlinks should be followed.
                 */
                'follow_links' => false,

                /*
                 * Determines if it should avoid unreadable directories.
                 */
                'ignore_unreadable_directories' => false,

                /*
                 * This path is used to make directories in resulting zip-file relative
                 * Set to `null` to include complete absolute path
                 */
                'relative_path' => null,
            ],

            /*
             * The names of the connections to the databases that should be backed up
             * MySQL, PostgreSQL, SQLite and Mongo databases are supported.
             */
            'databases' => [
                'mysql',
            ],
        ],

        /*
         * The database dump can be compressed to decrease diskspace usage.
         */
        'database_dump_compressor' => null,

        /*
         * The file extension used for the database dump files.
         */
        'database_dump_file_extension' => '',

        'destination' => [

            /*
             * The filename prefix used for the backup zip file.
             */
            'filename_prefix' => env('BACKUP_FILENAME_PREFIX', ''),

            /*
             * The disk names on which the backups will be stored.
             */
            'disks' => [
                env('BACKUP_DISK', 'local'),
            ],
        ],

        /*
         * The directory where the temporary files will be stored.
         */
        'temporary_directory' => storage_path('app/backup-temp'),

        /*
         * The password to be used for archive encryption.
         * Set to `null` to disable encryption.
         */
        'password' => env('BACKUP_ARCHIVE_PASSWORD'),

        /*
         * The encryption algorithm to be used for archive encryption.
         */
        'encryption' => env('BACKUP_ENCRYPTION') ? \ZipArchive::EM_AES_256 : null,
    ],

    /*
     * You can get notified when specific events occur.
     */
    'notifications' => [

        'notifications' => [
            \Spatie\Backup\Notifications\Notifications\BackupHasFailed::class => 
                env('BACKUP_NOTIFICATIONS_ENABLED', false) ? ['mail'] : [],
            \Spatie\Backup\Notifications\Notifications\UnhealthyBackupWasFound::class => 
                env('BACKUP_NOTIFICATIONS_ENABLED', false) ? ['mail'] : [],
            \Spatie\Backup\Notifications\Notifications\CleanupHasFailed::class => 
                env('BACKUP_NOTIFICATIONS_ENABLED', false) ? ['mail'] : [],
            \Spatie\Backup\Notifications\Notifications\BackupWasSuccessful::class => 
                env('BACKUP_NOTIFICATIONS_ENABLED', false) ? ['mail'] : [],
            \Spatie\Backup\Notifications\Notifications\HealthyBackupWasFound::class => 
                env('BACKUP_NOTIFICATIONS_ENABLED', false) ? ['mail'] : [],
            \Spatie\Backup\Notifications\Notifications\CleanupWasSuccessful::class => 
                env('BACKUP_NOTIFICATIONS_ENABLED', false) ? ['mail'] : [],
        ],

        /*
         * Here you can specify the notifiable to which the notifications should be sent.
         */
        'notifiable' => \Spatie\Backup\Notifications\Notifiable::class,

        'mail' => [
            'to' => env('BACKUP_MAIL_TO', 'admin@example.com'),

            'from' => [
                'address' => env('MAIL_FROM_ADDRESS', 'hello@example.com'),
                'name' => env('MAIL_FROM_NAME', 'Laravel Backup'),
            ],
        ],

        'slack' => [
            'webhook_url' => env('BACKUP_SLACK_WEBHOOK_URL', ''),
            'channel' => env('BACKUP_SLACK_CHANNEL', null),
            'username' => env('BACKUP_SLACK_USERNAME', null),
            'icon' => env('BACKUP_SLACK_ICON', null),
        ],
    ],

    /*
     * Here you can specify which backups should be monitored.
     */
    'monitor_backups' => [
        [
            'name' => env('APP_NAME', 'laravel-backup'),
            'disks' => [env('BACKUP_DISK', 'local')],
            'health_checks' => [
                \Spatie\Backup\Tasks\Monitor\HealthChecks\MaximumAgeInDays::class => 
                    env('BACKUP_MAX_AGE_DAYS', 1),
                \Spatie\Backup\Tasks\Monitor\HealthChecks\MaximumStorageInMegabytes::class => 
                    env('BACKUP_MAX_STORAGE_MB', 5000),
            ],
        ],
    ],

    'cleanup' => [
        /*
         * The strategy that will be used to cleanup old backups.
         */
        'strategy' => \Spatie\Backup\Tasks\Cleanup\Strategies\DefaultStrategy::class,

        'default_strategy' => [
            /*
             * The number of days for which backups must be kept.
             */
            'keep_all_backups_for_days' => env('BACKUP_KEEP_ALL_DAYS', 7),

            /*
             * The number of days for which daily backups must be kept.
             */
            'keep_daily_backups_for_days' => env('BACKUP_KEEP_DAILY_DAYS', 16),

            /*
             * The number of weeks for which one weekly backup must be kept.
             */
            'keep_weekly_backups_for_weeks' => env('BACKUP_KEEP_WEEKLY_WEEKS', 8),

            /*
             * The number of months for which one monthly backup must be kept.
             */
            'keep_monthly_backups_for_months' => env('BACKUP_KEEP_MONTHLY_MONTHS', 4),

            /*
             * The number of years for which one yearly backup must be kept.
             */
            'keep_yearly_backups_for_years' => env('BACKUP_KEEP_YEARLY_YEARS', 2),

            /*
             * After cleaning up the backups remove the oldest backup until
             * this amount of megabytes has been reached.
             */
            'delete_oldest_backups_when_using_more_megabytes_than' => 
                env('BACKUP_DELETE_OLD_WHEN_MB', 5000),
        ],
    ],

];