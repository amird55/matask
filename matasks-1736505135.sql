-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 24, 2025 at 10:20 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `matask`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
                              `id` int(11) NOT NULL,
                              `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `milestone`
--

CREATE TABLE `milestone` (
                             `id` int(11) NOT NULL,
                             `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `milestone`
--

INSERT INTO `milestone` (`id`, `name`) VALUES
                                           (1, 'הקהה צילועים'),
                                           (2, 'צבע 2');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
                         `id` int(11) NOT NULL,
                         `description` varchar(1000) NOT NULL,
                         `due_date` date NOT NULL,
                         `worker_id` int(11) NOT NULL,
                         `categ_id` int(11) NOT NULL,
                         `progress_prcnt` tinyint(4) NOT NULL,
                         `is_arsal` tinyint(4) NOT NULL,
                         `parent_id` int(11) NOT NULL,
                         `ordr` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `description`, `due_date`, `worker_id`, `categ_id`, `progress_prcnt`, `is_arsal`, `parent_id`, `ordr`) VALUES
                                                                                                                                      (2, 'matask good', '0000-00-00', 0, 0, 0, 0, 0, 1),
                                                                                                                                      (3, 'מטלה 2', '0000-00-00', 0, 0, 0, 0, 0, 3),
                                                                                                                                      (4, 'matask good 2', '0000-00-00', 0, 0, 0, 0, 0, 5),
                                                                                                                                      (5, 'matask good 2', '0000-00-00', 0, 0, 0, 0, 0, 4),
                                                                                                                                      (6, 'matask good 2', '0000-00-00', 0, 0, 0, 0, 0, 6),
                                                                                                                                      (7, 'matask good 2', '0000-00-00', 0, 0, 0, 0, 0, 7),
                                                                                                                                      (8, 'matask good 2', '0000-00-00', 0, 0, 0, 0, 0, 8),
                                                                                                                                      (9, 'fff', '0000-00-00', 0, 0, 0, 0, 0, 9),
                                                                                                                                      (12, 'מטלה 6', '0000-00-00', 0, 0, 0, 0, 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `tasks_milestones`
--

CREATE TABLE `tasks_milestones` (
                                    `id` int(11) NOT NULL,
                                    `task_id` int(11) NOT NULL,
                                    `milestone_id` int(11) NOT NULL,
                                    `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tasks_milestones`
--

INSERT INTO `tasks_milestones` (`id`, `task_id`, `milestone_id`, `status`) VALUES
    (1, 12, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
                           `id` int(11) NOT NULL,
                           `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
    ADD PRIMARY KEY (`id`);

--
-- Indexes for table `milestone`
--
ALTER TABLE `milestone`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `tasks_milestones`
--
ALTER TABLE `tasks_milestones`
    ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD KEY `tasks_milestones_fk1` (`task_id`),
  ADD KEY `tasks_milestones_fk2` (`milestone_id`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `milestone`
--
ALTER TABLE `milestone`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tasks_milestones`
--
ALTER TABLE `tasks_milestones`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks_milestones`
--
ALTER TABLE `tasks_milestones`
    ADD CONSTRAINT `tasks_milestones_fk1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `tasks_milestones_fk2` FOREIGN KEY (`milestone_id`) REFERENCES `milestone` (`id`);
COMMIT;
