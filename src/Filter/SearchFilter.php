<?php

namespace App\Filter;

use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\AbstractFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use Doctrine\ORM\QueryBuilder;
use Doctrine\Common\Annotations\AnnotationReader;

final class SearchFilter extends AbstractFilter
{

    /**
     * Passes a property through the filter.
     * @throws \ReflectionException
     * @throws \Doctrine\Common\Annotations\AnnotationException
     * @throws \HttpInvalidParamException
     */
    protected function filterProperty(string $property, $value, QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, string $operationName = null/*, array $context = []*/)
    {
        if ($property === 'search') {
            $this->logger->info('Search for: ' . $value);
        } else {
            return;
        }

        $reader = new AnnotationReader();
        $annotation = $reader->getClassAnnotation(new \ReflectionClass(new $resourceClass), SearchAnnotation::class);

        if (!$annotation) {
            throw new \HttpInvalidParamException('No Search implemented.');
        }

        $parameterName = $queryNameGenerator->generateParameterName($property);
        $search = [];

        foreach ($annotation->fields as $field)
        {
            $search[] = "o.{$field} LIKE :{$parameterName}";
        }

        $queryBuilder->andWhere(implode(' OR ', $search));
        $queryBuilder->setParameter($parameterName, '%' . $value . '%');
    }

    /**
     * @param string $resourceClass
     * @return array
     */
    public function getDescription(string $resourceClass): array
    {
        $description['search'] = [
            'property' => 'search',
            'type' => 'string',
            'required' => false,
            'swagger' => ['description' => 'Searchfilter'],
        ];

        return $description;
    }
}