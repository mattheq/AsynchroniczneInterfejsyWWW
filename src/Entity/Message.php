<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 * @ApiResource(
 *     attributes={
 *          "normalization_context"={"groups"={"message"}}
 *     },
 *     collectionOperations={
 *          "get"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')"
 *          },
 *          "getConversation"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')",
 *              "method"="GET",
 *              "controller"="\App\Controller\MessageController::getConversationAction"
 *          },
 *          "getRecentConversations"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')",
 *              "method"="GET",
 *              "controller"="\App\Controller\MessageController::getRecentConversationsAction"
 *          }
 *     },
 *     itemOperations={
 *          "get"={
 *              "access_control"="is_granted('IS_AUTHENTICATED_FULLY')"
 *          }
 *     }
 * )
 */
class Message
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"message"})
     */
    private $id;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="messages_from", cascade={"persist"})
     * @Groups({"message"})
     */
    private $from;

    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="User", inversedBy="messages_to", cascade={"persist"})
     * @Groups({"message"})
     */
    private $to;

    /**
     * @var string
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     * @Groups({"message"})
     */
    private $text;

    /**
     * @var int
     * @ORM\Column(type="smallint")
     * @Assert\NotNull()
     * @Groups({"message"})
     */
    private $seen = 0;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="create")
     * @Groups({"message"})
     */
    private $created_at;

    /**
     * @var int
     * @ORM\Column(type="integer")
     * @Gedmo\Timestampable(on="update")
     * @Groups({"message"})
     */
    private $updated_at;

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return User
     */
    public function getFrom(): ?User
    {
        return $this->from;
    }

    /**
     * @param User $from
     */
    public function setFrom(User $from): void
    {
        $this->from = $from;
    }

    /**
     * @return User
     */
    public function getTo(): ?User
    {
        return $this->to;
    }

    /**
     * @param User $to
     */
    public function setTo(User $to): void
    {
        $this->to = $to;
    }

    /**
     * @return string
     */
    public function getText(): ?string
    {
        return $this->text;
    }

    /**
     * @param string $text
     */
    public function setText(string $text): void
    {
        $this->text = $text;
    }

    /**
     * @return int
     */
    public function getSeen(): ?int
    {
        return $this->seen;
    }

    /**
     * @param int $seen
     */
    public function setSeen(int $seen): void
    {
        $this->seen = $seen;
    }

    /**
     * @return int
     */
    public function getCreatedAt(): ?int
    {
        return $this->created_at;
    }

    /**
     * @param int $created_at
     */
    public function setCreatedAt(int $created_at): void
    {
        $this->created_at = $created_at;
    }

    /**
     * @return int
     */
    public function getUpdatedAt(): int
    {
        return $this->updated_at;
    }

    /**
     * @param int $updated_at
     */
    public function setUpdatedAt(int $updated_at): void
    {
        $this->updated_at = $updated_at;
    }
}
