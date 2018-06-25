<?php

namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
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
            ->where('m.from = :user_id or m.to = :user_id')->setParameter('user_id', $user_id)
            ->andWhere('m.from = :logged_user or m.to = :logged_user')->setParameter('logged_user', $logged_user)
            ->orderBy('m.created_at', 'desc')
            ->getQuery()
            ->setMaxResults(10)
            ->getResult();
    }

    public function findUserLastFiveConversations($logged_user)
    {
        //TODO: query
        /*
         * SELECT m1.* FROM message m1
	        LEFT JOIN message m2
            ON (m1.from_id = m2.from_id AND m1.id < m2.id)
	        WHERE m2.id IS NULL AND m1.from_id != 1;
         */
        return $this->createQueryBuilder('m')
            ->andWhere('m.from = :logged_user or m.to = :logged_user')->setParameter('logged_user', $logged_user)
            ->groupBy('m.from')
            ->getQuery()
            ->getResult();
    }

    /*
    public function findBySomething($value)
    {
        return $this->createQueryBuilder('m')
            ->where('m.something = :value')->setParameter('value', $value)
            ->orderBy('m.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
}
