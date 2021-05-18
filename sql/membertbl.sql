DROP TABLE IF EXISTS membertbl;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE membertbl (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  membername varchar(255) DEFAULT NULL,
  screenname varchar(255) DEFAULT NULL,
  avatar varchar(255) DEFAULT NULL,
  role varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  passwd varchar(255) DEFAULT NULL,  
  token varchar(100) DEFAULT NULL,
  status varchar(25) DEFAULT NULL,
  changedate datetime DEFAULT NULL,
  createdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) 