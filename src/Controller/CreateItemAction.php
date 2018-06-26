<?php

namespace App\Controller;

use ApiPlatform\Core\Bridge\Symfony\Validator\Exception\ValidationException;
use App\Entity\Item;
use App\Form\CreateItemType;
use Symfony\Bridge\Doctrine\RegistryInterface;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

final class CreateItemAction extends Controller
{
    private $validator;
    private $doctrine;
    private $factory;

    public function __construct(RegistryInterface $doctrine, FormFactoryInterface $factory, ValidatorInterface $validator)
    {
        $this->validator = $validator;
        $this->doctrine = $doctrine;
        $this->factory = $factory;
    }

    /**
     * IsGranted("ROLE_USER")
     */
    public function __invoke(Request $request): Item
    {
        $item = new Item();

        $form = $this->factory->create(CreateItemType::class, $item);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->doctrine->getManager();
            $user = $this->getUser();
            $item->setUser($user);
            $item->upload();
            $em->persist($item);
            $em->flush();
            $item->setFiles(null);

            return $item;
        }

        throw new ValidationException($this->validator->validate($item));
    }
}