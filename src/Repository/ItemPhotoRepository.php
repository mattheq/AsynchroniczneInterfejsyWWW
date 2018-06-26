<?php

namespace App\Repository;

use App\Entity\ItemPhoto;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ItemPhoto|null find($id, $lockMode = null, $lockVersion = null)
 * @method ItemPhoto|null findOneBy(array $criteria, array $orderBy = null)
 * @method ItemPhoto[]    findAll()
 * @method ItemPhoto[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ItemPhotoRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ItemPhoto::class);
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
