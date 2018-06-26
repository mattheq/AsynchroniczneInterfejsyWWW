<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180626114208 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE item_photo ADD item_id INT DEFAULT NULL, DROP item');
        $this->addSql('ALTER TABLE item_photo ADD CONSTRAINT FK_3E109FC8126F525E FOREIGN KEY (item_id) REFERENCES item (id)');
        $this->addSql('CREATE INDEX IDX_3E109FC8126F525E ON item_photo (item_id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE item_photo DROP FOREIGN KEY FK_3E109FC8126F525E');
        $this->addSql('DROP INDEX IDX_3E109FC8126F525E ON item_photo');
        $this->addSql('ALTER TABLE item_photo ADD item INT NOT NULL, DROP item_id');
    }
}
