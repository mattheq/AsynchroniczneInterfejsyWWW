<?php

namespace App\Controller;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class Controller
 * @package App\Controller
 */
class Controller extends \Symfony\Bundle\FrameworkBundle\Controller\Controller
{

    /**
     * Response with validation errors
     * @param FormInterface $form
     * @return JsonResponse
     */
    public function validationsErrorResponse(FormInterface $form): JsonResponse
    {
        $responseData = array(
            'message' => 'Validation errors',
            'status' => 400,
            'error' => $this->getErrorsFromForm($form),
        );

        return new JsonResponse($responseData, 400);
    }

    /**
     * Basic success response
     * @return JsonResponse
     */
    public function successResponse()
    {
        return new JsonResponse(array(
            'message' => 'Success',
            'status' => 200,
        ));
    }

    /**
     * Method for getting error messages from form
     * @param FormInterface $form
     * @return array
     */
    private function getErrorsFromForm(FormInterface $form): array
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }

        return $errors;
    }
}