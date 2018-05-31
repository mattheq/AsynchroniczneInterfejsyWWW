<?php

namespace App\Controller;

use App\Entity\Item;
use App\Form\CreateItemType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class ItemController
 * @package App\Controller
 */
class ItemController extends Controller
{

    /**
     * @param Request $request
     * @Route("/api/v1/items", name="createItem")
     * @Method("POST")
     * @return \Symfony\Component\HttpFoundation\JsonResponse
     * @throws \Exception
     */
    public function createAction(Request $request)
    {
        $item = new Item();
        $createItemForm = $this->createForm(CreateItemType::class, $item);
        $createItemForm->handleRequest($request);

        if ($createItemForm->isSubmitted() && $createItemForm->isValid()) {
            $user = $this->getUser();
            $item->setUser($user);

            $entityManager = $this->getDoctrine()->getManager();

            $entityManager->persist($item);
            $entityManager->flush();
            return new JsonResponse($this->get('serializer')->serialize($item,'json'));
        }

        return $this->validationsErrorResponse($createItemForm);
    }
}