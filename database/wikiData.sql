CREATE DATABASE  IF NOT EXISTS `mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `mydb`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account` (
  `idAccount` int(11) NOT NULL AUTO_INCREMENT,
  `User` varchar(45) NOT NULL,
  `Pass` varchar(45) NOT NULL,
  `Admin` tinyint(4) NOT NULL,
  PRIMARY KEY (`idAccount`),
  UNIQUE KEY `idAccount_UNIQUE` (`idAccount`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (0,'Admin','Admin',1),(1,'Nguyen A','123',0),(2,'Nguyen B','123',0),(3,'Nguyen C','123',0),(4,'Nguyen D','123',0),(5,'NguoiMoi','456',0);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredient`
--

DROP TABLE IF EXISTS `ingredient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingredient` (
  `Name_Ingre` varchar(45) NOT NULL,
  `Amount` varchar(45) DEFAULT NULL,
  `Post_idPost` int(11) NOT NULL,
  PRIMARY KEY (`Post_idPost`,`Name_Ingre`),
  CONSTRAINT `fk_Ingredieat_Post1` FOREIGN KEY (`Post_idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredient`
--

LOCK TABLES `ingredient` WRITE;
/*!40000 ALTER TABLE `ingredient` DISABLE KEYS */;
INSERT INTO `ingredient` VALUES ('thit ba chi','300g',1),('trung chim cut','10 qua',1);
/*!40000 ALTER TABLE `ingredient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `likestate`
--

DROP TABLE IF EXISTS `likestate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likestate` (
  `account_idAccount` int(11) NOT NULL,
  `post_idPost` int(11) NOT NULL,
  PRIMARY KEY (`account_idAccount`,`post_idPost`),
  KEY `fk_likestate_account1_idx` (`account_idAccount`),
  KEY `fk_likestate_post1_idx` (`post_idPost`),
  CONSTRAINT `fk_likestate_account1` FOREIGN KEY (`account_idAccount`) REFERENCES `account` (`idAccount`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_likestate_post1` FOREIGN KEY (`post_idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likestate`
--

LOCK TABLES `likestate` WRITE;
/*!40000 ALTER TABLE `likestate` DISABLE KEYS */;
INSERT INTO `likestate` VALUES (1,4);
/*!40000 ALTER TABLE `likestate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `idPost` int(11) NOT NULL AUTO_INCREMENT,
  `NamePost` varchar(45) NOT NULL,
  `Rating` float NOT NULL,
  `NumOfLike` int(11) NOT NULL,
  `Account_idAccount` int(11) NOT NULL,
  `Description` text,
  `Image` text,
  PRIMARY KEY (`idPost`),
  KEY `fk_Post_Account_idx` (`Account_idAccount`),
  CONSTRAINT `fk_Post_Account` FOREIGN KEY (`Account_idAccount`) REFERENCES `account` (`idAccount`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'Thit Kho',0,0,3,'kho thit','thitKho.jpg'),(2,'Gà Chiên',0,0,2,'Ga chien','gaChien.jpg'),(3,'Cá rán',0,0,3,'c','caRan.jpg'),(4,'Gà Luộc',1,1,3,'','gaLuoc.jpg'),(5,'Nem cuốn',0,0,2,NULL,'nemRan.jpg'),(7,'kdgaklj',0,0,3,'dgjak',NULL),(10,'dgaddadf',0,0,3,'dg',NULL);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate` (
  `Account_idAccount` int(11) NOT NULL,
  `Post_idPost` int(11) NOT NULL,
  `Score` int(11) NOT NULL,
  PRIMARY KEY (`Account_idAccount`,`Post_idPost`),
  KEY `fk_Account_has_Post_Post2_idx` (`Post_idPost`),
  KEY `fk_Account_has_Post_Account2_idx` (`Account_idAccount`),
  CONSTRAINT `fk_Account_has_Post_Account2` FOREIGN KEY (`Account_idAccount`) REFERENCES `account` (`idAccount`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Account_has_Post_Post2` FOREIGN KEY (`Post_idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (1,4,1);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `report` (
  `Account_idAccount` int(11) NOT NULL,
  `Post_idPost` int(11) NOT NULL,
  `Reason` text,
  `Date` date NOT NULL,
  `IsCheck` tinyint(4) NOT NULL,
  PRIMARY KEY (`Account_idAccount`,`Post_idPost`),
  KEY `fk_Account_has_Post_Post3_idx` (`Post_idPost`),
  KEY `fk_Account_has_Post_Account3_idx` (`Account_idAccount`),
  CONSTRAINT `fk_Account_has_Post_Account3` FOREIGN KEY (`Account_idAccount`) REFERENCES `account` (`idAccount`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Account_has_Post_Post3` FOREIGN KEY (`Post_idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `step`
--

DROP TABLE IF EXISTS `step`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `step` (
  `Post_idPost` int(11) NOT NULL,
  `Step` int(11) NOT NULL,
  `Content` text NOT NULL,
  PRIMARY KEY (`Post_idPost`,`Step`),
  CONSTRAINT `fk_Step_Post1` FOREIGN KEY (`Post_idPost`) REFERENCES `post` (`idPost`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `step`
--

LOCK TABLES `step` WRITE;
/*!40000 ALTER TABLE `step` DISABLE KEYS */;
INSERT INTO `step` VALUES (1,1,'thái thịt'),(1,2,'luộc trứng '),(1,3,'rán trứng'),(1,4,'kho thịt cùng trứng');
/*!40000 ALTER TABLE `step` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-05-13 15:21:41
