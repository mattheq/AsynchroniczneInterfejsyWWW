<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use App\Filter\SearchAnnotation as Searchable;
use App\Filter\SearchFilter;

/**
 * TODO: Add item photo and address details
 * @ORM\Entity(repositoryClass="App\Repository\ItemRepository")
 * @ApiResource(
 *     attributes={
 *          "normalization_context"={
 *              "groups"={"item"}
 *          },
 *          "filters"={"search"}
 *     },
 *     collectionOperations={
 *          "get"={"pagination_items_per_page"=12},
 *          "post"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')",
 *              "method"="POST",
 *              "controller"="\App\Controller\ItemController::createAction"
 *          }
 *     },
 *     itemOperations={
 *          "get",
 *          "delete"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.user == user",
 *              "access_control_message"="Sorry, but you are not the owner."
 *          },
 *          "put"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY') and object.user == user",
 *              "access_control_message"="Sorry, but you are not the owner."
 *          }
 *     }
 * )
 * @Searchable({"title", "description"})
 */
class Item
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"item"})
     */
    private $id;

    /**
     * @var string
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank()
     * @Groups({"item"})
     */
    private $title;

    /**
     * @var string
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Groups({"item"})
     */
    private $description;

    /**
     * @var integer
     * @ORM\Column(type="smallint")
     * @Assert\NotNull()
     * @Groups({"item"})
     */
    private $type;

    /**
     * @var integer
     * @ORM\Column(type="smallint")
     * @Assert\NotNull()
     * @Groups({"item"})
     */
    private $status = 0;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="create")
     * @Groups({"item"})
     */
    private $created_at;

    /**
     * @var integer
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="update")
     * @Groups({"item"})
     */
    private $updated_at;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="items", cascade={"persist"})
     * @Groups({"item"})
     */
    private $user;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param string $title
     */
    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    /**
     * @return int
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param int $type
     */
    public function setType(int $type): void
    {
        $this->type = $type;
    }

    /**
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @param int $status
     */
    public function setStatus(int $status): void
    {
        $this->status = $status;
    }

    /**
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * @return int
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    public function getCreated_at()
    {
        return $this->created_at;
    }

    public function getUpdated_at()
    {
        return $this->updated_at;
    }

}
