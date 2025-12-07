CREATE TABLE `image_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image_url` text NOT NULL,
	`image_hash` text NOT NULL,
	`objects` text,
	`people` text,
	`themes` text,
	`emotions` text,
	`colors` text,
	`concepts` text,
	`description` text,
	`article_title` text,
	`article_url` text,
	`cached` integer DEFAULT true,
	`created_at` text NOT NULL,
	`last_accessed` text NOT NULL,
	`access_count` integer DEFAULT 1
);
--> statement-breakpoint
CREATE UNIQUE INDEX `image_tags_image_url_unique` ON `image_tags` (`image_url`);--> statement-breakpoint
CREATE UNIQUE INDEX `image_tags_image_hash_unique` ON `image_tags` (`image_hash`);--> statement-breakpoint
CREATE INDEX `image_hash_idx` ON `image_tags` (`image_hash`);--> statement-breakpoint
CREATE INDEX `image_url_idx` ON `image_tags` (`image_url`);--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `image_tags` (`created_at`);