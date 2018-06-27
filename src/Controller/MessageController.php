<?php

namespace App\Controller;

use App\Entity\Message;
use App\Entity\User;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MessageController extends Controller
{

    /**
     * @Route("/api/v1/messages/conversation/{id}", name="getConversation")
     * @Method("GET")
     */
    public function getConversationAction(User $user)
    {
        $messages = $this->getDoctrine()->getRepository(Message::class)
            ->findUserConversation($user->getId(), $this->getUser()->getId());

        return new JsonResponse($this->get('serializer')->serialize(array_reverse($messages),'json'));
    }

    /**
     * @Route("/api/v1/messages/recent_conversations", name="getRecentConversation")
     * @Method("GET")
     */
    public function getRecentConversationsAction()
    {
        $messages = $this->getDoctrine()->getRepository(Message::class)
            ->findUserLastFiveConversations($this->getUser()->getId());

        return new JsonResponse($this->get('serializer')->serialize(array_reverse($messages),'json'));
    }
}
