-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema TFG
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema TFG
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `TFG` DEFAULT CHARACTER SET latin1 ;
USE `TFG` ;

-- -----------------------------------------------------
-- Table `TFG`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`user` (
  `id_user` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(32) NOT NULL,
  `create_time` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TFG`.`bazaar`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`bazaar` (
  `id_bazaar` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `user_id_user` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id_bazaar`),
  INDEX `fk_bazaar_user1_idx` (`user_id_user` ASC),
  CONSTRAINT `fk_bazaar_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `TFG`.`user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TFG`.`bazaar_type`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`bazaar_type` (
  `id_bazaar_type` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `stationery_bazaar_type` VARCHAR(1) NOT NULL,
  `food_bazaar_type` VARCHAR(1) NOT NULL,
  `general_bazaar_type` VARCHAR(1) NOT NULL,
  `bazaar_id_bazaar` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id_bazaar_type`),
  INDEX `fk_bazaar_type_bazaar1_idx` (`bazaar_id_bazaar` ASC),
  CONSTRAINT `fk_bazaar_type_bazaar1`
    FOREIGN KEY (`bazaar_id_bazaar`)
    REFERENCES `TFG`.`bazaar` (`id_bazaar`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TFG`.`location`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`location` (
  `id_location` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `street_location` VARCHAR(100) NOT NULL,
  `lon_location` DECIMAL(7,7) NULL DEFAULT NULL,
  `lat_location` DECIMAL(7,7) NULL DEFAULT NULL,
  `scale_location` VARCHAR(6) NULL DEFAULT NULL,
  `bazaar_id_bazaar` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id_location`),
  INDEX `fk_location_bazaar1_idx` (`bazaar_id_bazaar` ASC),
  CONSTRAINT `fk_location_bazaar1`
    FOREIGN KEY (`bazaar_id_bazaar`)
    REFERENCES `TFG`.`bazaar` (`id_bazaar`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TFG`.`password`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`password` (
  `id_password` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `token_password` VARCHAR(1000) NOT NULL,
  `reset_password` VARCHAR(1000) NOT NULL,
  `user_id_user` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id_password`),
  INDEX `fk_password_user1_idx` (`user_id_user` ASC),
  CONSTRAINT `fk_password_user1`
    FOREIGN KEY (`user_id_user`)
    REFERENCES `TFG`.`user` (`id_user`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TFG`.`untreated_picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`untreated_picture` (
  `id_untreated_picture` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT 'This a temporal table to manage de pictures',
  `path_untreated_picture` VARCHAR(100) NOT NULL,
  `bazaar_id_bazaar` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id_untreated_picture`),
  INDEX `fk_untreated_picture_bazaar1_idx` (`bazaar_id_bazaar` ASC),
  CONSTRAINT `fk_untreated_picture_bazaar1`
    FOREIGN KEY (`bazaar_id_bazaar`)
    REFERENCES `TFG`.`bazaar` (`id_bazaar`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = latin1;


-- -----------------------------------------------------
-- Table `TFG`.`treated_picture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `TFG`.`treated_picture` (
  `id_pictures_treated` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `path_treated_picture` VARCHAR(100) NOT NULL,
  `text_treated_picture` LONGTEXT NOT NULL,
  `untreated_picture_id_untreated_picture` BIGINT(20) NOT NULL,
  PRIMARY KEY (`id_pictures_treated`),
  INDEX `fk_treated_picture_untreated_picture1_idx` (`untreated_picture_id_untreated_picture` ASC),
  CONSTRAINT `fk_treated_picture_untreated_picture1`
    FOREIGN KEY (`untreated_picture_id_untreated_picture`)
    REFERENCES `TFG`.`untreated_picture` (`id_untreated_picture`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = latin1;

USE `TFG`;

DELIMITER $$
USE `TFG`$$
CREATE
DEFINER=`root`@`%`
TRIGGER `TFG`.`bazar_type_update`
AFTER INSERT ON `TFG`.`bazaar`
FOR EACH ROW
set @bazaar_id_update = new.id_bazaar$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
