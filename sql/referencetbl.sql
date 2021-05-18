DROP TABLE IF EXISTS referencetbl;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE referencetbl (
  id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  reference varchar(255) DEFAULT NULL,
  type varchar(10) DEFAULT NULL,
  source varchar(255) DEFAULT NULL,
  URL varchar(255) DEFAULT NULL,
  Description varchar(255) DEFAULT NULL,
  changedate datetime DEFAULT NULL,
  createdate datetime DEFAULT NULL,
  PRIMARY KEY (id)
) 