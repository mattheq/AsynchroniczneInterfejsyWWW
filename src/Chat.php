<?php

namespace App;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;

/**
 * Class Chat
 * @package App
 */
class Chat implements MessageComponentInterface
{

    protected $_clients;
    protected $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->_clients = new \SplObjectStorage;
        $this->entityManager = $entityManager;
    }

    /**
     * When a new connection is opened it will be passed to this method
     * @param  ConnectionInterface $conn The socket/connection that just connected to your application
     */
    function onOpen(ConnectionInterface $conn)
    {
        $this->_clients->attach($conn);

        echo "New connection! ({$conn->resourceId})\n";
    }

    /**
     * This is called before or after a socket is closed (depends on how it's closed).  SendMessage to $conn will not result in an error if it has already been closed.
     * @param  ConnectionInterface $conn The socket/connection that is closing/closed
     * @throws \Exception
     */
    function onClose(ConnectionInterface $conn)
    {
        $this->_clients->detach($conn);

        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    /**
     * If there is an error with one of the sockets, or somewhere in the application where an Exception is thrown,
     * the Exception is sent back down the stack, handled by the Server and bubbled back up the application through this method
     * @param  ConnectionInterface $conn
     * @param  \Exception $e
     * @throws \Exception
     */
    function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error has occurred: {$e->getMessage()}\n";

        $conn->close();
    }

    /**
     * Triggered when a client sends data through the socket
     * @param  \Ratchet\ConnectionInterface $from The socket/connection that sent the message to your application
     * @param  string $msg The message received
     * @throws \Exception
     */
    function onMessage(ConnectionInterface $from, $msg)
    {
        $msgObj = json_decode($msg);
        $user_from = $this->entityManager->getRepository(User::class)->find($msgObj->from);
        $user_to = $this->entityManager->getRepository(User::class)->find($msgObj->to);

        $message = new Message();
        $message->setFrom($user_from);
        $message->setTo($user_to);
        $message->setText($msgObj->text);


        foreach ($this->_clients as $client) {
            parse_str($client->httpRequest->getUri()->getQuery(), $querry);
            if ($msgObj->from !== $querry['user_id'] && $msgObj->to === (int)$querry['user_id']) {
                $message->setSeen(1);
                $client->send($msgObj->text);
            }
        }

        $this->entityManager->persist($message);
        $this->entityManager->flush();
    }
}