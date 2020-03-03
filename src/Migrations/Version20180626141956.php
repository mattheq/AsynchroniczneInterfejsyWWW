<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180626141956 extends AbstractMigration
{
    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE item_details (id INT AUTO_INCREMENT NOT NULL, country VARCHAR(255) DEFAULT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) DEFAULT NULL, street_number VARCHAR(255) DEFAULT NULL, daytime INT DEFAULT NULL, created_at INT NOT NULL, updated_at INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE item ADD item_details_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE item ADD CONSTRAINT FK_1F1B251E6AB2F28 FOREIGN KEY (item_details_id) REFERENCES item_details (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1F1B251E6AB2F28 ON item (item_details_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE item DROP FOREIGN KEY FK_1F1B251E6AB2F28');
        $this->addSql('DROP TABLE item_details');
        $this->addSql('DROP INDEX UNIQ_1F1B251E6AB2F28 ON item');
        $this->addSql('ALTER TABLE item DROP item_details_id');
    }
}
