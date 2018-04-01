<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegisterUserType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

/**
 * Class AuthController
 * @package App\Controller
 */
class AuthController extends Controller
{

    /**
     * @Route("/api/v1/auth/register", name="registerUser")
     * @Method("POST")
     * @throws \Exception
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $user = new User();
        $loginForm = $this->createForm(RegisterUserType::class, $user);
        $loginForm->handleRequest($request);

        if ($loginForm->isSubmitted() && $loginForm->isValid()) {
            $user->setPassword($encoder->encodePassword($user, $user->getPassword()));
            $entityManager = $this->getDoctrine()->getManager();

            $entityManager->persist($user);
            $entityManager->flush();
            return $this->successResponse();
        }

        return $this->validationsErrorResponse($loginForm);
    }

}
