CREATE TABLE IF NOT EXISTS `milestone` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`name` varchar(200) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tasks` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`description` varchar(1000) NOT NULL,
	`due_date` date NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `tasks_milestones` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`task_id` int NOT NULL,
	`milestone_id` int NOT NULL,
	`status` int NOT NULL,
	PRIMARY KEY (`id`)
);



ALTER TABLE `tasks_milestones` ADD CONSTRAINT `tasks_milestones_fk1` FOREIGN KEY (`task_id`) REFERENCES `tasks`(`id`);

ALTER TABLE `tasks_milestones` ADD CONSTRAINT `tasks_milestones_fk2` FOREIGN KEY (`milestone_id`) REFERENCES `milestone`(`id`);