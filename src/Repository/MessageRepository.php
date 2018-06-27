<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Query\ResultSetMapping;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Message|null find($id, $lockMode = null, $lockVersion = null)
 * @method Message|null findOneBy(array $criteria, array $orderBy = null)
 * @method Message[]    findAll()
 * @method Message[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function findUserConversation($user_id, $logged_user)
    {
        return $this->createQueryBuilder('m')
            ->where('m.from = :user_id and m.to = :logged_user or m.to = :user_id and m.from = :logged_user')->setParameters(['user_id' => $user_id, 'logged_user' => $logged_user])
            ->orderBy('m.created_at', 'desc')
            ->getQuery()
            ->setMaxResults(10)
            ->getResult();
    }

    public function findUserLastFiveConversations($logged_user)
    {
        return $this->createQueryBuilder('m')
            ->innerJoin('m.from', 'f')
            ->innerJoin('m.to', 't')
            ->where('t.id = :logged_user')->setParameter('logged_user', $logged_user)
            ->groupBy('f.id')
            ->getQuery()
            ->getResult();
    }
}
