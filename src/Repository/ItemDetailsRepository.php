<?php

namespace App\Repository;

use App\Entity\ItemDetails;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ItemDetails|null find($id, $lockMode = null, $lockVersion = null)
 * @method ItemDetails|null findOneBy(array $criteria, array $orderBy = null)
 * @method ItemDetails[]    findAll()
 * @method ItemDetails[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ItemDetailsRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ItemDetails::class);
    }

    /*
    public function findBySomething($value)
    {
        return $this->createQueryBuilder('i')
            ->where('i.something = :value')->setParameter('value', $value)
            ->orderBy('i.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */
}
