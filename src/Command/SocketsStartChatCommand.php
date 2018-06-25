<?php

namespace App\Command;

use App\Chat;
use Doctrine\ORM\EntityManagerInterface;
use Ratchet\Http\HttpServer;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SocketsStartChatCommand extends Command
{
    protected static $defaultName = 'sockets:start-chat';
    private $entityManager;

    public function __construct(?string $name = null, EntityManagerInterface $entityManager)
    {
        parent::__construct($name);
        $this->entityManager = $entityManager;
    }

    protected function configure()
    {
        $this
            ->setHelp('Starts sockets chat server')
            ->setDescription('Starts sockets chat server')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $output->writeln([
            'Chat socket',// A line
            '============',// Another line
            'Starting chat, open your browser.',// Empty line
        ]);

        $server = IoServer::factory(
            new HttpServer(
                new WsServer(
                    new Chat($this->entityManager)
                )
            ),
            8080
        );

        $server->run();
    }
}
